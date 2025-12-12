import type { PrimitiveProps } from 'reka-ui'
import type { FloatStyleProps, FloatStyleSlots } from './float.style'

export interface FloatProps extends PrimitiveProps {
  placement?: FloatStyleProps['placement']
  offset?: string
  offsetX?: string
  offsetY?: string
  class?: any
  ui?: Partial<FloatStyleSlots>
}
