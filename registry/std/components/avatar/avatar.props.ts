import type { AvatarFallbackProps, AvatarImageEmits, AvatarImageProps, AvatarRootProps } from 'reka-ui'
import type { AvatarStyleProps, AvatarStyleSlots } from './avatar.style'

export interface AvatarProps extends AvatarRootProps {
  src?: string
  fallback?: string
  icon?: string
  crossOrigin?: AvatarImageProps['crossOrigin']
  referrerPolicy?: AvatarImageProps['referrerPolicy']
  delayMs?: AvatarFallbackProps['delayMs']
  color?: AvatarStyleProps['color']
  variant?: AvatarStyleProps['variant']
  size?: AvatarStyleProps['size']
  radius?: AvatarStyleProps['radius']
  class?: any
  ui?: Partial<AvatarStyleSlots>
}

export interface AvatarEmits extends AvatarImageEmits {}
