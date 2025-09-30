<script lang="ts" setup>
import type { InputNumberEmits, InputNumberProps } from './input-number.props'
import { reactiveOmit } from '@vueuse/core'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import Icon from '../icon/icon.vue'
import { useInputNumberStyle } from './input-number.style'

const props = withDefaults(defineProps<InputNumberProps>(), {
  color: 'accent',
  variant: 'normal',
  radius: 'sm',
  size: 'md',
})

const emits = defineEmits<InputNumberEmits>()

const delegated = reactiveOmit(props, 'asChild', 'class', 'ui', 'color', 'variant', 'radius', 'size')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useInputNumberStyle(props))
</script>

<template>
  <NumberFieldRoot v-bind="forwarded" :class="ui.base({ class: [props.class, props.ui?.base] })">
    <NumberFieldDecrement :class="ui.decrement({ class: props.ui?.decrement })">
      <slot name="decrement">
        <Icon name="minus" />
      </slot>
    </NumberFieldDecrement>

    <NumberFieldInput :class="ui.input({ class: props.ui?.input })" />

    <NumberFieldIncrement :class="ui.increment({ class: props.ui?.increment })">
      <slot name="increment">
        <Icon name="plus" />
      </slot>
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
