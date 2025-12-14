import type { PrimitiveProps } from 'reka-ui'
import type { LinkOverlayStyleSlots } from './link-overlay.style'

export interface LinkOverlayProps extends PrimitiveProps {
  class?: any
  ui?: Partial<LinkOverlayStyleSlots>
}
