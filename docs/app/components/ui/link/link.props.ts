import type { LinkStyleProps } from './link.style'

export interface LinkProps {
  text?: string
  color?: LinkStyleProps['color']
  disabled?: boolean
  class?: any
}
