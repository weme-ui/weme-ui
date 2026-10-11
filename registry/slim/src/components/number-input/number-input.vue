<script lang="ts" setup>
import type { NumberInputEmits, NumberInputProps } from './number-input.props'
import { reactiveOmit } from '@vueuse/core'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { useFormFieldBindings, useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useNumberInputStyle } from './number-input.style'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<NumberInputProps>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  decrementIcon: 'ri:subtract-line',
  incrementIcon: 'ri:add-line',
})

const emits = defineEmits<NumberInputEmits>()
const delegated = reactiveOmit(props, 'id', 'name', 'required', 'disabled', 'readonly', 'invalid', 'variant', 'size', 'radius', 'decrementIcon', 'incrementIcon', 'placeholder', 'unstyled', 'class', 'ui')
const forwarded = useForwardProps(delegated)

const bindings = useFormFieldBindings()
const formFieldContext = useFormFieldContext()

const id = computed(() => formFieldContext.fieldId.value || props.id)
const name = computed(() => formFieldContext.name.value || props.name)
const required = computed(() => formFieldContext.required.value || props.required)
const disabled = computed(() => formFieldContext.disabled.value || props.disabled)
const readonly = computed(() => formFieldContext.readonly.value || props.readonly)
const invalid = computed(() => formFieldContext.invalid.value || props.invalid)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const ui = computed(() => useNumberInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  disabled: disabled.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
}))

function handleUpdate(value: number | undefined) {
  emits('update:modelValue', value)

  if (value === undefined)
    return

  emits('change', value)
}

function handleFocus(e: FocusEvent) {
  formFieldContext.handleControlFocus()
  emits('focus', e)
}

function handleBlur(e: FocusEvent) {
  formFieldContext.handleControlBlur()
  emits('blur', e)
}
</script>

<template>
  <NumberFieldRoot
    v-bind="{
      ...forwarded,
      ...dataAttributes,
      id,
      name,
      required,
      disabled,
      readonly,
      invalid,
    }"
    data-slot="number-input"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <NumberFieldDecrement :class="cn(ui.decrement(), props.ui?.decrement)">
      <slot name="decrement-icon">
        <Icon :name="decrementIcon" />
      </slot>
    </NumberFieldDecrement>

    <NumberFieldInput
      v-bind="bindings"
      :placeholder="placeholder"
      :class="cn(ui.input(), props.ui?.input)"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <NumberFieldIncrement :class="cn(ui.increment(), props.ui?.increment)">
      <slot name="increment-icon">
        <Icon :name="incrementIcon" />
      </slot>
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
