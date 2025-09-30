import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui'
import type { InputNumberStyleProps, InputNumberStyleSlots } from './input-number.style'

export interface InputNumberProps extends NumberFieldRootProps {
  color?: InputNumberStyleProps['color']
  variant?: InputNumberStyleProps['variant']
  radius?: InputNumberStyleProps['radius']
  size?: InputNumberStyleProps['size']
  class?: any
  ui?: Partial<InputNumberStyleSlots>
}

export interface InputNumberEmits extends NumberFieldRootEmits {}
