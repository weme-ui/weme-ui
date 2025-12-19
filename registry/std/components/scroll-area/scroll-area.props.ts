import type { VirtualItem, VirtualizerOptions } from '@tanstack/vue-virtual'
import type { ScrollAreaRootProps } from 'reka-ui'
import type { ScrollAreaStyleProps, ScrollAreaStyleSlots } from './scroll-area.style'

export type ScrollAreaItem = any

export interface ScrollAreaVirtualizeOptions extends Partial<Omit<
  VirtualizerOptions<Element, Element>,
  'count' | 'getScrollElement' | 'horizontal' | 'isRtl' | 'estimateSize' | 'lanes' | 'enabled'
>> {
  /**
   * @defaultValue 100
   */
  estimateSize?: number | ((index: number) => number)
  /**
   * @example
   * ```ts
   * const { width } = useWindowSize()
   * const lanes = computed(() => Math.max(1, Math.floor(width.value / 300)))
   * ```
   * @defaultValue undefined
   */
  lanes?: number
}

export interface ScrollAreaProps<T extends ScrollAreaItem = ScrollAreaItem> extends ScrollAreaRootProps {
  items?: T[]
  virtualize?: boolean | ScrollAreaVirtualizeOptions
  orientation?: ScrollAreaStyleProps['orientation']
  size?: ScrollAreaStyleProps['size']
  radius?: ScrollAreaStyleProps['radius']
  class?: any
  ui?: Partial<ScrollAreaStyleSlots>
}

export interface ScrollAreaSlots<T extends ScrollAreaItem = ScrollAreaItem> {
  default: (props: { item: T, index: number, virtualItem?: VirtualItem } | Record<string, never>) => any
}

export interface ScrollAreaEmits {
  (e: 'scroll', isScrolling: boolean): void
}
