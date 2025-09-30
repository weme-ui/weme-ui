import type { LabelProps as _LabelProps } from 'reka-ui'
import type { LabelStyleSlots } from './label.style'

export interface LabelProps extends _LabelProps {
  hint?: string
  class?: any
  ui?: Partial<LabelStyleSlots>
}
