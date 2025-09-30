<script lang="ts" setup>
import type { InputPinEmits, InputPinProps } from './input-pin.props'
import { reactiveOmit } from '@vueuse/core'
import { PinInputInput, PinInputRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { useInputPinStyle } from './input-pin.style'

const props = withDefaults(defineProps<InputPinProps>(), {
  color: 'accent',
  variant: 'normal',
  radius: 'sm',
  size: 'md',
  placeholder: '○',
  length: 4,
  otp: true,
})

const emits = defineEmits<InputPinEmits>()

const delegated = reactiveOmit(props, 'class', 'ui', 'length', 'color', 'variant', 'radius', 'size')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useInputPinStyle(props))
</script>

<template>
  <PinInputRoot v-bind="forwarded" :class="ui.base({ class: [props.class, props.ui?.base] })">
    <PinInputInput
      v-for="(id, index) in length"
      :key="id"
      :index="index"
      :class="ui.input({ class: props.ui?.input })"
    />
  </PinInputRoot>
</template>
