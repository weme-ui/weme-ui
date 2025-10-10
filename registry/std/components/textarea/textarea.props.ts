import type { PrimitiveProps } from 'reka-ui'
import type { TextareaStyleProps, TextareaStyleSlots } from './textarea.style'

export interface TextareaProps extends PrimitiveProps {
  id?: string
  name?: string
  placeholder?: string
  rows?: number
  maxLength?: number
  maxRows?: number
  color?: TextareaStyleProps['color']
  variant?: TextareaStyleProps['variant']
  radius?: TextareaStyleProps['radius']
  autoSize?: boolean
  showCount?: boolean
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  error?: boolean
  class?: any
  ui?: Partial<TextareaStyleSlots>
}

export interface TextareaEmits {
  (e: 'update:modelValue', payload: string | null): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', event: Event): void
}
