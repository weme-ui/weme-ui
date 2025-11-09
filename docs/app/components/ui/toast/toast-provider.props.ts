import type { ToastProviderProps as RekaToastProviderProps } from 'reka-ui'
import type { ToastProviderStyleProps, ToastProviderStyleSlots } from './toast-provider.style'

export interface ToastProviderProps extends RekaToastProviderProps {
  side?: ToastProviderStyleProps['side']
  swipeDirection?: ToastProviderStyleProps['swipeDirection']
  class?: any
  ui?: Partial<ToastProviderStyleSlots>
}

export interface ToastProviderEmits {}
