import type { IconifyIconProps } from '@iconify/vue'
import type { RouterLinkProps } from 'vue-router'
import type { LinkStyleProps, LinkStyleSlots } from './link.style'

export interface LinkProps extends Omit<RouterLinkProps, 'custom'> {
  label?: string
  prefixIcon?: IconifyIconProps['icon']
  suffixIcon?: IconifyIconProps['icon']
  externalIcon?: IconifyIconProps['icon']
  color?: LinkStyleProps['color']
  unstyled?: LinkStyleProps['unstyled']
  hideExternalIcon?: boolean
  class?: any
  ui?: Partial<LinkStyleSlots>
}
