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

function onFocus() {
  isFocused.value = true
}

function onBlur() {
  isFocused.value = false
}
</script>

<template>
  <NumberFieldRoot v-bind="forwarded" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="number-input">
    <template v-if="props.orientation === 'horizontal'">
      <NumberFieldDecrement :class="cn(ui.decrement(), props.ui?.decrement)" data-slot="number-input-decrement">
        <slot name="decrement">
          <Icon :name="decrementIcon" />
        </slot>
      </NumberFieldDecrement>
    </template>
    <NumberFieldInput
      :placeholder="placeholder"
      :class="cn(ui.input(), props.ui?.input)"
      :aria-required="toBoolValue(props.required) || undefined"
      :aria-invalid="toBoolValue(props.invalid) || undefined"
      data-slot="number-input-value"
      @focus="onFocus"
      @blur="onBlur"
    />
    <NumberFieldIncrement :class="cn(ui.increment(), props.ui?.increment)" data-slot="number-input-increment">
      <slot name="increment">
        <Icon :name="incrementIcon" />
      </slot>
    </NumberFieldIncrement>
    <template v-if="props.orientation === 'vertical'">
      <NumberFieldDecrement :class="cn(ui.decrement(), props.ui?.decrement)" data-slot="number-input-decrement">
        <slot name="decrement">
          <Icon :name="decrementIcon" />
        </slot>
      </NumberFieldDecrement>
    </template>
  </NumberFieldRoot>
</template>
