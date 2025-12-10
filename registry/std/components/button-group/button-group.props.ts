import type { PrimitiveProps } from 'reka-ui'
import type { ButtonStyleProps } from '../button/button.style'
import type { ButtonGroupStyleProps, ButtonGroupStyleSlots } from './button-group.style'

export interface ButtonGroupProps extends PrimitiveProps {
  color?: ButtonStyleProps['color']
  variant?: ButtonStyleProps['variant']
  size?: ButtonStyleProps['size']
  radius?: ButtonGroupStyleProps['radius']
  gap?: ButtonGroupStyleProps['gap']
  disabled?: boolean
  class?: any
  ui?: Partial<ButtonGroupStyleSlots>
}
