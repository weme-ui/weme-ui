import type { PrimitiveProps } from 'reka-ui'
import type { MarqueeStyleSlots } from './marquee.style'

export interface MarqueeProps extends PrimitiveProps {
  repeat?: number
  loop?: number | 'infinite'
  speed?: number
  spacing?: string
  orientation?: 'horizontal' | 'vertical'
  pauseOnHover?: boolean
  reverse?: boolean
  edgeFade?: boolean
  class?: any
  ui?: Partial<MarqueeStyleSlots>
}
