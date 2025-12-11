import type { PrimitiveProps } from 'reka-ui'
import type { CardStyleProps, CardStyleSlots } from './card.style'

export interface CardProps extends PrimitiveProps {
  title?: string
  description?: string
  icon?: string
  variant?: CardStyleProps['variant']
  size?: CardStyleProps['size']
  radius?: CardStyleProps['radius']
  translucent?: boolean
  class?: any
  ui?: Partial<CardStyleSlots>
}
