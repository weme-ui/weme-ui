import type { IconifyIconProps } from '@iconify/vue'
import type { PrimitiveProps } from 'reka-ui'
import type { IconTileStyleProps, IconTileStyleSlots } from './icon-tile.style'

export interface IconTileProps extends PrimitiveProps {
  icon?: IconifyIconProps['icon']
  color?: IconTileStyleProps['color']
  variant?: IconTileStyleProps['variant']
  size?: IconTileStyleProps['size']
  radius?: IconTileStyleProps['radius']
  class?: any
  ui?: Partial<IconTileStyleSlots>
}
