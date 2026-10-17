import type { IconifyIconProps } from '@iconify/vue'
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { SwitchStyleProps, SwitchStyleSlots } from './switch.style'
import type { FormFieldSharedProps } from '~/composables/use-form-field-context'

export interface SwitchProps extends SwitchRootProps, Omit<FormFieldSharedProps, 'readonly'> {
  variant?: SwitchStyleProps['variant']
  size?: SwitchStyleProps['size']
  radius?: SwitchStyleProps['radius']
  indicatorIcon?: IconifyIconProps['icon']
  loadingIcon?: IconifyIconProps['icon']
  checkedIcon?: IconifyIconProps['icon']
  uncheckedIcon?: IconifyIconProps['icon']
  unstyled?: boolean
  inverted?: boolean
  class?: any
  ui?: Partial<SwitchStyleSlots>
}

export interface SwitchEmits extends SwitchRootEmits {
  change: [value: boolean]
}
