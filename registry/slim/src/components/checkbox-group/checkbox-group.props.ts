import type { IconifyIconProps } from '@iconify/vue'
import type { CheckboxGroupRootEmits, CheckboxGroupRootProps } from 'reka-ui'
import type { CheckboxGroupStyleProps, CheckboxGroupStyleSlots } from './checkbox-group.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'
import type { GroupItem } from '~/composables/use-group-items'

export type CheckboxGroupValue = string | number

export type CheckboxGroupItem = Omit<
  GroupItem<CheckboxGroupValue>,
  | 'type'
  | 'onSelect'
  | 'icon'
  | 'selectedIcon'
  | 'iconClass'
> & {
  indeterminateIcon?: IconifyIconProps['icon']
  indeterminateIconClass?: any
  checkedIcon?: IconifyIconProps['icon']
  checkedIconClass?: any
}

export interface CheckboxGroupProps extends
  Omit<CheckboxGroupRootProps<CheckboxGroupValue>, 'asChild'>,
  Omit<FormFieldSharedProps, 'readonly' | 'loading'>
{
  items: CheckboxGroupItem[]
  variant?: CheckboxGroupStyleProps['variant']
  size?: CheckboxGroupStyleProps['size']
  radius?: CheckboxGroupStyleProps['radius']
  orientation?: CheckboxGroupStyleProps['orientation']
  align?: CheckboxGroupStyleProps['align']
  indicator?: 'start' | 'end' | 'none'
  indeterminateIcon?: IconifyIconProps['icon']
  indeterminateIconClass?: any
  checkedIcon?: IconifyIconProps['icon']
  checkedIconClass?: any
  inverted?: boolean
  unstyled?: boolean
  class?: any
  ui?: Partial<CheckboxGroupStyleSlots>
}

export interface CheckboxGroupEmits extends CheckboxGroupRootEmits<CheckboxGroupValue> {
  change: [value: CheckboxGroupValue[]]
}
