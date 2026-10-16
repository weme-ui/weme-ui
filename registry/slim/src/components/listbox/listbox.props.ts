import type { IconifyIconProps } from '@iconify/vue'
import type { ListboxFilterProps, ListboxRootProps } from 'reka-ui'
import type { ListboxStyleProps, ListboxStyleSlots } from './listbox.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type { GroupItems } from '~/composables/use-group-items'

export type ListboxValue = string | number
export type ListboxItems = GroupItems<ListboxValue>

export interface ListboxProps<
  M extends boolean = false,
  V = M extends false ? ListboxValue : ListboxValue[],
> extends Omit<ListboxRootProps<V>, 'modelValue' | 'defaultValue' | 'multiple'>, Omit<FormFieldSharedProps, 'loading' | 'readonly'> {
  modelValue?: V
  defaultValue?: V
  multiple?: M
  filter?: ListboxFilterProps['modelValue']
  items?: ListboxItems
  variant?: ListboxStyleProps['variant']
  size?: ListboxStyleProps['size']
  radius?: ListboxStyleProps['radius']
  placeholder?: string
  emptyText?: string
  emptyIcon?: IconifyIconProps['icon']
  itemIndicatorIcon?: IconifyIconProps['icon']
  unstyled?: boolean
  class?: any
  ui?: Partial<ListboxStyleSlots>
}

export interface ListboxEmits<
  M extends boolean = false,
  V = M extends false ? ListboxValue : ListboxValue[],
> {
  'update:modelValue': [value: V]
  'update:filter': [value: string]
  'change': [value: V]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}
