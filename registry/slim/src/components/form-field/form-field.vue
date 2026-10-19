<script lang="ts" setup>
import type { FormFieldProps } from './form-field.props'
import type { FormFieldControlDetail, FormFieldControlRegistration, FormFieldDataAttributes } from '~/composables/use-form-field-context'
import { Label, Presence, Primitive, useForwardExpose, useId } from 'reka-ui'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, toRefs, useSlots } from 'vue'
import { useFormContext, useFormField } from '~/composables/use-form-context'
import { provideFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolDataAttrValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useFormFieldStyle } from './form-field.style'

const props = withDefaults(defineProps<FormFieldProps>(), {
  orientation: 'vertical',
  nativeLabel: true,
})

const formContext = useFormContext()

if (!formContext) {
  throw new Error('FormField must be used within a Form')
}

const slots = useSlots()

const hasLabel = computed(() => !!props.label || !!slots.label)
const hasDescription = computed(() => !!props.description || !!slots.description)
const hasHint = computed(() => !!props.hint || !!slots.hint)
const hasHelp = computed(() => !!props.help || !!slots.help)

const fallbackId = useId(undefined, 'field')
const fieldId = computed(() => fallbackId)
const labelId = computed(() => hasLabel.value ? `${fieldId.value}-label` : undefined)
const descriptionId = computed(() => hasDescription.value ? `${fieldId.value}-desc` : undefined)

const {
  name,
  disabled,
  required,
  invalid,
  loading,
  orientation,
} = toRefs(props)

const field = useFormField({
  name: name.value,
  form: formContext.form,
})

const isFocused = ref(false)
const isLoading = computed(() => loading.value ?? formContext.loading.value)
const isDisabled = computed(() => disabled.value ?? formContext.disabled.value)
const isTouched = computed(() => field.state.meta.isTouched)
const isDirty = computed(() => field.state.meta.isDirty)
const isValid = computed(() => field.state.meta.isValid)
const isInvalid = computed(() => invalid.value || isValid.value === false)
const isFilled = computed(() => isFilledValue(field.state.value))

const dataAttributes = computed<FormFieldDataAttributes>(() => ({
  'data-disabled': toBoolDataAttrValue(isDisabled.value),
  'data-valid': toBoolDataAttrValue(isValid.value),
  'data-invalid': toBoolDataAttrValue(isInvalid.value),
  'data-dirty': toBoolDataAttrValue(isDirty.value),
  'data-touched': toBoolDataAttrValue(isTouched.value),
  'data-filled': toBoolDataAttrValue(isFilled.value),
  'data-focused': toBoolDataAttrValue(isFocused.value),
}))

const ui = computed(() => useFormFieldStyle({
  orientation: props.orientation,
  loading: isLoading.value,
  disabled: isDisabled.value,
}))

const control = shallowRef<FormFieldControlRegistration>()
const lastReportedValue = ref<unknown>(undefined)

function resolveValue(detail?: FormFieldControlDetail) {
  if (detail)
    return detail.value
  return control.value ? control.value.getValue() : lastReportedValue.value
}

function isFilledValue(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return value !== undefined && value !== null && value !== ''
}

function setFocused(value: boolean) {
  if (isDisabled.value || isLoading.value)
    return

  if (value !== isFocused.value)
    isFocused.value = value
}

function handleLabelClick(event: MouseEvent) {
  if (props.nativeLabel)
    return

  if ((event.target as HTMLElement | null)?.closest('button,input,select,textarea'))
    return

  focusControl()
}

function handleControlFocus() {
  setFocused(true)
}

function handleControlBlur(detail?: FormFieldControlDetail) {
  if (detail)
    lastReportedValue.value = detail.value

  setFocused(false)
}

function registryControl(registration: FormFieldControlRegistration) {
  control.value = registration

  return () => {
    if (control.value === registration)
      control.value = undefined
  }
}

function getControlId() {
  return control.value?.id?.() ?? fieldId.value
}

function focusControl() {
  control.value?.element()?.focus()
}

function resetField() {
  setFocused(false)
  lastReportedValue.value = undefined
  formContext.form.resetField(name.value)
}

let unregisterFromForm: (() => void) | undefined

onMounted(() => {
  unregisterFromForm = formContext?.registerField({
    name,
    invalid: isInvalid,
    getValue: () => resolveValue(),
    getControlElement: () => control.value?.element() ?? undefined,
    resetField,
  })
})

onBeforeUnmount(() => unregisterFromForm?.())

provideFormFieldContext({
  fieldId,
  labelId,
  descriptionId,
  name,
  required,
  loading: isLoading,
  valid: isValid,
  invalid: isInvalid,
  dirty: isDirty,
  touched: isTouched,
  filled: isFilled,
  focused: isFocused,
  disabled: isDisabled,
  dataAttributes,
  getControlId,
  focusControl,
  resetField,
  registryControl,
  handleControlFocus,
  handleControlBlur,
})

useForwardExpose()
</script>

<template>
  <Primitive
    data-slot="form-field"
    v-bind="dataAttributes"
    :data-orientation="orientation"
    :as="as"
    :as-child="asChild"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <div :class="cn(ui.header(), props.ui?.header)">
      <div :class="cn(ui.labelWrapper(), props.ui?.labelWrapper)">
        <span v-if="required" :class="cn(ui.required(), props.ui?.required)">
          <slot name="required">*</slot>
        </span>

        <Label
          v-if="hasLabel"
          :id="labelId ?? undefined"
          :for="nativeLabel ? getControlId() : undefined"
          :class="cn(ui.label(), props.ui?.label)"
          @click="handleLabelClick"
          @pointerdown="(event: PointerEvent) => { if (!nativeLabel) event.preventDefault() }"
        >
          <slot name="label">
            {{ label }}
          </slot>
        </Label>

        <span v-if="hasHint" :class="cn(ui.hint(), props.ui?.hint)">
          <slot name="hint">
            {{ hint }}
          </slot>
        </span>
      </div>

      <p v-if="hasDescription" :id="descriptionId" :class="cn(ui.description(), props.ui?.description)">
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <div :class="cn(ui.content(), props.ui?.content)">
      <slot :field="field" :orientation="orientation" />

      <Presence :present="isInvalid && field.state.meta.errors.length > 0">
        <div
          :data-state="field.state.meta.errors.length > 0 ? 'open' : 'closed'"
          :class="cn(ui.errors(), props.ui?.errors)"
        >
          <slot name="errors" :errors="field.state.meta.errors">
            <ul v-if="field.state.meta.errors.length > 1">
              <li v-for="error in field.state.meta.errors" :key="error.code">
                {{ error.message }}
              </li>
            </ul>
            <p v-else>
              {{ field.state.meta.errors[0]?.message }}
            </p>
          </slot>
        </div>
      </Presence>

      <p v-if="!isInvalid && hasHelp" :class="cn(ui.help(), props.ui?.help)">
        <slot name="help">
          {{ help }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
