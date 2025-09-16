import type { AvatarFallbackProps, AvatarImageEmits, AvatarImageProps, PrimitiveProps } from 'reka-ui'
import type { AvatarStyleProps, AvatarStyleSlots } from './avatar.style'

export interface AvatarProps extends PrimitiveProps {
  src?: string
  alt?: string
  fallback?: string
  icon?: string
  delayMs?: AvatarFallbackProps['delayMs']
  crossOrigin?: AvatarImageProps['crossOrigin']
  referrerPolicy?: AvatarImageProps['referrerPolicy']
  color?: AvatarStyleProps['color']
  variant?: AvatarStyleProps['variant']
  size?: AvatarStyleProps['size']
  radius?: AvatarStyleProps['radius']
  class?: any
  ui?: Partial<AvatarStyleSlots>
}

export interface AvatarEmits extends AvatarImageEmits {}
