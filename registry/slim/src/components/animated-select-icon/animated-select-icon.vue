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
      :initial="{ scale: 0.85 }"
      :animate="{ scale: 1 }"
      :exit="{ scale: 0.75 }"
      :transition="{
        ease: 'easeOut',
        duration: 0.15,
        bounce: 0.3,
      }"
      :class="cn('shrink-0 pointer-events-none', props.class)"
      as-child
    >
      <Icon :name="selected ? (selectedIcon || icon) : icon" />
    </Motion>
  </AnimatePresence>
</template>
