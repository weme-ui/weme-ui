import type { IconifyIconProps } from '@iconify/vue'
import type { PrimitiveProps } from 'reka-ui'
import type { RangeInputStyleProps, RangeInputStyleSlots } from './range-input.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'

export type RangeInputValue = [number | null, number | null]

export interface RangeInputProps extends PrimitiveProps, Omit<FormFieldSharedProps, 'loading'> {
  defaultValue?: RangeInputValue
  modelValue?: RangeInputValue
  variant?: RangeInputStyleProps['variant']
  size?: RangeInputStyleProps['size']
  radius?: RangeInputStyleProps['radius']
  min?: number
  max?: number
  fromPlaceholder?: string
  toPlaceholder?: string
  fromIcon?: IconifyIconProps['icon']
  toIcon?: IconifyIconProps['icon']
  separator?: string
  separatorIcon?: IconifyIconProps['icon']
  unstyled?: boolean
  class?: any
  ui?: Partial<RangeInputStyleSlots>
}

export interface RangeInputEmits {
  'update:modelValue': [value: RangeInputValue]
  'change': [value: RangeInputValue]
  'focus': [event: FocusEvent]
  'blur': [event: FocusEvent]
}
