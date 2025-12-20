import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'
import { useTooltipStyle } from '../tooltip/tooltip.style'

export const useToggleTooltipStyle = createVariants({
  extend: useTooltipStyle,
  slots: {
    content: 'state-open:animate-scale-in origin-$reka-popover-content-transform-origin',
  },
})

export type ToggleTooltipStyleSlots = typeof useTooltipStyle['slots']
export type ToggleTooltipStyleProps = VariantProps<typeof useTooltipStyle>
