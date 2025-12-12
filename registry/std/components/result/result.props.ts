import type { PrimitiveProps } from 'reka-ui'
import type { ResultStyleProps, ResultStyleSlots } from './result.style'

export interface ResultProps extends PrimitiveProps {
  icon?: string
  title?: string
  description?: string
  size?: ResultStyleProps['size']
  class?: any
  ui?: Partial<ResultStyleSlots>
}
