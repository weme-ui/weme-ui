import type { RadioGroupRootEmits, RadioGroupRootProps } from 'reka-ui'
import type { RadioGroupStyleProps, RadioGroupStyleSlots } from './radio-group.style'

export interface RadioGroupItem {
  id?: string
  name?: string
  value: string
  label?: string
  description?: string
  disabled?: boolean
  class?: any
  ui?: Partial<Pick<RadioGroupStyleSlots, 'leading' | 'trailing' | 'indicator' | 'label' | 'description'>>
  onSelect?: (e: Event) => void
}

export interface RadioGroupProps extends RadioGroupRootProps {
  items?: RadioGroupItem[]
  color?: RadioGroupStyleProps['color']
  variant?: RadioGroupStyleProps['variant']
  orientation?: RadioGroupStyleProps['orientation']
  align?: RadioGroupStyleProps['align']
  size?: RadioGroupStyleProps['size']
  radius?: RadioGroupStyleProps['radius']
  indicator?: 'start' | 'end' | 'none'
  class?: any
  ui?: Partial<RadioGroupStyleSlots>
}

export interface RadioGroupEmits extends RadioGroupRootEmits {
  change: [value: string]
}
