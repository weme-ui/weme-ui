import { createVariants } from '~/utils/styles'

export const useHeaderLinksStyle = createVariants({
  slots: {
    base: 'flex-(~ y-center) gap-6 select-none',
    link: 'text-neutral-12 hover:text-highlighted',
  },
})
