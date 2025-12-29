import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCarouselStyle = createVariants({
  slots: {
    root: 'group relative focus:outline-none',
    viewport: 'overflow-hidden',
    container: 'flex items-start',
    item: 'min-w-0 shrink-0 basis-full',
    controls: '',
    arrows: '',
    prev: 'abs rounded-full',
    next: 'abs rounded-full',
    dots: 'abs flex-(~ center wrap) gap-2',
    dot: 'cursor-pointer size-2 rounded-full bg-primary-4/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  },

  variants: {
    orientation: {
      horizontal: {
        container: 'flex-row -ms-4',
        item: 'ps-4',
        dots: 'inset-x-0 bottom-2',
        prev: 'start-2 top-1/2 -translate-y-1/2',
        next: 'end-2 top-1/2 -translate-y-1/2',
      },
      vertical: {
        container: 'flex-col -mt-4',
        item: 'pt-4',
        dots: 'flex-col inset-y-0 right-2',
        prev: 'top-2 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
        next: 'bottom-2 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
      },
    },
    autoHide: {
      true: {
        controls: 'op-0 transition-opacity group-hover:op-80',
      },
    },
    active: {
      true: {
        dot: 'bg-primary ring-(2 primary-1/30)',
      },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type CarouselStyleSlots = typeof useCarouselStyle['slots']
export type CarouselStyleProps = VariantProps<typeof useCarouselStyle>
