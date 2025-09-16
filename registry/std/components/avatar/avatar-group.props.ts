import type { PrimitiveProps } from 'reka-ui'
import type { AvatarGroupStyleProps, AvatarGroupStyleSlots } from './avatar-group.style'
import type { AvatarProps } from './avatar.props'

export interface AvatarGroupProps extends PrimitiveProps, Omit<AvatarProps, 'src' | 'alt' | 'fallback' | 'ui' | 'size'> {
  max?: number
  size?: AvatarGroupStyleProps['size']
  class?: any
  ui?: Partial<AvatarGroupStyleSlots>
}
