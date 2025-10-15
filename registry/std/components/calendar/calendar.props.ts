import type { CalendarRootEmits, CalendarRootProps } from 'reka-ui'
import type { CalendarStyleProps, CalendarStyleSlots } from './calendar.style'

export interface CalendarProps extends CalendarRootProps {
  color?: CalendarStyleProps['color']
  size?: CalendarStyleProps['size']
  radius?: CalendarStyleProps['radius']
  class?: any
  ui?: Partial<CalendarStyleSlots>
}

export interface CalendarEmits extends CalendarRootEmits {}
