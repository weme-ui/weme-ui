import type { PrimitiveProps } from 'reka-ui'
import type { OverlayStyleSlots } from './overlay.style'

export interface OverlayProps extends PrimitiveProps {
  visible?: boolean
  forceMount?: boolean
  class?: any
  ui?: Partial<OverlayStyleSlots>
}
