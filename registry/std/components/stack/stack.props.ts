import type { PrimitiveProps } from 'reka-ui'
import type { StackStyleProps, StackStyleSlots } from './stack.style'

export interface StackProps extends PrimitiveProps {
  orientation?: StackStyleProps['orientation']
  class?: any
  ui?: Partial<StackStyleSlots>
}
