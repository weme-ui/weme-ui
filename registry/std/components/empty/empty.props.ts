import type { PrimitiveProps } from 'reka-ui'
import type { EmptyStyleProps, EmptyStyleSlots } from './empty.style'

export interface EmptyProps extends PrimitiveProps {
  icon?: string
  src?: string
  description?: string
  type?: EmptyStyleProps['type']
  size?: EmptyStyleProps['size']
  simple?: boolean
  class?: any
  ui?: Partial<EmptyStyleSlots>
}
