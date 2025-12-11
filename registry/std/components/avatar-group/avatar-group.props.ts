import type { PrimitiveProps } from 'reka-ui'
import type { AvatarProps } from '../avatar/avatar.props'
import type { AvatarGroupStyleProps, AvatarGroupStyleSlots } from './avatar-group.style'

export interface AvatarGroupProps extends PrimitiveProps {
  max?: number
  color?: AvatarProps['color']
  variant?: AvatarProps['variant']
  size?: AvatarGroupStyleProps['size']
  radius?: AvatarProps['radius']
  crossOrigin?: AvatarProps['crossOrigin']
  referrerPolicy?: AvatarProps['referrerPolicy']
  delayMs?: AvatarProps['delayMs']
  class?: any
  ui?: Partial<AvatarGroupStyleSlots>
}
