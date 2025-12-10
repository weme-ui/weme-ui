import type { SeparatorProps as _SeparatorProps } from 'reka-ui'
import type { SeparatorStyleProps, SeparatorStyleSlots } from './separator.style'

export interface SeparatorProps extends _SeparatorProps {
  label?: string
  labelPlacement?: 'start' | 'center' | 'end'
  variant?: SeparatorStyleProps['variant']
  orientation?: SeparatorStyleProps['orientation']
  size?: SeparatorStyleProps['size']
  class?: any
  ui?: Partial<SeparatorStyleSlots>
}
