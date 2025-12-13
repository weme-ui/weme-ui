import type { PrimitiveProps } from 'reka-ui'
import type { StatStyleProps, StatStyleSlots } from './stat.style'

export interface StatProps extends PrimitiveProps {
  label?: string
  value?: string
  unit?: string
  description?: string
  indicatorValue?: string
  trendUpIcon?: string
  trendDownIcon?: string
  trend?: StatStyleProps['trend']
  size?: StatStyleProps['size']
  class?: any
  ui?: Partial<StatStyleSlots>
}
