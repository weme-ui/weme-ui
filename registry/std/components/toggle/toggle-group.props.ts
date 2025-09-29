import type { ToggleGroupRootEmits, ToggleGroupRootProps } from 'reka-ui'
import type { ToggleGroupStyleSlots } from './toggle-group.style'
import type { ToggleStyleProps } from './toggle.style'

export interface ToggleGroupItem {
  value: string
  icon?: string
  text?: string
  loading?: boolean
  class?: any
}

export interface ToggleGroupProps extends ToggleGroupRootProps {
  items?: ToggleGroupItem[]
  color?: ToggleStyleProps['color']
  radius?: ToggleStyleProps['radius']
  size?: ToggleStyleProps['size']
  class?: any
  ui?: Partial<ToggleGroupStyleSlots>
}

export interface ToggleGroupEmits extends ToggleGroupRootEmits {}
