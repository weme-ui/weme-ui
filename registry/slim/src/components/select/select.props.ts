import type { IconifyIconProps } from '@iconify/vue'
import type { SelectContentEmits, SelectContentProps, SelectPortalProps, SelectRootProps, SelectTriggerProps } from 'reka-ui'
import type { SelectStyleProps, SelectStyleSlots } from './select.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type { GroupItems } from '~/composables/use-group-items'
import type { EmitsToProps } from '~/utils/props'

export type SelectValue = string | number
export type SelectItems = GroupItems<SelectValue>

export interface SelectProps<
  M extends boolean = false,
  V = M extends false ? SelectValue : SelectValue[],
> extends Omit<SelectRootProps<V>, 'defaultValues' | 'modelValue' | 'multiple'>, FormFieldSharedProps {
  modelValue?: V
  defaultValue?: V
  multiple?: M
  items?: SelectItems
  variant?: SelectStyleProps['variant']
  size?: SelectStyleProps['size']
  radius?: SelectStyleProps['radius']
  prefix?: string
  suffix?: string
  prefixIcon?: IconifyIconProps['icon']
  suffixIcon?: IconifyIconProps['icon']
  loadingIcon?: IconifyIconProps['icon']
  placeholder?: string
  emptyText?: string
  emptyIcon?: IconifyIconProps['icon']
  indicatorIcon?: IconifyIconProps['icon']
  reference?: SelectTriggerProps['reference']
  portalProps?: Partial<SelectPortalProps>
  contentProps?: Partial<Omit<SelectContentProps, 'as' | 'asChild'>> & Partial<EmitsToProps<SelectContentEmits>>
  unstyled?: boolean
  class?: any
  ui?: Partial<SelectStyleSlots>
}

export interface SelectEmits<
  M extends boolean = false,
  V = M extends false ? SelectValue : SelectValue[],
> {
  'update:modelValue': [value: V]
  'update:open': [value: boolean]
  'change': [value: V]
}
