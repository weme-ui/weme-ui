import type { PrimitiveProps } from 'reka-ui'
import type { BreadcrumbStyleSlots } from './breadcrumb.style'

export interface BreadcrumbItem {
  label: string
  icon?: string
  to?: string
  class?: any
}

export interface BreadcrumbProps extends PrimitiveProps {
  items?: BreadcrumbItem[]
  separator?: string
  class?: any
  ui?: Partial<BreadcrumbStyleSlots>
}
