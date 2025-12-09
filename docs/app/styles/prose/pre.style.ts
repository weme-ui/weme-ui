export const usePreStyle = createVariants({
  slots: {
    base: 'group relative overflow-hidden',
    header: 'flex-(~ y-center) gap-x-2 c-highlighted rounded-t-lg text-sm px-4 py-3 bg-neutral-1 b-(~ default) b-b-0',
    headerIcon: 'text-4 c-primary shrink-0',
    copy: 'abs top-2 right-2 z-1 op-0 group-hover:op-100',
    code: 'bg-neutral-3/50 dark:bg-neutral-1 selection:bg-primary-8/35 rounded-lg b-(~ default) font-mono text-sm/6 px-4 py-3 whitespace-pre-wrap break-words overflow-x-auto focus:outline-none',
  },

  variants: {
    standalone: {
      true: {
        code: 'rounded-t-0',
      },
    },
  },
})
