import type { PrimitiveProps } from 'reka-ui'
import type { DataListStyleProps, DataListStyleSlots } from './data-list.style'

export interface DataListItem {
  label: string
  value: string
  class?: any
  ui?: Partial<Pick<DataListStyleSlots, 'label' | 'value'>>
  [key: string]: any
}

export interface DataListProps extends PrimitiveProps {
  items?: DataListItem[]
  orientation?: DataListStyleProps['orientation']
  size?: DataListStyleProps['size']
  highlight?: DataListStyleProps['highlight']
  class?: any
  ui?: Partial<DataListStyleSlots>
}
