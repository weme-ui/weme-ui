import { createVariants } from '~/utils/styles'

export const useDefaultLayoutStyle = createVariants({
  slots: {
    base: 'relative',
  },
  variants: {
    fillContainer: {
      true: 'h-screen',
    },
  },
  defaultVariants: {
    fillContainer: true,
  },
})
