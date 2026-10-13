import type { Options } from 'motion-v'
import type { ComputedRef, MaybeRefOrGetter, Ref } from 'vue'
import { computed, ref, toValue } from 'vue'

export type PopoverContentSide = 'top' | 'bottom' | 'left' | 'right'

export interface UsePopoverContentOptions {
  open?: Ref<boolean>
  height?: MaybeRefOrGetter<number | 'auto'>
  side?: MaybeRefOrGetter<PopoverContentSide>
  sideOffset?: MaybeRefOrGetter<number>
}

export interface UsePopoverContentReturn {
  initial: Options['initial']
  animate: Options['animate']
  transition: Options['transition']
}

export function usePopoverContent(options: UsePopoverContentOptions = {}): ComputedRef<UsePopoverContentReturn> {
  const open = options.open ?? ref(false)
  const height = open ? toValue(options.height) || 0 : 0
  const side = toValue(options.side) || 'bottom'
  const sideOffset = toValue(options.sideOffset) || 6

  return computed(() => ({
    initial: {
      height: 0,
      opacity: 0,
      y: 0,
    },
    animate: {
      height,
      opacity: open.value ? 1 : 0,
      y: open.value ? side === 'bottom' ? sideOffset : -sideOffset : 0,
    },
    transition: {
      type: 'spring',
      duration: 0.5,
      bounce: 0.2,
    },
  }))
}
