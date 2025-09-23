import type { PrimitiveProps } from 'reka-ui'
import type { SpinnerStyleSlots } from './spinner.style'

export interface SpinnerProps extends PrimitiveProps {
  icon?: string
  description?: string
  animate?: boolean
  loading?: boolean
  class?: any
  ui?: Partial<SpinnerStyleSlots>
}

export interface SpinnerEmits {}
