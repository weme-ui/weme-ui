import type { CalendarStyleProps, CalendarStyleSlots } from '../calendar/calendar.style'

export interface DatePickerProps {
  color?: CalendarStyleProps['color']
  size?: CalendarStyleProps['size']
  radius?: CalendarStyleProps['radius']
  class?: any
  ui?: Partial<CalendarStyleSlots>
}

export interface DatePickerEmits {}
