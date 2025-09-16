import { createVariants } from '~/utils/styles'

export const usePageStyle = createVariants({
  slots: {
    base: 'relative',
    sidebar: 'flex-(~ col) gap-y-4 p-6 w-75 b-(r default) bg-card',
    wrapper: '',
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
