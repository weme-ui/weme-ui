import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { SliderStyleProps, SliderStyleSlots } from './slider.style'

export interface SliderProps extends SliderRootProps {
  color?: SliderStyleProps['color']
  orientation?: SliderStyleProps['orientation']
  size?: SliderStyleProps['size']
  disabled?: boolean
  tooltip?: boolean
  util?: string
  class?: any
  ui?: Partial<SliderStyleSlots>
}

export interface SliderEmits extends SliderRootEmits {
  change: [value: number[]]
}
