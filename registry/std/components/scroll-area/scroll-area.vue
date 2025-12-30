<script lang="ts" setup generic="T extends ScrollAreaItem">
import type { VirtualItem } from '@tanstack/vue-virtual'
import type { ComponentPublicInstance, CSSProperties } from 'vue'
import type { ScrollAreaEmits, ScrollAreaItem, ScrollAreaProps, ScrollAreaSlots } from './scroll-area.props'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { defu } from 'defu'
import { ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from 'reka-ui'
import { computed, toRef, useTemplateRef, watch } from 'vue'
import { useLocale } from '~/composables/use-locale'
import { toBoolValue } from '~/utils/props'
import { cn } from '~/utils/styles'
import { useScrollAreaStyle } from './scroll-area.style'

const props = withDefaults(defineProps<ScrollAreaProps<T>>(), {
  orientation: 'vertical',
  size: 'sm',
  radius: 'sm',
  virtualize: false,
})

const emits = defineEmits<ScrollAreaEmits>()
defineSlots<ScrollAreaSlots<T>>()

const ui = computed(() => useScrollAreaStyle({
  orientation: props.orientation,
  size: props.size,
  radius: props.radius,
  virtualize: toBoolValue(props.virtualize),
}))
const rootRef = useTemplateRef<ComponentPublicInstance>('rootRef')
const { dir } = useLocale()

const isRtl = computed(() => dir.value === 'rtl')
const isHorizontal = computed(() => props.orientation === 'horizontal')
const isVertical = computed(() => !isHorizontal.value)

const virtualizerProps = toRef(() => {
  const options = typeof props.virtualize === 'boolean' ? {} : props.virtualize

  return defu(options, {
    estimateSize: 100,
    overscan: 12,
    gap: 0,
    paddingStart: 0,
    paddingEnd: 0,
    scrollMargin: 0,
  })
})

const lanes = computed(() => {
  const value = virtualizerProps.value.lanes
  return typeof value === 'number' ? value : undefined
})

const virtualizer = !!props.virtualize && useVirtualizer({
  ...virtualizerProps.value,
  get overscan() {
    return virtualizerProps.value.overscan
  },
  get gap() {
    return virtualizerProps.value.gap
  },
  get paddingStart() {
    return virtualizerProps.value.paddingStart
  },
  get paddingEnd() {
    return virtualizerProps.value.paddingEnd
  },
  get scrollMargin() {
    return virtualizerProps.value.scrollMargin
  },
  get lanes() {
    return lanes.value
  },
  get isRtl() {
    return isRtl.value
  },
  get count() {
    return props.items?.length || 0
  },
  getScrollElement: () => rootRef.value?.$el,
  get horizontal() {
    return isHorizontal.value
  },
  estimateSize: (index: number) => {
    const estimate = virtualizerProps.value.estimateSize
    return typeof estimate === 'function' ? estimate(index) : estimate
  },
})

const virtualItems = computed<VirtualItem[]>(() => virtualizer ? virtualizer.value.getVirtualItems() : [])
const totalSize = computed(() => virtualizer ? virtualizer.value.getTotalSize() : 0)

const virtualViewportStyle = computed<CSSProperties>(() => ({
  position: 'relative',
  inlineSize: isHorizontal.value ? `${totalSize.value}px` : '100%',
  blockSize: isVertical.value ? `${totalSize.value}px` : '100%',
}))

function getVirtualItemStyle(virtualItem: VirtualItem): CSSProperties {
  const hasLanes = lanes.value !== undefined && lanes.value > 1
  const lane = virtualItem.lane
  const gap = virtualizerProps.value.gap ?? 0

  const laneSize = hasLanes
    ? `calc((100% - ${(lanes.value! - 1) * gap}px) / ${lanes.value})`
    : '100%'
  const lanePosition = hasLanes && lane !== undefined
    ? `calc(${lane} * ((100% - ${(lanes.value! - 1) * gap}px) / ${lanes.value} + ${gap}px))`
    : 0

  return {
    position: 'absolute',
    insetBlockStart: isHorizontal.value && hasLanes ? lanePosition : 0,
    insetInlineStart: isVertical.value && hasLanes ? lanePosition : 0,
    blockSize: isHorizontal.value ? (hasLanes ? laneSize : '100%') : undefined,
    inlineSize: isVertical.value ? (hasLanes ? laneSize : '100%') : undefined,
    transform: isHorizontal.value
      ? `translateX(${isRtl.value ? -virtualItem.start : virtualItem.start}px)`
      : `translateY(${virtualItem.start}px)`,
  }
}

function measureElement(el: Element | ComponentPublicInstance | null) {
  if (el && virtualizer) {
    const element = el instanceof Element ? el : (el as ComponentPublicInstance).$el as Element
    virtualizer.value.measureElement(element)
  }
}

function getItemKey(item: T, index: number) {
  if (virtualizerProps.value.getItemKey) {
    return virtualizerProps.value.getItemKey(index)
  }
  if (item && typeof item === 'object' && 'id' in item) {
    return (item as any).id
  }
  return index
}

watch(lanes, () => {
  if (virtualizer)
    virtualizer.value.measure()
}, {
  flush: 'sync',
})

watch(
  () => (virtualizer ? virtualizer.value.isScrolling : false),
  isScrolling => emits('scroll', isScrolling),
)

defineExpose({
  get $el() {
    return rootRef.value?.$el as HTMLElement
  },
  virtualizer: virtualizer || undefined,
})
</script>

<template>
  <ScrollAreaRoot
    ref="rootRef"
    :as="as"
    :data-orientation="orientation"
    :class="cn(ui.root(), props.ui?.root, props.class)"
    data-slot="scroll-area"
  >
    <template v-if="virtualizer">
      <ScrollAreaViewport
        :style="virtualViewportStyle"
        :class="cn(ui.viewport(), props.ui?.viewport)"
        data-virtualize=""
        data-slot="scroll-area-viewport"
      >
        <div
          v-for="virtualItem in virtualItems"
          :key="String(virtualItem.key)"
          :ref="measureElement"
          :data-index="virtualItem.index"
          :class="ui.item({ class: props.ui?.item })"
          :style="getVirtualItemStyle(virtualItem)"
          data-slot="scroll-area-item"
        >
          <slot
            :item="(items?.[virtualItem.index] as T)"
            :index="virtualItem.index"
            :virtual-item="virtualItem"
          />
        </div>
      </ScrollAreaViewport>
    </template>

    <template v-else>
      <ScrollAreaViewport :class="cn(ui.viewport(), props.ui?.viewport)" data-slot="scroll-area-viewport">
        <template v-if="items?.length">
          <div
            v-for="(item, index) in items"
            :key="getItemKey(item, index)"
            :class="cn(ui.item(), props.ui?.item)"
            data-slot="scroll-area-item"
          >
            <slot :item="item" :index="index" />
          </div>
        </template>
        <template v-else>
          <slot />
        </template>
      </ScrollAreaViewport>
    </template>

    <ScrollAreaScrollbar :orientation="orientation" :class="cn(ui.scrollbar(), props.ui?.scrollbar)" data-slot="scroll-area-scrollbar">
      <ScrollAreaThumb :class="cn(ui.thumb(), props.ui?.thumb)" data-slot="scroll-area-thumb" />
    </ScrollAreaScrollbar>
  </ScrollAreaRoot>
</template>
