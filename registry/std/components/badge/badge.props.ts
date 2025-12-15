import type { PrimitiveProps } from 'reka-ui'
import type { BadgeStyleProps, BadgeStyleSlots } from './badge.style'

export interface BadgeProps extends PrimitiveProps {
  label?: string
  icon?: string
  href?: string
  target?: string
  rel?: string
  color?: BadgeStyleProps['color']
  variant?: BadgeStyleProps['variant']
  size?: BadgeStyleProps['size']
  radius?: BadgeStyleProps['radius']
  disabled?: boolean
  class?: any
  ui?: Partial<BadgeStyleSlots>
}
