import type { PrimitiveProps } from 'reka-ui'
import type { TypographyStyleProps } from './typography.style'

export interface TypographyProps extends PrimitiveProps {
  value?: string
  as?: TypographyStyleProps['as']
  color?: TypographyStyleProps['color']
  class?: any
}
