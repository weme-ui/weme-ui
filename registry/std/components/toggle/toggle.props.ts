import type { ToggleEmits as _ToggleEmits, ToggleProps as _ToggleProps } from 'reka-ui'
import type { ToggleStyleProps, ToggleStyleSlots } from './toggle.style'

export interface ToggleProps extends _ToggleProps {
  label?: string
  icon?: string
  offIcon?: string
  color?: ToggleStyleProps['color']
  variant?: ToggleStyleProps['variant']
  size?: ToggleStyleProps['size']
  radius?: ToggleStyleProps['radius']
  class?: any
  ui?: Partial<ToggleStyleSlots>
}

export interface ToggleEmits extends _ToggleEmits {}
