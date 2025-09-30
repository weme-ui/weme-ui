import { createVariants } from '~/utils/styles'

export const useInputPasswordStyle = createVariants({
  slots: {
    base: '',
    invisibleButton: [
      'after:(abs abs-center block content-[""] rounded-full transition-opacity bg-current op-0)',
      'relative hover:text-default hover:after:op-20 active:after:op-30',
    ],
  },

  variants: {
    size: {
      xs: { invisibleButton: 'after:size-4' },
      sm: { invisibleButton: 'after:size-4.5' },
      md: { invisibleButton: 'after:size-5' },
      lg: { invisibleButton: 'after:size-6' },
      xl: { invisibleButton: 'after:size-7.5' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type InputPasswordStyleSlots = typeof useInputPasswordStyle['slots']
