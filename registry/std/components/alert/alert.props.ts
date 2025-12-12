import type { PrimitiveProps } from 'reka-ui'
import type { AlertStyleProps, AlertStyleSlots } from './alert.style'

export interface AlertProps extends PrimitiveProps {
  status?: 'info' | 'success' | 'warning' | 'danger'
  icon?: string
  title?: string
  content?: string
  href?: string
  target?: string
  rel?: string
  color?: AlertStyleProps['color']
  variant?: AlertStyleProps['variant']
  radius?: AlertStyleProps['radius']
  closable?: boolean
  clickable?: boolean
  class?: any
  ui?: Partial<AlertStyleSlots>
}

export interface AlertEmits {
  (e: 'update:visible', value: boolean): void
}
