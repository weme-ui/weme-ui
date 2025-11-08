import type { SeparatorProps as _SeparatorProps } from 'reka-ui'
import type { SeparatorStyleProps, SeparatorStyleSlots } from './separator.style'

export interface SeparatorProps extends _SeparatorProps {
  text?: string
  variant?: SeparatorStyleProps['variant']
  orientation?: SeparatorStyleProps['orientation']
  class?: any
  ui?: Partial<SeparatorStyleSlots>
}
