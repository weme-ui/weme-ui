import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePopoverStyle = createVariants({
  slots: {
    base: 'px-6 py-4.5 shadow-lg transition state-open:z-popup',
    trigger: '',
    close: '',
    arrow: '',
  },

  variants: {
    side: {
      top: { base: 'side-top:animate-popup-top state-closed:animate-popup-out-bottom' },
      right: { base: 'side-right:animate-popup-left state-closed:animate-popup-out-left' },
      bottom: { base: 'side-bottom:animate-popup-bottom state-closed:animate-popup-out-top' },
      left: { base: 'side-left:animate-popup-right state-closed:animate-popup-out-right' },
    },
    radius: {
      none: '',
      sm: { base: 'rounded-sm' },
      md: { base: 'rounded-md' },
      lg: { base: 'rounded-lg' },
      xl: { base: 'rounded-xl' },
    },
    translucent: {
      true: { base: 'bg-popover/70 backdrop-blur-3xl', arrow: 'fill-popover/70' },
      false: { base: 'bg-popover', arrow: 'fill-popover' },
    },
  },

  defaultVariants: {
    side: 'bottom',
    radius: 'md',
    translucent: false,
  },
})

export type PopoverStyleSlots = typeof usePopoverStyle['slots']
export type PopoverStyleProps = VariantProps<typeof usePopoverStyle>
