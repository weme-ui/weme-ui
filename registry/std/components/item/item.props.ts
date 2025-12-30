import type { PrimitiveProps } from 'reka-ui'
import type { ItemStyleProps, ItemStyleSlots } from './item.style'

export interface ItemProps extends PrimitiveProps {
  icon?: string
  title?: string
  description?: string
  content?: string
  arrowIcon?: string
  loadingIcon?: string
  href?: string
  target?: string
  rel?: string
  color?: ItemStyleProps['color']
  variant?: ItemStyleProps['variant']
  size?: ItemStyleProps['size']
  align?: ItemStyleProps['align']
  radius?: ItemStyleProps['radius']
  loading?: boolean
  disabled?: boolean
  clickable?: boolean
  arrow?: boolean
  class?: any
  ui?: Partial<ItemStyleSlots>
}
