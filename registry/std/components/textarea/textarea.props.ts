import type { PrimitiveProps } from 'reka-ui'
import type { TextareaStyleProps, TextareaStyleSlots } from './textarea.style'

export interface TextareaProps extends PrimitiveProps {
  id?: string
  name?: string
  placeholder?: string
  rows?: number
  maxRows?: number
  maxLength?: number
  counter?: boolean
  autoSize?: boolean
  variant?: TextareaStyleProps['variant']
  radius?: TextareaStyleProps['radius']
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  invalid?: boolean
  class?: any
  ui?: Partial<TextareaStyleSlots>
}

export interface TextareaEmits {
  change: [event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
