import type { PrimitiveProps } from 'reka-ui'
import type { BadgeStyleProps, BadgeStyleSlots } from './badge.style'

export interface BadgeProps extends PrimitiveProps {
  text?: string
  icon?: string
  href?: string
  target?: string
  rel?: string
  color?: BadgeStyleProps['color']
  variant?: BadgeStyleProps['variant']
  size?: BadgeStyleProps['size']
  radius?: BadgeStyleProps['radius']
  square?: boolean
  disabled?: boolean
  removable?: boolean
  clickable?: boolean
  class?: any
  ui?: Partial<BadgeStyleSlots>
}

export interface BadgeEmits {
  (e: 'remove'): void
}
