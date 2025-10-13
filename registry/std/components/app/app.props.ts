import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'
import type { ToastProviderProps } from '../toast/toast-provider.props'

export interface AppProps extends ConfigProviderProps {
  tooltip?: TooltipProviderProps
  toaster?: ToastProviderProps | null
}
