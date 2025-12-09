import type { PrimitiveProps } from 'reka-ui'
import type { MarkStyleProps, MarkStyleSlots } from './mark.style'

export interface MarkProps extends PrimitiveProps {
  color?: MarkStyleProps['color']
  variant?: MarkStyleProps['variant']
  radius?: MarkStyleProps['radius']
  class?: any
  ui?: Partial<MarkStyleSlots>
}
