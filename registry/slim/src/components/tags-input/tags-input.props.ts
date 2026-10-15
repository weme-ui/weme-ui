import type { IconifyIconProps } from '@iconify/vue'
import type { TagsInputRootEmits, TagsInputRootProps } from 'reka-ui'
import type { TagsInputStyleProps, TagsInputStyleSlots } from './tags-input.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'

export type TagsInputValue = string

export interface TagsInputProps extends TagsInputRootProps<TagsInputValue>, Omit<FormFieldSharedProps, 'loading'> {
  variant?: TagsInputStyleProps['variant']
  radius?: TagsInputStyleProps['radius']
  size?: TagsInputStyleProps['size']
  prefix?: string
  prefixIcon?: IconifyIconProps['icon']
  itemIcon?: IconifyIconProps['icon']
  clearIcon?: IconifyIconProps['icon']
  placeholder?: string
  clearable?: boolean
  unstyled?: boolean
  class?: any
  ui?: Partial<TagsInputStyleSlots>
}

export interface TagsInputEmits extends TagsInputRootEmits<TagsInputValue> {
  change: [values: TagsInputValue[] | null]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
