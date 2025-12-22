import type { ModalProps } from './modal.props'
import { computed } from 'vue'

export function useModalMotions({ placement, variant }: ModalProps) {
  return computed(() => {
    const overlay = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }

    const transition = { duration: 0.2, ease: 'easeInOut' }

    switch (placement) {
      case 'top':
        return {
          overlay,
          content: {
            initial: { opacity: 0, top: '-10%' },
            animate: { opacity: 1, top: 0 },
            exit: { opacity: 0, top: '-10%' },
            transition,
          },
        }

      case 'bottom':
        return {
          overlay,
          content: {
            initial: { opacity: 0, bottom: '-10%' },
            animate: { opacity: 1, bottom: 0 },
            exit: { opacity: 0, bottom: '-10%' },
            transition,
          },
        }

      case 'right':
        return {
          overlay,
          content: {
            initial: { opacity: 0, right: '-100px' },
            animate: { opacity: 1, right: variant === 'normal' ? '8px' : 0 },
            exit: { opacity: 0, right: '-100px' },
            transition,
          },
        }

      case 'left':
        return {
          overlay,
          content: {
            initial: { opacity: 0, left: '-100px' },
            animate: { opacity: 1, left: variant === 'normal' ? '8px' : 0 },
            exit: { opacity: 0, left: '-100px' },
            transition,
          },
        }

      default:
        return {
          overlay,
          content: {
            initial: { opacity: 0, top: '51%', scale: 0.9 },
            animate: { opacity: 1, top: '50%', scale: 1 },
            exit: { opacity: 0, top: '51%', scale: 0.9 },
            transition,
          },
        }
    }
  })
}
