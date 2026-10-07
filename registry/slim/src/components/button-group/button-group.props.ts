import type { RovingFocusGroupEmits, RovingFocusGroupProps } from 'reka-ui'
import type { ButtonProps } from '../button/button.props'
import type { ButtonGroupStyleProps, ButtonGroupStyleSlots } from './button-group.style'

export interface ButtonGroupProps extends RovingFocusGroupProps {
  orientation?: ButtonGroupStyleProps['orientation']
  gap?: ButtonGroupStyleProps['gap']
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  radius?: ButtonProps['radius']
  separator?: boolean
  disabled?: boolean
  class?: any
  ui?: Partial<ButtonGroupStyleSlots>
}

export interface ButtonGroupEmits extends RovingFocusGroupEmits {}
