import type { InputEmits, InputProps } from '../input/input.props'
import type { InputStyleSlots } from '../input/input.style'
import type { PasswordInputStyleSlots } from './password-input.style'

export interface PasswordInputProps extends Omit<InputProps, 'type' | 'class' | 'ui'> {
  type?: 'password' | 'text'
  visibility?: boolean
  visibleIcon?: string
  hiddenIcon?: string
  class?: any
  ui?: Partial<InputStyleSlots> & Partial<PasswordInputStyleSlots>
}

export interface PasswordInputEmits extends InputEmits {
  visibleChange: [visible: boolean]
}
