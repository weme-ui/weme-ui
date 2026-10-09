<script lang="ts" setup>
import type { FormFieldProps } from './form-field.props'
import type { FormFieldDataAttributes } from '~/composables/use-form-field-context'
import { Label, Presence, Primitive, useId } from 'reka-ui'
import { computed, ref, toRefs, useSlots } from 'vue'
import { useFormContext, useFormField } from '~/composables/use-form-context'
import { provideFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolDataAttrValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useFormFieldStyle } from './form-field.style'

const props = withDefaults(defineProps<FormFieldProps>(), {
  orientation: 'vertical',
  loading: false,
  required: false,
  disabled: false,
  readonly: false,
  invalid: false,
  nativeLabel: true,
})

const form = useFormContext()

if (!form) {
  throw new Error('FormField must be used within a Form')
}

const { name, required, disabled, loading, invalid, orientation, readonly } = toRefs(props)

const field = useFormField({
  name: name.value,
  form: form.form,
})

const slots = useSlots()

const hasLabel = computed(() => props.label || slots.label)
const hasHint = computed(() => props.hint || slots.hint)
const hasDescription = computed(() => props.description || slots.description)
const hasHelp = computed(() => props.help || slots.help)

const fieldId = computed(() => props.id ?? useId(undefined, 'form-field'))
const labelId = computed(() => hasLabel.value ? `${fieldId.value}-label` : undefined)
const descriptionId = computed(() => hasDescription.value ? `${fieldId.value}-desc` : undefined)

const isLoading = computed(() => loading.value ?? form.loading.value)
const isDisabled = computed(() => disabled.value ?? form.disabled.value)
const isTouched = computed(() => field.state.meta.isTouched)
const isDirty = computed(() => field.state.meta.isDirty)
const isValid = computed(() => field.state.meta.isValid)
const isInvalid = computed(() => invalid.value ?? isValid.value === false)
const isFilled = computed(() => isFilledValue(field.state.value))

const focused = ref(false)

const dataAttributes = computed<FormFieldDataAttributes>(() => ({
  'data-valid': toBoolDataAttrValue(isValid.value),
  'data-invalid': toBoolDataAttrValue(isInvalid.value),
  'data-dirty': toBoolDataAttrValue(isDirty.value),
  'data-touched': toBoolDataAttrValue(isTouched.value),
  'data-filled': toBoolDataAttrValue(isFilled.value),
  'data-focused': toBoolDataAttrValue(focused.value),
  'data-disabled': toBoolDataAttrValue(isDisabled.value),
}))

const ui = computed(() => useFormFieldStyle({
  orientation: props.orientation,
  loading: isLoading.value,
  disabled: isDisabled.value,
}))

function isFilledValue(value: unknown): boolean {
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return value !== undefined && value !== null && value !== ''
}

provideFormFieldContext({
  fieldId,
  labelId,
  descriptionId,
  name,
  required,
  focused,
  readonly,
  dataAttributes,
  orientation,
  loading: isLoading,
  disabled: isDisabled,
  valid: isValid,
  invalid: isInvalid,
  dirty: isDirty,
  touched: isTouched,
  filled: isFilled,
  handleControlFocus: () => focused.value = true,
  handleControlBlur: () => focused.value = false,
})
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
          :id="labelId"
          :for="nativeLabel ? fieldId : undefined"
          :class="cn(ui.label(), props.ui?.label)"
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

      <p v-if="hasDescription" v-bind="dataAttributes" :id="descriptionId" :class="cn(ui.description(), props.ui?.description)">
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <div :class="cn(ui.content(), props.ui?.content)">
      <slot :field="field" />

      <Presence :present="isInvalid && field.state.meta.errors.length > 0">
        <div v-bind="dataAttributes" :data-state="isInvalid ? 'open' : 'closed'" :class="cn(ui.errors(), props.ui?.errors)">
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
