import type { ToastRootEmits, ToastRootProps } from 'reka-ui'
import type { ButtonProps } from '../button/button.props'
import type { ToastStyleProps, ToastStyleSlots } from './toast.style'

export interface ToastProps extends ToastRootProps {
  icon?: string
  title?: string
  description?: string
  actions?: ButtonProps[]
  color?: ToastStyleProps['color']
  radius?: ToastStyleProps['radius']
  orientation?: ToastStyleProps['orientation']
  inverse?: boolean
  closable?: boolean
  class?: any
  ui?: Partial<ToastStyleSlots>
}

export interface ToastEmits extends ToastRootEmits {}
