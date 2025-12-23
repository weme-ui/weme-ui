import type { DropdownMenuArrowProps, DropdownMenuPortalProps, DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { KbdProps } from '../kbd/kbd.props'
import type { DropdownContentEmits, DropdownContentProps } from './dropdown-content.props'
import type { DropdownStyleProps, DropdownStyleSlots } from './dropdown.style'

export type DropdownItemType = 'label' | 'link' | 'checkbox' | 'radio' | 'separator'

export interface DropdownItem {
  label?: string
  icon?: string
  type?: DropdownItemType
  value?: string
  shortcut?: KbdProps['value'][] | KbdProps[]
  suffix?: string
  href?: string
  target?: string
  rel?: string
  checked?: boolean
  loading?: boolean
  disabled?: boolean
  ui?: Partial<Pick<DropdownStyleSlots, 'itemCommand' | 'itemArrowIcon' | 'itemExternalIcon' | 'itemIcon' | 'itemLabel' | 'itemIndicator'>>
  class?: any
  children?: DropdownItem[] | DropdownItem[][]
  onCheck?: (checked: boolean) => void
  onSelect?: (e: Event) => void
}

export interface DropdownProps<T extends DropdownItem = DropdownItem> extends DropdownMenuRootProps {
  items?: T[] | T[][]
  checkedIcon?: string
  loadingIcon?: string
  externalIcon?: string
  side?: DropdownStyleProps['side']
  radius?: DropdownStyleProps['radius']
  translucent?: DropdownStyleProps['translucent']
  content?: Omit<DropdownContentProps<T>, 'sub' | 'class' | 'ui' | 'override' | 'items' | 'checkedIcon' | 'loadingIcon' | 'externalIcon' | 'portal' | 'arrow'> & EmitsToProps<Partial<DropdownContentEmits>>
  portal?: string | DropdownMenuPortalProps
  arrow?: boolean | Omit<DropdownMenuArrowProps, 'as' | 'asChild'>
  disabled?: boolean
  class?: any
  ui?: Partial<DropdownStyleSlots>
}

export interface DropdownEmits extends DropdownMenuRootEmits {}
