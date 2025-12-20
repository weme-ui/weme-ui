import type { PrimitiveProps } from 'reka-ui'
import type { ButtonProps } from '../button/button.props'
import type { ActionSheetStyleProps, ActionSheetStyleSlots } from './action-sheet.style'

export interface ActionSheetProps extends PrimitiveProps {
  radius?: ActionSheetStyleProps['radius']
  actions?: ButtonProps[]
  defaultOpen?: boolean
  forceMount?: boolean
  closeOnEscape?: boolean
  disabled?: boolean
  portal?: string | HTMLElement
  defer?: boolean
  class?: any
  ui?: Partial<ActionSheetStyleSlots>
}

export interface ActionSheetEmits {
  (e: 'open', value: boolean): void
}
