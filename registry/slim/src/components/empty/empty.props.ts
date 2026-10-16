import type { IconifyIconProps } from '@iconify/vue'
import type { PrimitiveProps } from 'reka-ui'
import type { IconTileProps } from '../icon-tile/icon-tile.props'
import type { EmptyStyleProps, EmptyStyleSlots } from './empty.style'

export interface EmptyProps extends PrimitiveProps {
  size?: EmptyStyleProps['size']
  icon?: IconifyIconProps['icon'] | IconTileProps
  title?: string
  description?: string
  unstyled?: boolean
  class?: any
  ui?: Partial<EmptyStyleSlots>
}
