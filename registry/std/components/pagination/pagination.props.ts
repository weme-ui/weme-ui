import type { PaginationRootEmits, PaginationRootProps } from 'reka-ui'
import type { RouteLocationRaw } from 'vue-router'
import type { PaginationStyleProps, PaginationStyleSlots } from './pagination.style'

export interface PaginationProps extends Omit<PaginationRootProps, 'asChild' | 'itemsPerPage'> {
  itemsPerPage?: number
  firstPageIcon?: string
  prevPageIcon?: string
  nextPageIcon?: string
  lastPageIcon?: string
  ellipsisIcon?: string
  variant?: PaginationStyleProps['variant']
  size?: PaginationStyleProps['size']
  radius?: PaginationStyleProps['radius']
  align?: PaginationStyleProps['align']
  showTotal?: boolean
  showMoreControls?: boolean
  simple?: boolean
  class?: any
  ui?: Partial<PaginationStyleSlots>
  to?: (page: number) => RouteLocationRaw
}

export interface PaginationEmits extends PaginationRootEmits {}
