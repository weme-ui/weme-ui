<script lang="ts" setup>
import type { ScrollAreaProps } from './scroll-area.props'
import { reactiveOmit } from '@vueuse/core'
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '~/utils/styles'
import { useScrollAreaStyle } from './scroll-area.style'

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  size: 'sm',
  radius: 'sm',
})

const delegated = reactiveOmit(props, 'size', 'radius', 'class', 'ui')
const ui = computed(() => useScrollAreaStyle(props))
</script>

<template>
  <ScrollAreaRoot v-bind="delegated" :class="cn(ui.base(), props.ui?.base, props.class)">
    <ScrollAreaViewport :class="cn(ui.viewport(), props.ui?.viewport)">
      <slot />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar orientation="horizontal" :class="cn(ui.scrollbar({ orientation: 'horizontal' }), props.ui?.scrollbar)">
      <ScrollAreaThumb :class="cn(ui.thumb(), props.ui?.thumb)" />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar orientation="vertical" :class="cn(ui.scrollbar({ orientation: 'vertical' }), props.ui?.scrollbar)">
      <ScrollAreaThumb :class="cn(ui.thumb(), props.ui?.thumb)" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
