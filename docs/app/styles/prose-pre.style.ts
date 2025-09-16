import { createVariants } from '~/utils/styles'

export const useProsePreStyle = createVariants({
  slots: {
    base: 'group relative overflow-hidden',
    header: 'flex-(~ y-center) bg-neutral-1 gap-x-2 px-5 py-3 text-sm rounded-t-inherit b-(x t default)',
    title: 'flex-1 h-6 leading-6 text-highlighted',
    wrapper: 'relative',
    code: 'px-6 py-4 bg-neutral-12 text-3.5 leading-[1.7] selection:bg-accent-8/20',
    collapse: 'abs flex-(~ center) h-12 bottom-0 left-0 w-full bg-gradient-to-t from-neutral-3 to-transparent',
    collapseButton: 'flex-(~ y-center) gap-1 rounded-full px-3 py-1 bg-neutral-5 text-(xs neutral-12) hover:bg-neutral-7',
  },
  variants: {
    inset: {
      true: {
        base: 'rounded-inherit',
        wrapper: 'overflow-hidden',
      },
      false: {
        base: 'rounded-lg',
      },
    },
    expanded: {
      true: {
        wrapper: 'pb-4',
      },
    },
  },
})
