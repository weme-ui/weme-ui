<script lang="ts" setup>
import type { PinInputEmits, PinInputProps } from './pin-input.props'
import { reactiveOmit } from '@vueuse/core'
import { PinInputInput, PinInputRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useFormFieldContext } from '~/composables/use-form-field-context'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { usePinInputStyle } from './pin-input.style'

const props = withDefaults(defineProps<PinInputProps>(), {
  variant: 'soft',
  size: 'md',
  radius: 'md',
  length: 4,
  placeholder: '○',
  otp: true,
})

const emits = defineEmits<PinInputEmits>()
const delegated = reactiveOmit(props, 'id', 'name', 'required', 'disabled', 'readonly', 'invalid', 'variant', 'size', 'radius', 'length', 'unstyled', 'class', 'ui')
const forwarded = useForwardPropsEmits(delegated, emits)

const formFieldContext = useFormFieldContext()

const id = computed(() => formFieldContext.fieldId.value || props.id)
const name = computed(() => formFieldContext.name.value || props.name)
const required = computed(() => formFieldContext.required.value || props.required)
const disabled = computed(() => formFieldContext.disabled.value || props.disabled)
const readonly = computed(() => formFieldContext.readonly.value || props.readonly)
const invalid = computed(() => formFieldContext.invalid.value || props.invalid)
const dataAttributes = computed(() => formFieldContext.dataAttributes.value)

const ui = computed(() => usePinInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  disabled: disabled.value,
  invalid: invalid.value,
  unstyled: toBoolValue(props.unstyled),
}))

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
  <PinInputRoot
    v-bind="{
      ...forwarded,
      ...dataAttributes,
      id,
      name,
      required,
      disabled,
      readonly,
    }"
    data-slot="pin-input"
    :class="cn(ui.root(), props.ui?.root, props.class)"
  >
    <PinInputInput
      v-for="(key, index) in length"
      :key="key"
      :index="index"
      :name="`${name}-${key}`"
      :class="cn(ui.input(), props.ui?.input)"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </PinInputRoot>
</template>
