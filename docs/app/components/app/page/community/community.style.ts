import { createVariants } from '~/utils/styles'

export const usePageCommunityStyle = createVariants({
  slots: {
    base: 'flex-(~ col) gap-y-8 p-6',
  },
})
