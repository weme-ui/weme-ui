import type { DropdownMenuContentProps, DropdownMenuPortalProps } from 'reka-ui'
import type { DropdownItem } from './dropdown.props'
import type { DropdownStyle, DropdownStyleSlots } from './dropdown.style'

export interface DropdownContentProps extends DropdownMenuContentProps {
  items?: DropdownItem[] | DropdownItem[][]
  sub?: boolean
  class?: any
  portalProps?: DropdownMenuPortalProps
  ui: DropdownStyle
  override?: Partial<DropdownStyleSlots>
}
