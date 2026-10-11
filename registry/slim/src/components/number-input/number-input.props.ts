import type { IconifyIconProps } from '@iconify/vue'
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui'
import type { NumberInputStyleProps, NumberInputStyleSlots } from './number-input.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'

export interface NumberInputProps extends NumberFieldRootProps, Omit<FormFieldSharedProps, 'loading'> {
  variant?: NumberInputStyleProps['variant']
  size?: NumberInputStyleProps['size']
  radius?: NumberInputStyleProps['radius']
  decrementIcon?: IconifyIconProps['icon']
  incrementIcon?: IconifyIconProps['icon']
  placeholder?: string
  unstyled?: boolean
  class?: any
  ui?: Partial<NumberInputStyleSlots>
}

export interface NumberInputEmits extends NumberFieldRootEmits {
  change: [value: number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}
