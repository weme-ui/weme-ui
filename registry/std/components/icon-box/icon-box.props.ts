import type { PrimitiveProps } from 'reka-ui'
import type { IconProps } from '../icon/icon.props'
import type { IconBoxStyleProps, IconBoxStyleSlots } from './icon-box.style'

export interface IconBoxProps extends PrimitiveProps, IconProps {
  color?: IconBoxStyleProps['color']
  variant?: IconBoxStyleProps['variant']
  radius?: IconBoxStyleProps['radius']
  size?: IconBoxStyleProps['size']
  class?: any
  ui?: Partial<IconBoxStyleSlots>
}
