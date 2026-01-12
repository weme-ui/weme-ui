import type { ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui'
import type { ToggleProps } from '../toggle/toggle.props'
import type { ToggleStyleSlots } from '../toggle/toggle.style'
import type { ToggleGroupStyleSlots } from './toggle-group.style'

export interface ToggleGroupItem {
  value: string
  label?: string
  icon?: string
  offIcon?: string
  class?: any
  ui?: Partial<Pick<ToggleStyleSlots, 'label' | 'icon'>>
}

export interface ToggleGroupProps extends ToggleGroupRootProps {
  items?: ToggleGroupItem[]
  color?: ToggleProps['color']
  variant?: ToggleProps['variant']
  size?: ToggleProps['size']
  radius?: ToggleProps['radius']
  class?: any
  ui?: Partial<ToggleGroupStyleSlots>
}

export interface ToggleGroupEmits extends ToggleGroupRootEmits {}
