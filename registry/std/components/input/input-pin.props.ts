import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui'
import type { InputPinStyleProps, InputPinStyleSlots } from './input-pin.style'

export interface InputPinProps extends PinInputRootProps {
  length?: number
  color?: InputPinStyleProps['color']
  variant?: InputPinStyleProps['variant']
  radius?: InputPinStyleProps['radius']
  size?: InputPinStyleProps['size']
  class?: any
  ui?: Partial<InputPinStyleSlots>
}

export interface InputPinEmits extends PinInputRootEmits {}
