import type { TooltipContentProps, TooltipProviderProps, TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import type { TooltipStyleProps, TooltipStyleSlots } from './tooltip.style'

export interface TooltipProps extends TooltipProviderProps, TooltipRootProps {
  content?: string
  side?: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  radius?: TooltipStyleProps['radius']
  sideOffset?: TooltipContentProps['sideOffset']
  showArrow?: boolean
  loading?: boolean
  class?: any
  ui?: Partial<TooltipStyleSlots>
}

export interface TooltipEmits extends TooltipRootEmits {}
