import type { ContextMenuContentEmits as _ContextMenuContentEmits, ContextMenuContentProps as _ContextMenuContentProps, ContextMenuArrowProps, ContextMenuPortalProps } from 'reka-ui'
import type { DropdownStyle, DropdownStyleSlots } from '../dropdown/dropdown.style'

export type ContextMenuContentProps<T> = Omit<_ContextMenuContentProps, 'as' | 'asChild'> & {
  items?: T[] | T[][]
  checkedIcon: string
  loadingIcon: string
  externalIcon: string
  portal?: ContextMenuPortalProps
  arrow?: boolean | Omit<ContextMenuArrowProps, 'as' | 'asChild'>
  sub?: boolean
  class?: any
  ui: DropdownStyle
  override?: Partial<DropdownStyleSlots>
}

export interface ContextMenuContentEmits extends _ContextMenuContentEmits {}
