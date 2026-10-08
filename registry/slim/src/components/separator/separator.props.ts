import type { SeparatorProps as SeparatorPrimitiveProps } from 'reka-ui'
import type { SeparatorStyleProps, SeparatorStyleSlots } from './separator.style'

export interface SeparatorProps extends SeparatorPrimitiveProps {
  color?: SeparatorStyleProps['color']
  variant?: SeparatorStyleProps['variant']
  labelPosition?: SeparatorStyleProps['labelPosition']
  orientation?: SeparatorStyleProps['orientation']
  label?: string
  class?: any
  ui?: Partial<SeparatorStyleSlots>
}
