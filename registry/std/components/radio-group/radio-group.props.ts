import type { RadioGroupItemProps, RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui'
import type { RadioGroupStyleProps, RadioGroupStyleSlots } from './radio-group.style'

export interface RadioItem extends Omit<RadioGroupItemProps, 'asChild'> {
  label?: string
  description?: string
  class?: any
  ui?: Partial<Pick<RadioGroupStyleSlots, 'leading' | 'trailing' | 'wrapper' | 'label' | 'description' | 'indicator'>>
  [key: string]: any
}

export interface RadioGroupProps extends RadioGroupRootProps {
  items?: RadioItem[]
  color?: RadioGroupStyleProps['color']
  variant?: RadioGroupStyleProps['variant']
  orientation?: RadioGroupStyleProps['orientation']
  align?: RadioGroupStyleProps['align']
  radius?: RadioGroupStyleProps['radius']
  size?: RadioGroupStyleProps['size']
  indicator?: 'start' | 'end' | 'none'
  fill?: boolean
  class?: any
  ui?: Partial<RadioGroupStyleSlots>
}

export interface RadioGroupEmits extends RadioGroupRootEmits {
  change: [value: string]
}
