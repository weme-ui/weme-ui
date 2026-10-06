import type { IconifyIconProps } from '@iconify/vue'
import type { PrimitiveProps } from 'reka-ui'
import type { ButtonStyleProps, ButtonStyleSlots } from './button.style'

export interface ButtonProps extends PrimitiveProps {
  variant?: ButtonStyleProps['variant']
  size?: ButtonStyleProps['size']
  radius?: ButtonStyleProps['radius']
  type?: 'button' | 'submit' | 'reset'
  icon?: IconifyIconProps['icon']
  label?: string
  loadingIcon?: IconifyIconProps['icon']
  loadingText?: string
  tabIndex?: number
  disabled?: boolean
  loading?: boolean
  unstyled?: boolean
  class?: any
  ui?: Partial<ButtonStyleSlots>
  onClick?: ((event: MouseEvent) => void | Promise<void>) | Array<((event: MouseEvent) => void | Promise<void>)>
}
