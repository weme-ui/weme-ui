import type { AcceptableValue, SelectContentProps, SelectItemProps, SelectItemSelectEvent, SelectPortalProps, SelectRootEmits, SelectRootProps, SelectViewportProps } from 'reka-ui'
import type { AvatarProps } from '../avatar/avatar.props'
import type { ChipProps } from '../chip/chip.props'
import type { SelectStyleProps, SelectStyleSlots } from './select.style'

export interface SelectItem extends Omit<SelectItemProps, 'asChild'> {
  type?: 'label' | 'item' | 'separator'
  label?: string
  icon?: string
  avatar?: AvatarProps
  chip?: ChipProps
  disabled?: boolean
  class?: any
  ui?: Partial<Pick<SelectStyleSlots, 'itemText' | 'itemLeading' | 'itemTrailing' | 'indicator'>>
  onSelect?: (event: SelectItemSelectEvent<AcceptableValue>) => void
  [key: string]: any
}

export interface SelectProps extends SelectRootProps {
  id?: string
  items?: SelectItem[] | SelectItem[][]
  placeholder?: string
  leadingIcon?: string
  trailingIcon?: string
  indicatorIcon?: string
  emptyText?: string
  loadingText?: string
  color?: SelectStyleProps['color']
  variant?: SelectStyleProps['variant']
  radius?: SelectStyleProps['radius']
  size?: SelectStyleProps['size']
  loading?: boolean
  portalProps?: Partial<SelectPortalProps>
  contentProps?: Partial<Omit<SelectContentProps, 'asChild'>>
  viewportProps?: Partial<Omit<SelectViewportProps, 'asChild'>>
  class?: any
  ui?: Partial<SelectStyleSlots>
}

export interface SelectEmits extends SelectRootEmits {
  change: [value: AcceptableValue]
}
