import type { PrimitiveProps } from 'reka-ui'
import type { HeadingStyleProps, HeadingStyleSlots } from './heading.style'

export interface HeadingProps extends PrimitiveProps {
  size?: HeadingStyleProps['size']
  class?: any
  ui?: Partial<HeadingStyleSlots>
}
