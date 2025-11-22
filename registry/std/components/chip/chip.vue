<script lang="ts" setup>
import type { ChipProps } from './chip.props'
import { reactivePick } from '@vueuse/core'
import { Primitive } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useChipStyle } from './chip.style'

const props = withDefaults(defineProps<ChipProps>(), {
  color: 'primary',
  variant: 'normal',
  position: 'tr',
  standalone: false,
  inset: false,
  visible: true,
  hideZero: false,
})

const isVisible = computed(() => {
  if (!props.visible)
    return false

  if (props.hideZero)
    return Number(props.value) > 0

  return props.visible
})

const showValue = computed(() => {
  return Object.prototype.toString.call(props.value).slice(8, -1) === 'Number' && props.maxValue
    ? `${Math.min(Number(props.value), props.maxValue)}+`
    : props.value
})

const delegated = reactivePick(props, 'as', 'asChild')
const ui = computed(() => useChipStyle({
  ...props,
  standalone: !!props.standalone,
  inset: !!props.inset,
}))
</script>

<template>
  <Primitive v-bind="delegated" :class="cn(ui.base(), props.class, props.ui?.base)">
    <span v-if="isVisible" :class="cn(ui.chip(), props.class, props.ui?.chip)">
      <slot name="value">
        {{ showValue }}
      </slot>
    </span>

    <slot v-bind="$attrs" />
  </Primitive>
</template>
