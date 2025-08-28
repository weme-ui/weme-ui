import type { PrimitiveProps } from 'reka-ui'
import type { IconBoxStyleProps, IconBoxStyleSlots } from './icon-box.style'
import type { IconProps } from './icon.props'

export interface IconBoxProps extends PrimitiveProps, IconProps {
  color?: IconBoxStyleProps['color']
  variant?: IconBoxStyleProps['variant']
  radius?: IconBoxStyleProps['radius']
  size?: IconBoxStyleProps['size']
  class?: any
  ui?: Partial<IconBoxStyleSlots>
}
