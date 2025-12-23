import type { ContextMenuArrowProps, ContextMenuRootEmits, ContextMenuRootProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { DropdownItem } from '../dropdown/dropdown.props'
import type { DropdownStyleProps, DropdownStyleSlots } from '../dropdown/dropdown.style'
import type { ContextMenuContentEmits, ContextMenuContentProps } from './context-menu-content.props'

export type ContextMenuItem = DropdownItem

export interface ContextMenuProps<T extends ContextMenuItem = ContextMenuItem> extends ContextMenuRootProps {
  items?: T[] | T[][]
  checkedIcon?: string
  loadingIcon?: string
  externalIcon?: string
  side?: DropdownStyleProps['side']
  radius?: DropdownStyleProps['radius']
  translucent?: DropdownStyleProps['translucent']
  content?: Omit<ContextMenuContentProps<T>, 'sub' | 'class' | 'ui' | 'override' | 'items' | 'checkedIcon' | 'loadingIcon' | 'externalIcon'> & EmitsToProps<Partial<ContextMenuContentEmits>>
  portal?: boolean | string | HTMLElement
  arrow?: boolean | Omit<ContextMenuArrowProps, 'as' | 'asChild'>
  disabled?: boolean
  class?: any
  ui?: Partial<DropdownStyleSlots>
}

export interface ContextMenuEmits extends ContextMenuRootEmits {}
