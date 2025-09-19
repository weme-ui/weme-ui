import type { DialogContentEmits, DialogContentProps, DialogOverlayProps, DialogPortalProps, DialogRootEmits, DialogRootProps, DialogTriggerProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { ModalStyleProps, ModalStyleSlots } from './modal.style'

export interface ModalProps extends DialogRootProps {
  icon?: string
  title?: string
  description?: string
  variant?: ModalStyleProps['variant']
  side?: ModalStyleProps['side']
  radius?: ModalStyleProps['radius']
  triggerProps?: DialogTriggerProps
  portalProps?: DialogPortalProps
  contentProps?: Omit<DialogContentProps, 'asChild'> & Partial<EmitsToProps<DialogContentEmits>>
  overlayProps?: DialogOverlayProps
  translucent?: boolean
  bordered?: boolean
  closable?: boolean
  overlay?: boolean
  asChild?: boolean
  class?: any
  ui?: Partial<ModalStyleSlots>
}

export interface ModalEmits extends DialogRootEmits {}
