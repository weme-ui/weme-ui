import type { Options } from 'check-password-strength'
import type { PrimitiveProps } from 'reka-ui'
import type { PasswordStrengthMeterStyleProps, PasswordStrengthMeterStyleSlots } from './password-strength-meter.style'

export type PasswordStrengthMeterOptions = Options<string>

export interface PasswordStrengthMeterUserOptions {
  weak: { minDiversity: number, minLength: number }
  medium: { minDiversity: number, minLength: number }
  strong: { minDiversity: number, minLength: number }
}

export interface PasswordStrengthMeterProps extends PrimitiveProps {
  value?: string
  options?: PasswordStrengthMeterUserOptions
  size?: PasswordStrengthMeterStyleProps['size']
  disabled?: boolean
  hiddenLabel?: boolean
  class?: any
  ui?: Partial<PasswordStrengthMeterStyleSlots>
}

export interface PasswordStrengthMeterEmits {}
