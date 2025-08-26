import type { PrimitiveProps } from 'reka-ui'
import type { HeadingStyleProps } from './heading.style'

export interface HeadingProps extends PrimitiveProps {
  as?: HeadingStyleProps['size']
  color?: HeadingStyleProps['color']
  weight?: HeadingStyleProps['weight']
  class?: any
}
