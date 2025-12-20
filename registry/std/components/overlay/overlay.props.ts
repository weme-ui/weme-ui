import type { PrimitiveProps } from 'reka-ui'
import type { OverlayStyleSlots } from './overlay.style'

export interface OverlayProps extends PrimitiveProps {
  forceMount?: boolean
  class?: any
  ui?: Partial<OverlayStyleSlots>
}

export interface OverlayEmits {
  (e: 'open', value: boolean): void
}
