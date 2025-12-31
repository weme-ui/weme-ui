import type { TransitionPresets } from '@vueuse/core'
import type { PrimitiveProps } from 'reka-ui'
import type { NumberTickerStyleSlots } from './number-ticker.style'

export interface NumberTickerProps extends PrimitiveProps {
  value?: number
  direction?: 'up' | 'down'
  duration?: number
  delay?: number
  decimal?: number
  transition?: keyof typeof TransitionPresets
  class?: any
  ui?: Partial<NumberTickerStyleSlots>
  transform?: (value: number) => string
}
