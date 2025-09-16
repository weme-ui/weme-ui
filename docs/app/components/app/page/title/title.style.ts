import { createVariants } from '~/utils/styles'

export const usePageTitleStyle = createVariants({
  slots: {
    base: 'flex-(~ col) gap-y-4 pt-4',
    wrapper: 'flex-(~ y-center) gap-x-2',
    title: 'text-(4xl highlighted) font-bold',
    description: 'leading-none',
    links: 'flex-(~ y-center) gap-x-2 list-none',
  },
})
