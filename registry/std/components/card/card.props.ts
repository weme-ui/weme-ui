import type { CardStyleProps, CardStyleSlots } from './card.style'

export interface CardProps {
  icon?: string
  title?: string
  description?: string
  variant?: CardStyleProps['variant']
  radius?: CardStyleProps['radius']
  bordered?: boolean
  translucent?: boolean
  class?: any
  ui?: Partial<CardStyleSlots>
}
