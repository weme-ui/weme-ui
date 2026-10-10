import type { IconifyIconProps } from '@iconify/vue'
import type { InputStyleProps, InputStyleSlots } from './input.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'

type InputValue = string | number | null | undefined

interface InputModelModifiers {
  string?: string extends InputValue ? boolean : never
  number?: number extends InputValue ? boolean : never
  trim?: string extends InputValue ? boolean : never
  lazy?: boolean
  nullable?: null extends InputValue ? boolean : never
  optional?: boolean
}

export interface InputProps extends FormFieldSharedProps {
  as?: any
  modelValue?: InputValue
  defaultValue?: InputValue
  variant?: InputStyleProps['variant']
  size?: InputStyleProps['size']
  radius?: InputStyleProps['radius']
  prefix?: string
  suffix?: string
  prefixIcon?: IconifyIconProps['icon']
  suffixIcon?: IconifyIconProps['icon']
  loadingIcon?: IconifyIconProps['icon']
  clearIcon?: IconifyIconProps['icon']
  countable?: boolean
  clearable?: boolean
  maxLength?: number
  type?: 'text' | 'email' | 'number' | 'url' | 'tel' | 'search' | 'password'
  autocomplete?: 'on' | 'off' | 'string'
  placeholder?: string
  modelModifiers?: InputModelModifiers
  class?: any
  ui?: Partial<InputStyleSlots>
}

export interface InputEmits {
  'update:modelValue': [value: InputValue]
  'enter': [value: InputValue]
  'clean': [value: InputValue]
  'change': [event: Event]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}
