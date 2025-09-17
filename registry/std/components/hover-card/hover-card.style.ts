import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useHoverCardStyle = createVariants({
  slots: {
    base: 'px-6 py-4.5 shadow-sm transition state-open:z-popup',
    trigger: '',
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

export type HoverCardStyleSlots = typeof useHoverCardStyle['slots']
export type HoverCardStyleProps = VariantProps<typeof useHoverCardStyle>
