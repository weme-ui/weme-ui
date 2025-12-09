import type { PrimitiveProps } from 'reka-ui'
import type { SpaceStyleProps, SpaceStyleSlots } from './space.style'

export interface SpaceProps extends PrimitiveProps {
  align?: SpaceStyleProps['align']
  orientation?: SpaceStyleProps['orientation']
  size?: SpaceStyleProps['size']
  wrap?: boolean
  class?: any
  ui?: Partial<SpaceStyleSlots>
}

export interface SpaceSlots {
  default: any
  separator: any
}
