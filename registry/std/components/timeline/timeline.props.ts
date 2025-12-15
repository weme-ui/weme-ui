import type { PrimitiveProps } from 'reka-ui'
import type { AvatarProps } from '../avatar/avatar.props'
import type { TimelineStyleProps, TimelineStyleSlots } from './timeline.style'

export interface TimelineItem {
  title: string
  description?: string
  icon?: string
  avatar?: string | Partial<Omit<AvatarProps, 'class'>>
  color?: TimelineStyleProps['color']
  variant?: TimelineStyleProps['variant']
  class?: any
  ui?: Partial<Pick<TimelineStyleSlots, 'connector' | 'indicator' | 'separator' | 'avatar' | 'icon' | 'content' | 'title' | 'description'>>
  [key: string]: any
}

export interface TimelineProps extends PrimitiveProps {
  items?: TimelineItem[]
  color?: TimelineStyleProps['color']
  variant?: TimelineStyleProps['variant']
  size?: TimelineStyleProps['size']
  pendingIcon?: string
  pendingTitle?: string
  pendingDescription?: string
  reversed?: boolean
  pending?: boolean
  class?: any
  ui?: Partial<TimelineStyleSlots>
}
