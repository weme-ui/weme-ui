import type { PrimitiveProps } from 'reka-ui'
import type { SpinnerStyleProps, SpinnerStyleSlots } from './spinner.style'

export interface SpinnerProps extends PrimitiveProps {
  icon?: string
  description?: string
  size?: SpinnerStyleProps['size']
  class?: any
  ui?: Partial<SpinnerStyleSlots>
}
