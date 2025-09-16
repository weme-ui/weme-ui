import { createVariants } from '~/utils/styles'

export const useCardGroupStyle = createVariants({
  base: 'grid gap-4',
  variants: {
    columns: {
      'cols-1': 'grid-cols-1',
      'cols-2': 'grid-cols-2',
      'cols-3': 'grid-cols-3',
      'cols-4': 'grid-cols-4',
      'cols-5': 'grid-cols-5',
      'cols-6': 'grid-cols-6',
    },
  },
  defaultVariants: {
    columns: 'cols-1',
  },
})
