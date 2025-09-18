import type { PopoverProps } from '../popover/popover.props'
import type { PopConfirmStyleSlots } from './pop-confirm.style'

export interface PopConfirmProps extends Omit<PopoverProps, 'ui' | 'closable'> {
  content: string
  icon?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  okButtonText?: string
  cancelButtonText?: string
  loading?: boolean
  disabled?: boolean
  inverse?: boolean
  ui?: Partial<PopConfirmStyleSlots>
}

// TODO
export interface PopConfirmEmits {
  (e: 'ok'): void
  (e: 'beforeOk'): boolean | Promise<boolean>
  (e: 'cancel'): void
  (e: 'beforeCancel'): boolean | Promise<boolean>
}
