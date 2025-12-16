import type { ToastRootEmits, ToastRootProps } from 'reka-ui'
import type { ButtonProps } from '../button/button.props'
import type { ToastStyleProps, ToastStyleSlots } from './toast.style'

export interface ToastProps extends ToastRootProps {
  icon?: string
  title?: string
  description?: string
  actions?: ButtonProps[]
  color?: ToastStyleProps['color']
  variant?: ToastStyleProps['variant']
  orientation?: ToastStyleProps['orientation']
  radius?: ToastStyleProps['radius']
  closable?: boolean
  loading?: boolean
  class?: any
  ui?: Partial<ToastStyleSlots>
}

export interface ToastEmits extends ToastRootEmits {}
