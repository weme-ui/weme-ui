import type { ScrollAreaRootProps } from 'reka-ui'
import type { ScrollAreaStyleProps, ScrollAreaStyleSlots } from './scroll-area.style'

export interface ScrollAreaProps extends ScrollAreaRootProps {
  size?: ScrollAreaStyleProps['size']
  radius?: ScrollAreaStyleProps['radius']
  class?: any
  ui?: Partial<ScrollAreaStyleSlots>
}
