import type { ToastProviderProps as _ToastProviderProps } from 'reka-ui'
import type { ToastProviderStyleProps, ToastProviderStyleSlots } from './toast-provider.style'

export interface ToastProviderProps extends _ToastProviderProps {
  side?: ToastProviderStyleProps['side']
  swipeDirection?: ToastProviderStyleProps['swipeDirection']
  class?: any
  ui?: Partial<ToastProviderStyleSlots>
}
