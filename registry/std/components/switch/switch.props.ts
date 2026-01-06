import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { SwitchStyleProps, SwitchStyleSlots } from './switch.style'

export interface SwitchProps extends SwitchRootProps {
  color?: SwitchStyleProps['color']
  size?: SwitchStyleProps['size']
  radius?: SwitchStyleProps['radius']
  icon?: boolean
  checkedIcon?: string
  uncheckedIcon?: string
  loadingIcon?: string
  loading?: boolean
  class?: any
  ui?: Partial<SwitchStyleSlots>
}

export interface SwitchEmits extends SwitchRootEmits {}
