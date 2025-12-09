import type { PrimitiveProps } from 'reka-ui'
import type { CodeStyleProps, CodeStyleSlots } from './code.style'

export interface CodeProps extends PrimitiveProps {
  color?: CodeStyleProps['color']
  variant?: CodeStyleProps['variant']
  size?: CodeStyleProps['size']
  radius?: CodeStyleProps['radius']
  class?: any
  ui?: Partial<CodeStyleSlots>
}
