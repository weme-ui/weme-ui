import type { PopoverArrowProps, PopoverContentEmits, PopoverContentProps, PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { ToggleTooltipStyleProps, ToggleTooltipStyleSlots } from './toggle-tooltip.style'
import type { IconButtonProps } from '~/types'

export interface ToggleTooltipProps extends PopoverRootProps {
  icon?: string | Partial<Omit<IconButtonProps, 'class'>>
  text?: string
  side?: 'top' | 'right' | 'bottom' | 'left' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  radius?: ToggleTooltipStyleProps['radius']
  content?: Omit<PopoverContentProps, 'as' | 'asChild' | 'side' | 'align'> & Partial<EmitsToProps<PopoverContentEmits>>
  arrow?: boolean | Omit<PopoverArrowProps, 'as' | 'asChild'>
  portal?: boolean | string | HTMLElement
  loading?: boolean
  class?: any
  ui?: Partial<ToggleTooltipStyleSlots>
}

export interface ToggleTooltipEmits extends PopoverRootEmits {}
