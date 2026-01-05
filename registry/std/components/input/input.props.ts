import type { PrimitiveProps } from 'reka-ui'
import type { InputStyleProps, InputStyleSlots } from './input.style'

export type InputValue = string | number | null

export interface InputProps extends PrimitiveProps {
  type?: 'text' | 'email' | 'number' | 'url' | 'tel' | 'search'
  variant?: InputStyleProps['variant']
  size?: InputStyleProps['size']
  radius?: InputStyleProps['radius']
  placeholder?: string
  prepend?: string
  prefix?: string
  prefixIcon?: string
  suffixIcon?: string
  suffix?: string
  append?: string
  maxLength?: number
  counter?: boolean
  clearIcon?: string
  clear?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  invalid?: boolean
  class?: any
  ui?: Partial<InputStyleSlots>
}

export interface InputEmits {
  change: [event: Event]
  enter: [payload: InputValue]
  clear: [payload: InputValue]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}

export interface InputSlots {
  prepend: () => any
  prefix: () => any
  loading: () => any
  counter: (length: number, maxLength: number) => any
  clear: () => any
  suffix: () => any
  append: () => any
}
