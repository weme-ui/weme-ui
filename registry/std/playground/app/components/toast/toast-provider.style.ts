import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToastProviderStyle = createVariants({
  slots: {
    viewport: [
      'fixed flex-(~ col) z-tooltip',
      'w-[calc(100%-2rem)] sm:w-toast',
      'data-[expanded=true]:h-$height focus:outline-hidden',
    ],
    toast: [
      'abs inset-x-0 z-$index',
      'translate-y-$translate scale-$scale transform',
      '[&[data-expanded="false"]]:[&[data-front="false"]]:h-toast',
      'children:[&[data-expanded="false"]]:[&[data-front="false"]]:invisible',
      '[&[data-state="closed"][data-expanded="false"][data-front="false"]]:animate-toast-collapse',
      'state-closed:animate-toast-close swipe-move:transition-none property-[transform,height] duration-200 ease-out',
    ],
  },

  variants: {
    side: {
      'top': { viewport: 'left-1/2 -translate-x-1/2' },
      'top-right': { viewport: 'right-4' },
      'top-left': { viewport: 'left-4' },
      'bottom': { viewport: 'left-1/2 -translate-x-1/2' },
      'bottom-right': { viewport: 'right-4' },
      'bottom-left': { viewport: 'left-4' },
    },
    swipeDirection: {
      up: { toast: 'swipe-end:animate-toast-up' },
      down: { toast: 'swipe-end:animate-toast-down' },
      left: { toast: 'swipe-end:animate-toast-left' },
      right: { toast: 'swipe-end:animate-toast-right' },
    },
  },

  compoundVariants: [
    { side: ['top-left', 'top', 'top-right'], class: { viewport: 'top-4', toast: 'top-0 state-open:animate-(slide-in-down duration-200 ease-in-out)' } },
    { side: ['bottom-left', 'bottom', 'bottom-right'], class: { viewport: 'bottom-4', toast: 'bottom-0 state-open:animate-(slide-in-up duration-200 ease-in-out)' } },

    { swipeDirection: ['left', 'right'], class: { toast: 'swipe-move:translate-x-$reka-toast-swipe-move-x swipe-end:translate-x-$reka-toast-swipe-end-x swipe-cancel:translate-x-0' } },
    { swipeDirection: ['up', 'down'], class: { toast: 'swipe-move:translate-y-$reka-toast-swipe-move-y swipe-end:translate-y-$reka-toast-swipe-end-y swipe-cancel:translate-y-0' } },
  ],

  defaultVariants: {
    side: 'bottom-right',
  },
})

export type ToastProviderStyleSlots = typeof useToastProviderStyle['slots']
export type ToastProviderStyleProps = VariantProps<typeof useToastProviderStyle>
