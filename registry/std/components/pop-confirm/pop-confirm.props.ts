import type { ButtonProps } from '../button/button.props'
import type { PopoverEmits, PopoverProps } from '../popover/popover.props'
import type { PopConfirmStyleSlots } from './pop-confirm.style'

export interface PopConfirmProps extends Omit<PopoverProps, 'mode' | 'class' | 'ui' | 'arrow'> {
  message: string
  icon?: string
  type?: 'info' | 'success' | 'warning' | 'danger'
  confirm?: ButtonProps
  cancel?: ButtonProps
  class?: any
  ui?: Partial<PopConfirmStyleSlots>
  onBeforeConfirm?: () => boolean | Promise<boolean>
  onBeforeCancel?: () => boolean | Promise<boolean>
}

export interface PopConfirmEmits extends PopoverEmits {
  confirm: []
  cancel: []
}
