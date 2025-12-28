import type { PrimitiveProps } from 'reka-ui'
import type { ItemStyleProps } from '../item/item.style'
import type { ItemGroupStyleProps, ItemGroupStyleSlots } from './item-group.style'

export interface ItemGroupProps extends PrimitiveProps {
  title?: string
  description?: string
  variant?: ItemGroupStyleProps['variant']
  size?: ItemGroupStyleProps['size']
  radius?: ItemGroupStyleProps['radius']
  align?: ItemStyleProps['align']
  class?: any
  ui?: Partial<ItemGroupStyleSlots>
}
