import type { PrimitiveProps } from 'reka-ui'
import type { ButtonProps } from '../button/button.props'
import type { BannerStyleProps, BannerStyleSlots } from './banner.style'

export interface BannerProps extends PrimitiveProps {
  id?: string
  icon?: string
  title: string
  href?: string
  target?: string
  rel?: string
  closeIcon?: string
  actions?: ButtonProps[]
  color?: BannerStyleProps['color']
  variant?: BannerStyleProps['variant']
  closable?: boolean
  class?: any
  ui?: Partial<BannerStyleSlots>
}

export interface BannerEmits {
  (e: 'close'): void
}
