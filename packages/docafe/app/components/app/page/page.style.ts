import { createVariants } from '~/utils/styles'

export const usePageStyle = createVariants({
  slots: {
    base: 'relative',
    wrapper: '',
    playground: '',
    content: 'flex-(~ col) gap-y-8 py-4',
  },
  variants: {
    custom: {
      true: {
        base: 'p-6',
      },
      false: {
        base: 'flex',
        wrapper: 'flex-(~ 1 col) gap-y-4 px-14 pt-6 pb-14',
      },
    },
  },
})
