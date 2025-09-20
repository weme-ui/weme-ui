import type { PrimitiveProps } from 'reka-ui'
import type { ButtonStyleProps, ButtonStyleSlots } from './button.style'

export interface ButtonProps extends PrimitiveProps {
  type?: 'button' | 'submit' | 'reset'
  text?: string
  icon?: string
  color?: ButtonStyleProps['color']
  variant?: ButtonStyleProps['variant']
  size?: ButtonStyleProps['size']
  radius?: ButtonStyleProps['radius']
  loading?: boolean
  disabled?: boolean
  square?: boolean
  class?: any
  ui?: Partial<ButtonStyleSlots>
  onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>
}

export interface ButtonEmits {}
