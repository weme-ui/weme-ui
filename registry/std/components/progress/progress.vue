<script lang="ts" setup>
import type { ProgressEmits, ProgressProps } from './progress.props'
import { reactiveOmit } from '@vueuse/core'
import { ProgressIndicator, ProgressRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useProgressStyle } from './progress.style'

const props = withDefaults(defineProps<ProgressProps>(), {
  color: 'primary',
  size: 'md',
  radius: 'lg',
  animate: 'none',
})

const emits = defineEmits<ProgressEmits>()
const delegated = reactiveOmit(props, 'class', 'ui', 'label', 'color', 'size', 'radius', 'animate')
const forwarded = useForwardPropsEmits(delegated, emits)

const ui = computed(() => useProgressStyle({
  ...props,
  showInfo: toBoolValue(!!props.label),
}))
</script>

<template>
  <ProgressRoot v-bind="forwarded" :class="cn(ui.base(), props.ui?.base, props.class)">
    <div v-if="label" :class="cn(ui.info(), props.ui?.info)">
      <span :class="cn(ui.label(), props.ui?.label)">{{ label }}</span>
      <span :class="cn(ui.value(), props.ui?.value)">
        <slot name="value" v-bind="{ value: modelValue }">
          {{ modelValue }} <small>%</small>
        </slot>
      </span>
    </div>
    <div :class="cn(ui.tracker(), props.ui?.tracker)">
      <ProgressIndicator
        :class="cn(ui.indicator(), props.ui?.indicator)"
        :style="`transform: translateX(-${100 - (modelValue ?? 0)}%)`"
      />
    </div>
  </ProgressRoot>
</template>
