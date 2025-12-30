import type { PrimitiveProps } from 'reka-ui'
import type { ListStyleProps, ListStyleSlots } from './list.style'

export interface ListItemProps {
  indicator?: string
  text: string
  class?: any
  ui?: Partial<Pick<ListStyleSlots, 'item' | 'indicator'>>
}

export interface ListProps extends PrimitiveProps {
  items?: ListItemProps[]
  color?: ListStyleProps['color']
  variant?: ListStyleProps['variant']
  class?: any
  ui?: Partial<ListStyleSlots>
}
