import type { PrimitiveProps } from 'reka-ui'
import type { OverflowListStyleProps, OverflowListStyleSlots } from './overflow-list.style'

export interface OverflowListProps extends PrimitiveProps {
  max?: number
  gap?: OverflowListStyleProps['gap']
  class?: any
  ui?: Partial<OverflowListStyleSlots>
}
