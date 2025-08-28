import { createVariants } from '~/utils/styles'

export const useNavigationStyle = createVariants({
  slots: {
    base: 'p-6 w-75',
  },
  variants: {
    bordered: {
      true: {
        base: 'b-(r default)',
      },
    },
  },
  defaultVariants: {
    bordered: true,
  },
})
