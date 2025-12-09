import type { PrimitiveProps } from 'reka-ui'
import type { EmStyleSlots } from './em.style'

export interface EmProps extends PrimitiveProps {
  class?: any
  ui?: Partial<EmStyleSlots>
}
