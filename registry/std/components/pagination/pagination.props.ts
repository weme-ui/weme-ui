import type { PaginationRootEmits, PaginationRootProps } from 'reka-ui'
import type { RouteLocationRaw } from 'vue-router'
import type { PaginationStyleProps, PaginationStyleSlots } from './pagination.style'

export interface PaginationProps extends Omit<PaginationRootProps, 'asChild' | 'itemsPerPage'> {
  itemsPerPage?: number
  variant?: PaginationStyleProps['variant']
  size?: PaginationStyleProps['size']
  align?: PaginationStyleProps['align']
  showTotal?: boolean
  showMore?: boolean
  simple?: boolean
  class?: any
  ui?: Partial<PaginationStyleSlots>
  to?: (page: number) => RouteLocationRaw
}

export interface PaginationEmits extends PaginationRootEmits {}
