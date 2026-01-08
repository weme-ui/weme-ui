import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTooltipStyle = createVariants({
  slots: {
    trigger: 'focus-visible:outline-none',
    contentWrapper: 'flex-(~ center) gap-1.5',
    content: [
      'overflow-hidden select-none px-2.5 py-1 text-sm bg-tooltip/80 text-tooltip z-tooltip backdrop-blur-3xl pointer-events-auto',
      'data-[state=delayed-open]:animate-scale-in state-closed:animate-scale-out origin-$reka-tooltip-content-transform-origin',
    ],
    arrow: 'fill-tooltip/80 backdrop-blur-3xl',
    loading: 'size-3.5 animate-spin',
  },

  variants: {
    radius: {
      none: '',
      xs: { content: 'rounded-xs' },
      sm: { content: 'rounded-sm' },
      md: { content: 'rounded-md' },
      lg: { content: 'rounded-lg' },
      xl: { content: 'rounded-xl' },
    },
  },

  defaultVariants: {
    radius: 'md',
  },
})

export type TooltipStyleSlots = typeof useTooltipStyle['slots']
export type TooltipStyleProps = VariantProps<typeof useTooltipStyle>
