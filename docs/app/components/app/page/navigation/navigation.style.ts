import { createVariants } from '~/utils/styles'

export const usePageNavigationStyle = createVariants({
  slots: {
    list: 'flex-(~ col)',
    item: 'group flex-(~ y-center) gap-x-3 hover:text-highlighted',
    icon: 'flex-(~ center) text-4 rounded-lg p-1.5 transition-colors ring-(~ default) group-hover:(bg-accent c-accent-1 ring-0)',
    label: 'flex-1 text-sm font-medium',
    separator: 'my-2 h-px b-(t default)',
  },
  variants: {
    active: {
      true: {
        item: 'text-highlighted',
        icon: 'bg-accent c-accent-1 ring-0',
      },
    },
  },
  defaultVariants: {
    active: false,
  },
})
