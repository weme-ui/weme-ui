import type { ScrollAreaRootProps } from 'reka-ui'
import type { ScrollAreaStyleSlots } from './scroll-area.style'

export interface ScrollAreaProps extends ScrollAreaRootProps {
  class?: any
  ui?: Partial<ScrollAreaStyleSlots>
}
