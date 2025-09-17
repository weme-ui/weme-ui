import type { PrimitiveProps } from 'reka-ui'
import type { ChipStyleProps, ChipStyleSlots } from './chip.style'

export interface ChipProps extends PrimitiveProps {
  value?: string | number
  maxValue?: number
  color?: ChipStyleProps['color']
  variant?: ChipStyleProps['variant']
  position?: ChipStyleProps['position']
  standalone?: boolean
  inset?: boolean
  visible?: boolean
  hideZero?: boolean
  class?: any
  ui?: Partial<ChipStyleSlots>
}
