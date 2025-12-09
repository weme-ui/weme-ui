import type { PrimitiveProps } from 'reka-ui'
import type { TextStyleSlots } from './text.style'

export interface TextProps extends PrimitiveProps {
  class?: any
  ui?: Partial<TextStyleSlots>
}
