import type { IconifyIconProps } from '@iconify/vue'
import type { TextareaStyleProps, TextareaStyleSlots } from './textarea.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'

export type TextareaValue = string | null | undefined

export interface TextareaModelModifiers {
  trim?: boolean
  lazy?: boolean
  nullable?: boolean
  optional?: boolean
}

export interface TextareaProps extends FormFieldSharedProps {
  as?: any
  modelValue?: TextareaValue
  defaultValue?: TextareaValue
  loadingIcon?: IconifyIconProps['icon']
  variant?: TextareaStyleProps['variant']
  size?: TextareaStyleProps['size']
  radius?: TextareaStyleProps['radius']
  placeholder?: string
  rows?: number
  maxRows?: number
  maxLength?: number
  autoSize?: boolean
  countable?: boolean
  unstyled?: boolean
  modelModifiers?: TextareaModelModifiers
  class?: any
  ui?: Partial<TextareaStyleSlots>
}

export interface TextareaEmits {
  'update:modelValue': [value: TextareaValue]
  'change': [value: TextareaValue]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}
