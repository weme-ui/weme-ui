import type { NuxtLinkProps } from 'nuxt/app'
import type { LinkStyleProps } from './link.style'

export interface LinkProps extends NuxtLinkProps {
  text?: string
  color?: LinkStyleProps['color']
  disabled?: boolean
  class?: any
}
