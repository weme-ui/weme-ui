import { createVariants } from '~/utils/styles'

export const usePageNavigationTreeStyle = createVariants({
  slots: {
    base: 'flex-(~ col)',
    trigger: 'group w-full text-left',
    group: '',
    groupContent: [
      'flex-(~ col) gap-y-1 ml-4.5 pl-2 py-1 b-(l default) overflow-hidden will-change-height',
      'state-open:animate-collapse-open state-closed:animate-collapse-close',
    ],
    item: [
      'flex-(~ y-center) gap-x-3 px-3 py-1.5 rounded-md text-sm transition-colors',
      'hover:(text-highlighted bg-accent-3) group-state-open:text-highlighted',
      '[&>span]:flex-1',
    ],
    expandIcon: 'size-4 transition group-state-open:rotate-90',
  },

  variants: {
    active: {
      true: {
        item: 'text-highlighted bg-accent-3 font-medium',
      },
    },
  },
})
