<script lang="ts" setup>
import type { NumberInputEmits, NumberInputProps } from './number-input.props'
import { reactiveOmit } from '@vueuse/core'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, useForwardPropsEmits } from 'reka-ui'
import { computed, ref } from 'vue'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'
import { useNumberInputStyle } from './number-input.style'

const props = withDefaults(defineProps<NumberInputProps>(), {
  variant: 'soft',
  size: 'md',
  radius: 'sm',
  orientation: 'horizontal',
})

const emits = defineEmits<NumberInputEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'placeholder', 'variant', 'size', 'radius', 'orientation', 'invalid')
const forwarded = useForwardPropsEmits(delegated, emits)

const isFocused = ref(false)

const decrementIcon = computed(() => props.orientation === 'vertical' ? 'down' : 'minus')
const incrementIcon = computed(() => props.orientation === 'vertical' ? 'up' : 'plus')

const ui = computed(() => useNumberInputStyle({
  variant: props.variant,
  size: props.size,
  radius: props.radius,
  orientation: props.orientation,
  disabled: toBoolValue(props.disabled),
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
    v-bind="forwarded"
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
