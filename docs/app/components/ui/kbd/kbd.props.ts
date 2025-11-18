import type { PrimitiveProps } from 'reka-ui'
import type { KbdStyleProps } from './kbd.style'
import type { KbdKey } from '~/composables/use-kbd'

export interface KbdProps extends PrimitiveProps {
  value?: KbdKey | string
  color?: KbdStyleProps['color']
  variant?: KbdStyleProps['variant']
  size?: KbdStyleProps['size']
  radius?: KbdStyleProps['radius']
  class?: any
}
