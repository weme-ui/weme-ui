import type { ModalProps } from './modal.props'
import { computed } from 'vue'

export function useModalMotions(variant: ModalProps['variant']) {
  return computed(() => ({
    overlay: {
      initial: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },

    content: {
      center: {
        initial: { opacity: 0, top: '45%' },
        animate: { opacity: 1, top: '50%' },
        exit: { opacity: 0, top: '45%' },
      },
      top: {
        initial: { opacity: 0, top: '-200px' },
        animate: { opacity: 1, top: '0' },
        exit: { opacity: 0, top: '-200px' },
      },
      right: {
        initial: { opacity: 0, right: '-200px' },
        animate: { opacity: 1, right: variant === 'normal' ? '8px' : '0' },
        exit: { opacity: 0, right: '-200px' },
      },
      bottom: {
        initial: { opacity: 0, bottom: '-200px' },
        animate: { opacity: 1, bottom: '0' },
        exit: { opacity: 0, bottom: '-200px' },
      },
      left: {
        initial: { opacity: 0, left: '-200px' },
        animate: { opacity: 1, left: variant === 'normal' ? '8px' : '0' },
        exit: { opacity: 0, left: '-200px' },
      },
    },
  }))
}
