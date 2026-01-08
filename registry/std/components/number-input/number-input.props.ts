import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui'
import type { NumberInputStyleProps, NumberInputStyleSlots } from './number-input.style'

export interface NumberInputProps extends NumberFieldRootProps {
  variant?: NumberInputStyleProps['variant']
  size?: NumberInputStyleProps['size']
  radius?: NumberInputStyleProps['radius']
  orientation?: NumberInputStyleProps['orientation']
  placeholder?: string
  invalid?: boolean
  class?: any
  ui?: Partial<NumberInputStyleSlots>
}

export interface NumberInputEmits extends NumberFieldRootEmits {
  change: [value: number]
}
