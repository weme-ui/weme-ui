<script lang="ts" setup>
import type { LensEmits, LensProps } from './lens.props'
import { reactivePick } from '@vueuse/core'
import { Motion } from 'motion-v'
import { Primitive, useForwardPropsEmits } from 'reka-ui'
import { computed, ref, watchEffect } from 'vue'
import { cn } from '~/utils/styles'
import { useLensStyle } from './lens.style'

const props = withDefaults(defineProps<LensProps>(), {
  size: 150,
  zoom: 1.5,
})

const emits = defineEmits<LensEmits>()
const delegated = reactivePick(props, 'as', 'asChild')
const forwarded = useForwardPropsEmits(delegated, emits)

const position = ref({ x: 0, y: 0 })
const isHovering = ref(false)

const ui = computed(() => useLensStyle({
  hovering: isHovering.value,
}))

const maskPosition = computed(() => {
  return `${props.size! / 2}px at ${position.value.x}px ${position.value.y}px`
})

function setIsHovering(hover: boolean) {
  isHovering.value = hover
  emits('hover', hover)
}

function onMouseMove(e: MouseEvent) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  position.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  }
}

watchEffect(() => {
  setIsHovering(false)
})
</script>

<template>
  <Primitive
    v-bind="forwarded"
    data-slot="lens"
    :class="cn(ui.base(), props.ui?.base, props.class)"
    :style="{
      '--lens-x': `${position.x}px`,
      '--lens-y': `${position.y}px`,
      '--lens-size': `${size / 2}px`,
      '--lens-zoom': zoom,
    }"
    @mousemove="onMouseMove"
    @mouseenter="setIsHovering(true)"
    @mouseleave="setIsHovering(false)"
  >
    <slot />
    <Motion
      v-show="isHovering"
      data-slot="lens-viewport"
      :initial="{ opacity: 0, scale: 0.58 }"
      :animate="{ opacity: 1, scale: 1 }"
      :exit="{ opacity: 0, scale: 0.8 }"
      :transition="{ duration: 0.3, ease: 'easeOut' }"
      :class="cn(ui.viewport(), props.ui?.viewport)"
      :style="{
        maskImage: `radial-gradient(${maskPosition}, black 100%, transparent 100%)`,
      }"
    >
      <div data-slot="lens-zoom" :class="cn(ui.zoom(), props.ui?.zoom)">
        <slot />
      </div>
    </Motion>
  </Primitive>
</template>
