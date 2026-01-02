import type { Options } from 'compute-scroll-into-view'
import type { AnchorStyleSlots } from './anchor.style'

export interface AnchorLink {
  label: string
  href: string
}

export type AnchorBoundaryPosition = Options['block']

export interface AnchorProps {
  links?: AnchorLink[]
  container?: string | HTMLElement | Window
  boundary?: AnchorBoundaryPosition
  smooth?: boolean
  class?: any
  ui?: Partial<AnchorStyleSlots>
}

export interface AnchorEmits {
  (e: 'change', hash: string): void
}
