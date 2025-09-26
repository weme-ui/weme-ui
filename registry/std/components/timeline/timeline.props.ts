import type { PrimitiveProps } from 'reka-ui'
import type { IconBoxProps } from '../icon/icon-box.props'
import type { SeparatorProps } from '../separator/separator.props'
import type { TimelineStyleProps, TimelineStyleSlots } from './timeline.style'

export interface TimelineItem {
  date?: string
  icon?: string
  title?: string
  description?: string
  slot?: string
  color?: TimelineStyleProps['color']
  iconProps?: Partial<Omit<IconBoxProps, 'name'>>
  separatorProps?: Partial<Omit<SeparatorProps, 'orientation'>>
  class?: any
  ui?: Partial<Pick<
    TimelineStyleSlots,
    | 'item'
    | 'wrapper'
    | 'indicator'
    | 'icon'
    | 'separator'
    | 'content'
    | 'date'
    | 'title'
    | 'description'
  >>
  [key: string]: any
}

export interface TimelineProps extends PrimitiveProps {
  items?: TimelineItem[]
  color?: TimelineStyleProps['color']
  orientation?: TimelineStyleProps['orientation']
  reverse?: TimelineStyleProps['reverse']
  size?: TimelineStyleProps['size']
  iconProps?: Partial<Omit<IconBoxProps, 'name'>>
  separatorProps?: Partial<Omit<SeparatorProps, 'orientation'>>
  class?: any
  ui?: Partial<TimelineStyleSlots>
}
