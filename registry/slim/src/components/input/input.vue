<script lang="ts" setup>
import type { InputEmits, InputProps } from './input.props'
import { useVModel } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed, useSlots, useTemplateRef } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolDataAttrValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useInputStyle } from './input.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<InputProps>(), {
  as: 'div',
  variant: 'soft',
  size: 'md',
  radius: 'md',
  autocomplete: 'off',
  loadingIcon: 'ri:loader-line',
  clearIcon: 'ri:close-line',
  type: 'text',
})

const emits = defineEmits<InputEmits>()

const modelValue = useVModel<InputProps, 'modelValue', 'update:modelValue'>(props, 'modelValue', emits, { defaultValue: props.defaultValue })

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const inputRef = useTemplateRef<HTMLInputElement>('inputRef')

const loading = computed(() => formFieldContext.loading.value || props.loading)
const disabled = computed(() => formFieldContext.disabled.value || props.disabled)
const readonly = computed(() => formFieldContext.readonly.value || props.readonly)
const invalid = computed(() => formFieldContext.invalid.value || props.invalid)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const countLength = computed(() => modelValue.value ? modelValue.value.toString().length : 0)
const overcount = computed(() => props.maxLength !== undefined && countLength.value > props.maxLength)

const slots = useSlots()

const hasPrefix = computed(() => props.prefix || props.prefixIcon || !!slots.prefix)
const hasSuffix = computed(() => loading.value || props.suffix || props.suffixIcon || !!slots.suffix)
const hasCounter = computed(() => !disabled.value && props.countable && props.maxLength && props.maxLength > 0)
const hasClean = computed(() => !disabled.value && props.clearable && modelValue.value)

const ui = computed(() => useInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  disabled: disabled.value,
  loading: loading.value,
  invalid: invalid.value,
  overcount: overcount.value,
}))

function updateValue(value: string | null | undefined) {
  if (props.modelModifiers?.trim && (typeof value === 'string' || value === null || value === undefined))
    value = value?.toString().trim() ?? null

  if (props.modelModifiers?.number || props.type === 'number') {
    const n = Number.parseFloat(value as any)
    value = Number.isNaN(n) ? value : n as any
  }

  if (props.modelModifiers?.nullable)
    value ||= null

  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null)
    value ||= undefined

  modelValue.value = value
}

function handleInput(e: Event) {
  if (!props.modelModifiers?.lazy) {
    const value = (e.target as HTMLInputElement).value
    updateValue(value)
  }
}

function handleChange(e: Event) {
  const value = (e.target as HTMLInputElement).value

  if (props.modelModifiers?.lazy)
    updateValue(value)

  if (props.modelModifiers?.trim)
    (e.target as HTMLInputElement).value = value.trim()

  emits('change', e)
}

function handleEnter(e: KeyboardEvent) {
  const value = (e.target as HTMLInputElement).value

  if (props.modelModifiers?.lazy)
    updateValue(value)

  if (props.modelModifiers?.trim)
    (e.target as HTMLInputElement).value = value.trim()

  emits('enter', value.trim())
}

function handleClean() {
  const value = modelValue.value

  if (value) {
    updateValue(null)
    emits('clean', value)

    if (inputRef.value) {
      inputRef.value.focus()
    }
    else {
      formFieldContext.handleControlFocus()
    }
  }
}

function handleFocus(e: FocusEvent) {
  formFieldContext.handleControlFocus()
  emits('focus', e)
}

function handleBlur(e: FocusEvent) {
  formFieldContext.handleControlBlur()
  emits('blur', e)
}

defineExpose({
  inputRef,
})
</script>

<template>
  <Primitive
    v-bind="dataAttributes"
    data-slot="input"
    :data-readonly="toBoolDataAttrValue(readonly)"
    :as="as"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <span v-if="hasPrefix" :class="cn(ui.prefix(), props.ui?.prefix)">
      <slot name="prefix">
        <Icon v-if="prefixIcon" :name="prefixIcon" :class="cn(ui.prefixIcon(), props.ui?.prefixIcon)" />
        <template v-else>{{ prefix }}</template>
      </slot>
    </span>

    <input
      v-bind="bindings"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :readonly="readonly"
      :class="cn(ui.input(), props.ui?.input)"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.enter="handleEnter"
    >

    <slot />

    <button v-if="hasClean" type="button" :class="cn(ui.cleanBtn(), props.ui?.cleanBtn)" @click="handleClean">
      <slot name="cleanIcon">
        <Icon :name="clearIcon" />
      </slot>
    </button>

    <span v-if="hasCounter" :class="cn(ui.counter(), props.ui?.counter)">
      {{ countLength }} / {{ maxLength }}
    </span>

    <span v-if="hasSuffix" :class="cn(ui.suffix(), props.ui?.suffix)">
      <slot name="suffix">
        <template v-if="loading || suffixIcon">
          <Icon v-if="loading" :name="loadingIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
          <Icon v-else-if="suffixIcon" :name="suffixIcon" :class="cn(ui.suffixIcon(), props.ui?.suffixIcon)" />
        </template>
        <template v-else>{{ suffix }}</template>
      </slot>
    </span>
  </Primitive>
</template>
