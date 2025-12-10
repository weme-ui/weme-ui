import type { PrimitiveProps } from 'reka-ui'
import type { OverflowStyleProps, OverflowStyleSlots } from './overflow.style'

export interface OverflowProps extends PrimitiveProps {
  max?: number
  gap?: OverflowStyleProps['gap']
  class?: any
  ui?: Partial<OverflowStyleSlots>
}
