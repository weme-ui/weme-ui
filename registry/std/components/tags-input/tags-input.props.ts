import type { AcceptableInputValue, TagsInputRootEmits, TagsInputRootProps } from 'reka-ui'
import type { TagsInputStyleProps, TagsInputStyleSlots } from './tags-input.style'

export type TagsInputValue = AcceptableInputValue

export interface TagsInputProps<T extends TagsInputValue = TagsInputValue> extends TagsInputRootProps<T> {
  maxLength?: number
  placeholder?: string
  variant?: TagsInputStyleProps['variant']
  size?: TagsInputStyleProps['size']
  radius?: TagsInputStyleProps['radius']
  deleteIcon?: string
  clearIcon?: string
  icon?: string
  loadingIcon?: string
  loading?: boolean
  autoFocus?: boolean
  invalid?: boolean
  clear?: boolean
  class?: any
  ui?: Partial<TagsInputStyleSlots>
}

export interface TagsInputEmits<T extends TagsInputValue = TagsInputValue> extends TagsInputRootEmits<T> {
  change: [values: T[]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
