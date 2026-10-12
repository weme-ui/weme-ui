import type { IconifyIconProps } from '@iconify/vue'
import type { InputEmits, InputProps } from '../input/input.props'
import type { PasswordInputStyleSlots } from './password-input.style'

export interface PasswordInputProps extends Omit<
  InputProps,
  | 'type'
  | 'loading'
  | 'loadingIcon'
  | 'suffix'
  | 'suffixIcon'
  | 'clearable'
  | 'clearIcon'
  | 'autocomplete'
  | 'countable'
  | 'maxLength'
  | 'modelModifiers'
  | 'class'
  | 'ui'
> {
  visibleIcon?: IconifyIconProps['icon']
  invisibleIcon?: IconifyIconProps['icon']
  toggleVisibility?: boolean
  class?: any
  ui?: Partial<PasswordInputStyleSlots>
}

export interface PasswordInputEmits extends InputEmits {
  'toggle-visibility': [visible: boolean]
}
