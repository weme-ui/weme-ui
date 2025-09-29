import type { ToggleEmits as _ToggleEmits, ToggleProps as _ToggleProps } from 'reka-ui'
import type { ToggleStyleProps } from './toggle.style'

export interface ToggleProps extends _ToggleProps {
  icon?: string
  text?: string
  color?: ToggleStyleProps['color']
  orientation?: ToggleStyleProps['orientation']
  radius?: ToggleStyleProps['radius']
  size?: ToggleStyleProps['size']
  loading?: boolean
  class?: any
}

export interface ToggleEmits extends _ToggleEmits {}
