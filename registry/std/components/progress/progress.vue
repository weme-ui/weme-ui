<script lang="ts" setup>
import type { ProgressEmits, ProgressProps } from './progress.props'
import { reactiveOmit } from '@vueuse/core'
import { ProgressIndicator, ProgressRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { toBoolValue } from '~/utils/props'
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
  <ProgressRoot v-bind="forwarded" :class="cn(ui.root(), props.ui?.root, props.class)" data-slot="root">
    <div v-if="label" :class="cn(ui.info(), props.ui?.info)" data-slot="info">
      <span :class="cn(ui.label(), props.ui?.label)" data-slot="label">{{ label }}</span>
      <span :class="cn(ui.value(), props.ui?.value)" data-slot="value">
        <slot name="value" v-bind="{ value: modelValue }">
          {{ modelValue }} <small>%</small>
        </slot>
      </span>
    </div>
    <div :class="cn(ui.tracker(), props.ui?.tracker)" data-slot="tracker">
      <ProgressIndicator
        :class="cn(ui.indicator(), props.ui?.indicator)"
        :style="`transform: translateX(-${100 - (modelValue ?? 0)}%)`"
        data-slot="indicator"
      />
    </div>
  </ProgressRoot>
</template>
