import { createVariants } from '~/utils/styles'

export const usePreviewStyle = createVariants({
  slots: {
    base: 'flex-(~ col) p-1.5 b-(~ default) bg-accent-3 rounded-xl',
    wrapper: 'bg-neutral-1 rounded-lg shadow-sm',
    preview: 'flex-(~ center) gap-4 min-h-60 py-15 rounded-t-inherit',
    code: 'rounded-inherit',
  },
})
