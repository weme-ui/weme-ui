import type { DropdownMenuArrowProps, DropdownMenuContentEmits, DropdownMenuContentProps } from 'reka-ui'
import type { DropdownStyle, DropdownStyleSlots } from './dropdown.style'

export type DropdownContentProps<T> = Omit<DropdownMenuContentProps, 'as' | 'asChild'> & {
  items?: T[] | T[][]
  checkedIcon: string
  loadingIcon: string
  externalIcon: string
  portal?: boolean | string | HTMLElement
  arrow?: boolean | Omit<DropdownMenuArrowProps, 'as' | 'asChild'>
  sub?: boolean
  class?: any
  ui: DropdownStyle
  override?: Partial<DropdownStyleSlots>
}

export interface DropdownContentEmits extends DropdownMenuContentEmits {}
