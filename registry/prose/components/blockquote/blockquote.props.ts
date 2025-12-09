import type { PrimitiveProps } from 'reka-ui'
import type { BlockquoteStyleProps, BlockquoteStyleSlots } from './blockquote.style'

export interface BlockquoteProps extends PrimitiveProps {
  color?: BlockquoteStyleProps['color']
  variant?: BlockquoteStyleProps['variant']
  align?: BlockquoteStyleProps['align']
  class?: any
  ui?: Partial<BlockquoteStyleSlots>
}
