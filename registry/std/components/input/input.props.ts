import type { PrimitiveProps } from 'reka-ui'
import type { InputHTMLAttributes } from 'vue'
import type { InputStyleProps, InputStyleSlots } from './input.style'

export type InputValue = string | number | null

export interface InputProps extends PrimitiveProps {
  id?: string
  name?: string
  type?: InputHTMLAttributes['type']
  placeholder?: string
  leadingIcon?: string
  trailingIcon?: string
  prepend?: string
  append?: string
  maxLength?: number
  color?: InputStyleProps['color']
  variant?: InputStyleProps['variant']
  radius?: InputStyleProps['radius']
  size?: InputStyleProps['size']
  autofocus?: boolean
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  error?: boolean
  loading?: boolean
  showCount?: boolean
  showClear?: boolean
  class?: any
  ui?: Partial<InputStyleSlots>
}

export interface InputEmits {
  (e: 'update:modelValue', payload: InputValue): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', event: Event): void
  (e: 'clear', payload: InputValue): void
  (e: 'enter', payload: InputValue): void
}
