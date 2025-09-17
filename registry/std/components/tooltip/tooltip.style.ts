import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTooltipStyle = createVariants({
  slots: {
    base: 'leading-none',
    content: 'overflow-hidden select-none px-2 py-1 text-sm bg-tooltip text-tooltip z-tooltip',
    loading: 'size-3.5 animate-spin',
    arrow: 'fill-tooltip',
  },

  variants: {
    side: {
      top: { content: 'side-top:animate-popup-top state-closed:animate-popup-out-bottom' },
      right: { content: 'side-right:animate-popup-left state-closed:animate-popup-out-left' },
      bottom: { content: 'side-bottom:animate-popup-bottom state-closed:animate-popup-out-top' },
      left: { content: 'side-left:animate-popup-right state-closed:animate-popup-out-right' },
    },
    radius: {
      none: '',
      sm: { content: 'rounded-sm' },
      md: { content: 'rounded-md' },
      lg: { content: 'rounded-lg' },
      xl: { content: 'rounded-xl' },
    },
  },

  defaultVariants: {
    side: 'top',
    radius: 'md',
  },
})

export type TooltipStyleSlots = typeof useTooltipStyle['slots']
export type TooltipStyleProps = VariantProps<typeof useTooltipStyle>
