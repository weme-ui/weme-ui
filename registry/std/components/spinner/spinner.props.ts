import type { PrimitiveProps } from 'reka-ui'
import type { SpinnerStyleProps, SpinnerStyleSlots } from './spinner.style'

export interface SpinnerProps extends PrimitiveProps {
  loading?: boolean
  icon?: string
  description?: string
  size?: SpinnerStyleProps['size']
  class?: any
  ui?: Partial<SpinnerStyleSlots>
}
