import type { PrimitiveProps } from 'reka-ui'
import type { EmptyStateStyleProps, EmptyStateStyleSlots } from './empty-state.style'

export interface EmptyStateProps extends PrimitiveProps {
  icon?: string
  title?: string
  description?: string
  size?: EmptyStateStyleProps['size']
  class?: any
  ui?: Partial<EmptyStateStyleSlots>
}
