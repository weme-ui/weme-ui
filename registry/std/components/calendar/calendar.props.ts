import type { CalendarRootEmits, CalendarRootProps, DateRange, DateValue, RangeCalendarRootEmits, RangeCalendarRootProps } from 'reka-ui'
import type { ButtonProps } from '../button/button.props'
import type { IconButtonProps } from '../icon-button/icon-button.props'
import type { IconProps } from '../icon/icon.props'
import type { CalendarStyleProps, CalendarStyleSlots } from './calendar.style'

type CalendarDefaultValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? DateRange
  : M extends true
    ? DateValue[]
    : DateValue
type CalendarModelValue<R extends boolean = false, M extends boolean = false> = R extends true
  ? (DateRange | null)
  : M extends true
    ? (DateValue[] | undefined)
    : (DateValue | undefined)

type _CalendarRootProps = Omit<CalendarRootProps, 'asChild' | 'modelValue' | 'defaultValue'>
type _RangeCalendarRootProps = Omit<RangeCalendarRootProps, 'asChild' | 'modelValue' | 'defaultValue'>

export type CalendarView = 'month' | 'year' | 'decade'

export interface CalendarProps<R extends boolean = false, M extends boolean = false> extends _CalendarRootProps, _RangeCalendarRootProps {
  icon?: IconProps['name']
  defaultValue?: CalendarDefaultValue<R, M>
  modelValue?: CalendarModelValue<R, M>
  prevIcon?: IconButtonProps['icon']
  nextIcon?: IconButtonProps['icon']
  prevYearIcon?: IconButtonProps['icon']
  nextYearIcon?: IconButtonProps['icon']
  color?: CalendarStyleProps['color']
  size?: CalendarStyleProps['size']
  radius?: CalendarStyleProps['radius']
  yearRange?: DateValue[]
  range?: R & boolean
  multiple?: M & boolean
  monthControls?: boolean | Omit<IconButtonProps, 'icon' | 'size' | 'as' | 'asChild'>
  yearControls?: boolean | Omit<IconButtonProps, 'icon' | 'size' | 'as' | 'asChild'>
  pageControls?: boolean | Omit<IconButtonProps, 'icon' | 'size' | 'as' | 'asChild'>
  viewTrigger?: Omit<ButtonProps, 'size' | 'as' | 'asChild'>
  class?: any
  ui?: Partial<CalendarStyleSlots>
}

export interface CalendarEmits<R extends boolean, M extends boolean> extends Omit<CalendarRootEmits & RangeCalendarRootEmits, 'update:modelValue'> {
  'update:modelValue': [date: CalendarModelValue<R, M>]
  'change': [date: CalendarModelValue<R, M> | undefined]
}
