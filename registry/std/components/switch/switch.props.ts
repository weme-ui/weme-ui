import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'
import type { SwitchStyleProps, SwitchStyleSlots } from './switch.style'

export interface SwitchProps extends SwitchRootProps {
  color?: SwitchStyleProps['color']
  radius?: SwitchStyleProps['radius']
  size?: SwitchStyleProps['size']
  checkedIcon?: string
  uncheckedIcon?: string
  loading?: boolean
  class?: any
  ui?: Partial<SwitchStyleSlots>
}

export interface SwitchEmits extends SwitchRootEmits {}
