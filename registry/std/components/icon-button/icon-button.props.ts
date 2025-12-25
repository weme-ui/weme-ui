import type { ButtonProps } from '../button/button.props'
import type { IconButtonStyleSlots } from './icon-button.style'

export interface IconButtonProps extends Omit<ButtonProps, 'icon' | 'label' | 'loadingText'> {
  icon: string
  class?: any
  ui?: Partial<IconButtonStyleSlots>
}
