import type { DropdownMenuPortalProps, DropdownMenuRootEmits, DropdownMenuRootProps } from 'reka-ui'
import type { KbdProps } from '../kbd/kbd.props'
import type { DropdownStyleProps, DropdownStyleSlots } from './dropdown.style'

export interface DropdownItem {
  label?: string
  value?: string
  icon?: string
  type?: 'label' | 'link' | 'checkbox' | 'separator'
  shortcuts?: KbdProps['value'][] | KbdProps[]
  append?: string
  disabled?: boolean
  checked?: boolean
  loading?: boolean
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  rel?: string
  class?: any
  children?: DropdownItem[] | DropdownItem[][]
  onSelect?: (e: Event) => void
  onCheck?: (checked: boolean) => void
  [key: string]: any
}

export interface DropdownProps extends DropdownMenuRootProps {
  items?: DropdownItem[] | DropdownItem[][]
  side?: DropdownStyleProps['side']
  radius?: DropdownStyleProps['radius']
  translucent?: boolean
  disabled?: boolean
  showArrow?: boolean
  portalProps?: DropdownMenuPortalProps
  class?: any
  ui?: Partial<DropdownStyleSlots>
}

export interface DropdownEmits extends DropdownMenuRootEmits {}
