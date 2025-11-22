<script lang="ts" setup>
import type { ProgressEmits, ProgressProps } from './progress.props'
import { reactiveOmit } from '@vueuse/core'
import { ProgressIndicator, ProgressRoot, useForwardPropsEmits } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useProgressStyle } from './progress.style'

const props = withDefaults(defineProps<ProgressProps>(), {
  color: 'primary',
  animate: 'none',
  radius: 'xl',
  size: 'md',
})

const emits = defineEmits<ProgressEmits>()

const delegated = reactiveOmit(props, 'class', 'ui', 'label', 'color', 'animate', 'radius', 'size')
const forwarded = useForwardPropsEmits(delegated, emits)

const slots = useSlots()

const ui = computed(() => useProgressStyle({
  ...props,
  showInfo: !!props.label || !!slots.label?.(),
}))
</script>

<template>
  <ProgressRoot v-bind="forwarded" :class="ui.base({ class: cn(props.class, props.ui?.base) })">
    <div v-if="label || slots.label?.()" :class="ui.info({ class: props.ui?.info })">
      <span :class="ui.label({ class: props.ui?.label })">
        <slot name="label" v-bind="{ modelValue }">
          {{ label }}
        </slot>
      </span>

      <span :class="ui.value({ class: props.ui?.value })">
        {{ modelValue }} <small>%</small>
      </span>
    </div>

    <div :class="ui.tracker({ class: props.ui?.tracker })">
      <ProgressIndicator
        :class="ui.indicator({ class: props.ui?.indicator })"
        :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%)`"
      />
    </div>
  </ProgressRoot>
</template>
