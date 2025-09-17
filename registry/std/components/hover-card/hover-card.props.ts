import type { HoverCardPortalProps, HoverCardRootEmits, HoverCardRootProps, HoverCardContentProps as RekaHoverCardContentProps } from 'reka-ui'
import type { HoverCardStyleProps, HoverCardStyleSlots } from './hover-card.style'

export type HoverCardContentProps = Omit<RekaHoverCardContentProps, 'side' | 'asChild'>

export interface HoverCardProps extends HoverCardRootProps {
  side?: HoverCardStyleProps['side']
  radius?: HoverCardStyleProps['radius']
  translucent?: boolean
  portal?: HoverCardPortalProps
  content?: HoverCardContentProps
  showArrow?: boolean
  asChild?: boolean
  class?: any
  ui?: Partial<HoverCardStyleSlots>
}

export interface HoverCardEmits extends HoverCardRootEmits {}
