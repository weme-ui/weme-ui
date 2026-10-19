<script lang="ts" setup>
import type { NumberInputEmits, NumberInputProps } from './number-input.props'
import { reactiveOmit } from '@vueuse/core'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, useForwardProps } from 'reka-ui'
import { computed, onMounted, onUnmounted } from 'vue'
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

const id = computed(() => props.id ?? formFieldContext.fieldId.value)
const name = computed(() => props.name ?? formFieldContext.name.value)
const required = computed(() => props.required ?? formFieldContext.required.value)
const disabled = computed(() => props.disabled ?? formFieldContext.disabled.value)
const invalid = computed(() => props.invalid ?? formFieldContext.invalid.value)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const ui = computed(() => useNumberInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  disabled: disabled.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
}))

let unregister: (() => void) | undefined

onMounted(() => {
  unregister = formFieldContext.registryControl({
    id: () => id.value,
  })
})

onUnmounted(() => {
  unregister?.()
})

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
    :data-slot="$attrs['data-slot'] ?? 'number-input'"
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
