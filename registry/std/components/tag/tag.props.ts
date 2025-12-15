import type { PrimitiveProps } from 'reka-ui'
import type { TagStyleProps, TagStyleSlots } from './tag.style'

export interface TagProps extends PrimitiveProps {
  label?: string
  closeIcon?: string
  color?: TagStyleProps['color']
  variant?: TagStyleProps['variant']
  size?: TagStyleProps['size']
  radius?: TagStyleProps['radius']
  disabled?: boolean
  closable?: boolean
  class?: any
  ui?: Partial<TagStyleSlots>
}

export interface TagEmits {
  (e: 'close'): void
}
