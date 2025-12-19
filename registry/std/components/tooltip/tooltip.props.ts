import type { TooltipArrowProps, TooltipContentProps, TooltipPortalProps, TooltipRootEmits, TooltipRootProps, TooltipTriggerProps } from 'reka-ui'
import type { TooltipStyleProps, TooltipStyleSlots } from './tooltip.style'

export interface TooltipProps extends TooltipRootProps {
  content?: string
  side?: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  radius?: TooltipStyleProps['radius']
  triggerProps?: TooltipTriggerProps
  portalProps?: TooltipPortalProps
  contentProps?: TooltipContentProps
  arrow?: boolean | TooltipArrowProps
  loading?: boolean
  class?: any
  ui?: Partial<TooltipStyleSlots>
}

export interface TooltipEmits extends TooltipRootEmits {}
