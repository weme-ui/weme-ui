import type { TooltipArrowProps, TooltipContentEmits, TooltipContentProps, TooltipRootEmits, TooltipRootProps, TooltipTriggerProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { TooltipStyleProps, TooltipStyleSlots } from './tooltip.style'

export interface TooltipProps extends TooltipRootProps {
  text?: string
  side?: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  radius?: TooltipStyleProps['radius']
  content?: Omit<TooltipContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<TooltipContentEmits>>
  arrow?: boolean | Omit<TooltipArrowProps, 'as' | 'asChild'>
  trigger?: TooltipTriggerProps
  portal?: boolean | string | HTMLElement
  loading?: boolean
  class?: any
  ui?: Partial<TooltipStyleSlots>
}

export interface TooltipEmits extends TooltipRootEmits {}
