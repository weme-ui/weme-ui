import type { PrimitiveProps } from 'reka-ui'
import type { LinkStyleProps, LinkStyleSlots } from './link.style'

export interface LinkProps extends PrimitiveProps {
  color?: LinkStyleProps['color']
  variant?: LinkStyleProps['variant']
  class?: any
  ui?: Partial<LinkStyleSlots>
}

export interface LinkEmits {}
