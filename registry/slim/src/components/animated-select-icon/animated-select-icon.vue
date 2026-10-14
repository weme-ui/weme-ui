<script lang="ts" setup>
import type { AnimatedSelectIconProps } from './animated-select-icon.props'
import { AnimatePresence, Motion } from 'motion-v'
import { toBoolDataAttrValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import Icon from '../icon/icon.vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<AnimatedSelectIconProps>()
</script>

<template>
  <AnimatePresence mode="wait">
    <Motion
      v-bind="$attrs"
      :key="selected ? 'selected' : 'unselected'"
      data-slot="animated-select-icon"
      :data-selected="toBoolDataAttrValue(selected)"
      :initial="{ opacity: 0, scale: 0.75 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.5 }"
      :transition="{
        type: 'spring',
        duration: 0.2,
        bounce: 0.3,
      }"
      :class="cn('shrink-0', props.class)"
      as-child
    >
      <Icon :name="selected ? (selectedIcon || icon) : icon" />
    </Motion>
  </AnimatePresence>
</template>
