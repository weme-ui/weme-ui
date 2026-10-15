import type { IconifyIconProps } from '@iconify/vue'
import type { ComboboxAnchorProps, ComboboxContentEmits, ComboboxContentProps, ComboboxPortalProps, ComboboxRootProps } from 'reka-ui'
import type { ComboboxStyleProps, ComboboxStyleSlots } from './combobox.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type { GroupItems } from '~/composables/use-group-items'
import type { EmitsToProps } from '~/utils/props'

export type ComboboxValue = string | number

export type ComboboxItems = GroupItems<ComboboxValue>

export interface ComboboxProps<
  M extends boolean = false,
  V = M extends false ? ComboboxValue : ComboboxValue[],
> extends Omit<ComboboxRootProps<V>, 'defaultValues' | 'modelValue' | 'multiple'>, FormFieldSharedProps {
  modelValue?: V
  defaultValue?: V
  multiple?: M
  items?: ComboboxItems
  variant?: ComboboxStyleProps['variant']
  size?: ComboboxStyleProps['size']
  radius?: ComboboxStyleProps['radius']
  prefix?: string
  suffix?: string
  prefixIcon?: IconifyIconProps['icon']
  suffixIcon?: IconifyIconProps['icon']
  loadingIcon?: IconifyIconProps['icon']
  placeholder?: string
  emptyText?: string
  emptyIcon?: IconifyIconProps['icon']
  itemIndicatorIcon?: IconifyIconProps['icon']
  clearIcon?: IconifyIconProps['icon']
  clearable?: boolean
  unstyled?: boolean
  reference?: ComboboxAnchorProps['reference']
  portalProps?: Partial<ComboboxPortalProps>
  contentProps?: Partial<Omit<ComboboxContentProps, 'as' | 'asChild'>> & Partial<EmitsToProps<ComboboxContentEmits>>
  class?: any
  ui?: Partial<ComboboxStyleSlots>
}

export interface ComboboxEmits<
  M extends boolean = false,
  V = M extends false ? ComboboxValue : ComboboxValue[],
> {
  'update:modelValue': [value: V]
  'highlight': [payload: { ref: HTMLElement, value: V } | undefined]
  'change': [value: V]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}
