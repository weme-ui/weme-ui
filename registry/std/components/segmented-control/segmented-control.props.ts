import type { RovingFocusGroupEmits, RovingFocusGroupProps } from 'reka-ui'
import type { SegmentedControlStyleProps, SegmentedControlStyleSlots } from './segmented-control.style'

export interface SegmentedControlItem {
  value: string
  label?: string
  icon?: string
  disabled?: boolean
  class?: any
  ui?: Partial<Pick<SegmentedControlStyleSlots, 'icon' | 'label'>>
  onSelect?: (e: Event) => void
}

export interface SegmentedControlProps extends RovingFocusGroupProps {
  id?: string
  name?: string
  defaultValue?: string
  items?: SegmentedControlItem[]
  color?: SegmentedControlStyleProps['color']
  orientation?: SegmentedControlStyleProps['orientation']
  size?: SegmentedControlStyleProps['size']
  radius?: SegmentedControlStyleProps['radius']
  disabled?: boolean
  required?: boolean
  class?: any
  ui?: Partial<SegmentedControlStyleSlots>
}

export interface SegmentedControlEmits extends RovingFocusGroupEmits {
  change: [value: string]
}
