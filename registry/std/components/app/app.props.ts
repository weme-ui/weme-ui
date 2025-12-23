import type { ConfigProviderProps, TooltipProviderProps } from 'reka-ui'
import type { ToastProviderProps } from '../toast/toast-provider.props'
import type { Locale, LocaleMessages } from '~/types/locale'

export interface AppProps<T extends LocaleMessages = LocaleMessages> extends Omit<ConfigProviderProps, 'locale' | 'useId'> {
  tooltip?: TooltipProviderProps
  toast?: ToastProviderProps | null
  locale?: Locale<T>
  portal?: boolean | string | HTMLElement
}
