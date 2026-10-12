import type { PrimitiveProps } from 'reka-ui'
import type { PasswordStrengthStyleProps, PasswordStrengthStyleSlots } from './password-strength.style'
import type { UsePasswordStrengthOptions } from '~/composables/use-password-strength'

export interface PasswordStrengthProps extends PrimitiveProps {
  options?: UsePasswordStrengthOptions['options']
  messages?: UsePasswordStrengthOptions['messages']
  size?: PasswordStrengthStyleProps['size']
  password?: string
  disabled?: boolean
  unstyled?: boolean
  showMessage?: boolean
  class?: any
  ui?: Partial<PasswordStrengthStyleSlots>
}
