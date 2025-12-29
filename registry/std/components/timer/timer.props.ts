import type { PrimitiveProps } from 'reka-ui'
import type { TimerStyleSlots } from './timer.style'

export interface TimerTickDetails {
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
}

export interface TimerProps extends PrimitiveProps {
  active?: boolean
  startTime?: number
  endTime?: number
  precision?: number
  autoStart?: boolean
  countdown?: boolean
  separator?: string
  class?: any
  ui?: Partial<TimerStyleSlots>
}

export interface TimerEmits {
  (e: 'tick', value: number): void
  (e: 'complete'): void
}
