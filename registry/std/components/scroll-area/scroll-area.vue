<script lang="ts" setup>
import type { ScrollAreaProps } from './scroll-area.props'
import { reactiveOmit } from '@vueuse/core'
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'
import { cn } from '~/utils/styles'
import { useScrollAreaStyle } from './scroll-area.style'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ScrollAreaProps>()
const delegated = reactiveOmit(props, 'class', 'ui')
const ui = useScrollAreaStyle()
</script>

<template>
  <ScrollAreaRoot v-bind="delegated" :class="cn(ui.base(), props.class, props.ui?.base)">
    <ScrollAreaViewport :class="cn(ui.viewport(), props.ui?.viewport)">
      <slot />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar orientation="horizontal" :class="cn(ui.scrollbar(), props.ui?.scrollbar)">
      <ScrollAreaThumb :class="cn(ui.thumb(), props.ui?.thumb)" />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar orientation="vertical" :class="cn(ui.scrollbar(), props.ui?.scrollbar)">
      <ScrollAreaThumb :class="cn(ui.thumb(), props.ui?.thumb)" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
