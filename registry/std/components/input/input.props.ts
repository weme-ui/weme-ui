import type { InputHTMLAttributes } from 'vue'
import type { InputStyleProps, InputStyleSlots } from './input.style'
import type { ModelModifiers } from '~/types/input'

export type InputValue = string | number | null | undefined

export interface InputProps<T extends InputValue = InputValue> {
  as?: any
  id?: string
  name?: string
  type?: 'text' | 'email' | 'number' | 'url' | 'tel' | 'search' | 'password'
  prepend?: string
  prefix?: string
  prefixIcon?: string
  suffixIcon?: string
  suffix?: string
  append?: string
  loading?: boolean
  loadingIcon?: string
  maxLength?: number
  counter?: boolean
  clearIcon?: string
  clear?: boolean
  defaultValue?: T
  modelValue?: T
  variant?: InputStyleProps['variant']
  size?: InputStyleProps['size']
  radius?: InputStyleProps['radius']
  autocomplete?: InputHTMLAttributes['autocomplete']
  placeholder?: string
  autoFocus?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  invalid?: boolean
  modelModifiers?: ModelModifiers<T>
  class?: any
  ui?: Partial<InputStyleSlots>
}

export interface InputEmits<T extends InputValue = InputValue> {
  'update:modelValue': [value: T]
  'change': [value: T]
  'enter': [value: T]
  'clear': [value: T]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}
