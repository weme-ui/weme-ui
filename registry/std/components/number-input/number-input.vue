<script lang="ts" setup>
import type { NumberInputEmits, NumberInputProps } from './number-input.props'
import { reactiveOmit } from '@vueuse/core'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { useFormField } from '~/composables/use-form-field'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useNumberInputStyle } from './number-input.style'

const props = withDefaults(defineProps<NumberInputProps>(), {
  variant: 'soft',
  orientation: 'horizontal',
})

const emits = defineEmits<NumberInputEmits>()
const delegated = reactiveOmit(props, 'id', 'name', 'class', 'ui', 'placeholder', 'variant', 'size', 'radius', 'orientation', 'invalid')
const forwarded = useForwardPropsEmits(delegated, emits)

const { id, name, size, radius, disabled, required } = useFormField<NumberInputProps>(props)

const isFocused = ref(false)

const decrementIcon = computed(() => props.orientation === 'vertical' ? 'down' : 'minus')
const incrementIcon = computed(() => props.orientation === 'vertical' ? 'up' : 'plus')

const ui = computed(() => useNumberInputStyle({
  variant: props.variant,
  size: size.value,
  radius: radius.value,
  orientation: props.orientation,
  disabled: toBoolValue(disabled.value),
  invalid: toBoolValue(props.invalid),
  focused: isFocused.value,
}))

function handleUpdate(value: number | undefined) {
  if (value !== undefined)
    emits('change', value)
}

function handleFocus() {
  isFocused.value = true
}

function handleBlur() {
  isFocused.value = false
}
</script>

<template>
  <NumberFieldRoot
    :id="id"
    v-bind="forwarded"
    :name="name"
    :required="required"
    data-slot="number-input"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    @update:model-value="handleUpdate"
  >
    <template v-if="props.orientation === 'horizontal'">
      <NumberFieldDecrement data-slot="number-input-decrement" :class="cn(ui.decrement(), props.ui?.decrement)">
        <slot name="decrement">
          <Icon :name="decrementIcon" />
        </slot>
      </NumberFieldDecrement>
    </template>
    <NumberFieldInput
      data-slot="number-input-value"
      :placeholder="placeholder"
      :class="cn(ui.input(), props.ui?.input)"
      :aria-required="toBoolValue(props.required) || undefined"
      :aria-invalid="toBoolValue(props.invalid) || undefined"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <NumberFieldIncrement data-slot="number-input-increment" :class="cn(ui.increment(), props.ui?.increment)">
      <slot name="increment">
        <Icon :name="incrementIcon" />
      </slot>
    </NumberFieldIncrement>
    <template v-if="props.orientation === 'vertical'">
      <NumberFieldDecrement data-slot="number-input-decrement" :class="cn(ui.decrement(), props.ui?.decrement)">
        <slot name="decrement">
          <Icon :name="decrementIcon" />
        </slot>
      </NumberFieldDecrement>
    </template>
  </NumberFieldRoot>
</template>
