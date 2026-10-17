import type { IconifyIconProps } from '@iconify/vue'
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import type { CheckboxStyleProps, CheckboxStyleSlots } from './checkbox.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'

export interface CheckboxProps<T extends boolean> extends CheckboxRootProps<T>, Omit<FormFieldSharedProps, 'readonly' | 'loading'> {
  variant?: CheckboxStyleProps['variant']
  size?: CheckboxStyleProps['size']
  radius?: CheckboxStyleProps['radius']
  align?: CheckboxStyleProps['align']
  indicator?: 'start' | 'end' | 'none'
  indeterminateIcon?: IconifyIconProps['icon']
  indeterminateIconClass?: any
  checkedIcon?: IconifyIconProps['icon']
  checkedIconClass?: any
  label?: string
  description?: string
  unstyled?: boolean
  inverted?: boolean
  class?: any
  ui?: Partial<CheckboxStyleSlots>
}

export interface CheckboxEmits<T extends boolean> extends CheckboxRootEmits<T> {
  change: [value: T]
}
