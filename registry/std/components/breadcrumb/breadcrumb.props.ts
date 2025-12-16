import type { PrimitiveProps } from 'reka-ui'
import type { BreadcrumbStyleProps, BreadcrumbStyleSlots } from './breadcrumb.style'

export interface BreadcrumbItem {
  icon?: string
  label: string
  to?: string
  disabled?: boolean
}

export interface BreadcrumbProps extends PrimitiveProps {
  items?: BreadcrumbItem[]
  size?: BreadcrumbStyleProps['size']
  separator?: string
  separatorIcon?: string
  class?: any
  ui?: Partial<BreadcrumbStyleSlots>
}
