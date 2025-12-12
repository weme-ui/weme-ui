import type { PrimitiveProps } from 'reka-ui'
import type { StatusStyleProps, StatusStyleSlots } from './status.style'

export interface StatusProps extends PrimitiveProps {
  label?: string
  color?: StatusStyleProps['color']
  size?: StatusStyleProps['size']
  animate?: StatusStyleProps['animate']
  class?: any
  ui?: Partial<StatusStyleSlots>
}
