import type { AlertStyleProps, AlertStyleSlots } from './alert.style'

export interface AlertProps {
  icon?: string
  title?: string
  content?: string
  href?: string
  target?: string
  rel?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  color?: AlertStyleProps['color']
  variant?: AlertStyleProps['variant']
  radius?: AlertStyleProps['radius']
  clickable?: boolean
  closable?: boolean
  class?: any
  ui?: Partial<AlertStyleSlots>
}

export interface AlertEmits {
  (e: 'close'): void
}
