import type { PrimitiveProps } from 'reka-ui'
import type { TableStyleSlots } from './table.style'

export interface TableColumn {
  prop: string
  label?: string
  width?: string
  minWidth?: string
  fixed?: boolean
  align?: 'left' | 'center' | 'right' | 'justify'
  type?: 'default' | 'selection' | 'expand'
  transform?: (value: string) => string
}

export interface TableProps extends PrimitiveProps {
  height?: string
  maxHeight?: string
  highlight?: boolean
  stripe?: boolean
  fit?: boolean
  border?: boolean
  hideHeader?: boolean
  class?: any
  ui?: Partial<TableStyleSlots>
}
