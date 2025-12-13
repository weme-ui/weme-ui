import type { ButtonProps } from '../button/button.props'

export interface ChipboardProps extends Omit<ButtonProps, 'ui'> {
  value: string
  copyIcon?: string
  copyText?: string
  copiedIcon?: string
  copiedText?: string
}

export interface ChipboardEmits {
  (e: 'copy'): void
}
