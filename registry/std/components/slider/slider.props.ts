import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import type { TooltipProps } from '../tooltip/tooltip.props'
import type { SliderStyleProps, SliderStyleSlots } from './slider.style'

export interface SliderProps extends SliderRootProps {
  color?: SliderStyleProps['color']
  size?: SliderStyleProps['size']
  radius?: SliderStyleProps['radius']
  tooltip?: boolean | Partial<Omit<TooltipProps, 'as' | 'asChild' | 'text'>>
  class?: any
  ui?: Partial<SliderStyleSlots>
}

export interface SliderEmits extends SliderRootEmits {}
