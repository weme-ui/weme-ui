import type { PrimitiveProps } from 'reka-ui'
import type { OverlayStyleSlots } from './overlay.style'

export interface OverlayProps extends PrimitiveProps {
  to?: string | HTMLElement
  disabled?: boolean
  defer?: boolean
  class?: any
  ui?: Partial<OverlayStyleSlots>
}

export interface OverlayEmits {
  (e: 'open'): void
  (e: 'close'): void
  (e: 'click', event: MouseEvent): void
}
