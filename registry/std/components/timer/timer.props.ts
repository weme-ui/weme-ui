import type { PrimitiveProps } from 'reka-ui'
import type { TimerStyleProps, TimerStyleSlots } from './timer.style'

export type TimerMode = 'countdown' | 'countup'

export interface TimerTick {
  days: string
  hours: string
  minutes: string
  seconds: string
  milliseconds: string
}

export interface TimerProps extends PrimitiveProps {
  color?: TimerStyleProps['color']
  variant?: TimerStyleProps['variant']
  size?: TimerStyleProps['size']
  radius?: TimerStyleProps['radius']
  mode?: TimerMode
  autoStart?: boolean
  startTime?: number
  endTime?: number
  precision?: 0 | 1 | 2 | 3
  class?: any
  ui?: Partial<TimerStyleSlots>
}

export interface TimerEmits {
  (e: 'tick', value: TimerTick): void
  (e: 'finish'): void
}
