import type { DialogContentEmits, DialogContentProps, DialogOverlayProps, DialogPortalProps, DialogRootEmits, DialogRootProps } from 'reka-ui'
import type { EmitsToProps } from 'vue'
import type { ModalStyleProps, ModalStyleSlots } from './modal.style'

export interface ModalProps extends DialogRootProps {
  icon?: string
  title?: string
  description?: string
  loadingIcon?: string
  variant?: ModalStyleProps['variant']
  placement?: ModalStyleProps['placement']
  size?: ModalStyleProps['size']
  radius?: ModalStyleProps['radius']
  translucent?: ModalStyleProps['translucent']
  portal?: string | DialogPortalProps
  overlay?: boolean | Pick<DialogOverlayProps, 'forceMount'>
  content?: Omit<DialogContentProps, 'as' | 'asChild'> & Partial<EmitsToProps<DialogContentEmits>>
  closable?: boolean
  loading?: boolean
  class?: any
  ui?: Partial<ModalStyleSlots>
}

export interface ModalEmits extends DialogRootEmits {}
