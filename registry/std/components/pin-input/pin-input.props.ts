import type { PinInputRootEmits, PinInputRootProps } from 'reka-ui'
import type { PinInputStyleProps, PinInputStyleSlots } from './pin-input.style'

export interface PinInputProps extends PinInputRootProps {
  variant?: PinInputStyleProps['variant']
  size?: PinInputStyleProps['size']
  radius?: PinInputStyleProps['radius']
  length?: number
  invalid?: boolean
  class?: any
  ui?: Partial<PinInputStyleSlots>
}

export interface PinInputEmits extends PinInputRootEmits {}
