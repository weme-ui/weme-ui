import { createVariants } from '~/utils/styles'

export const usePageBreadcrumbStyle = createVariants({
  slots: {
    base: 'flex-(~ y-center) gap-x-4 text-sm list-none',
    link: 'transition-colors hover:text-accent-10',
    separator: 'text-3.5 text-accent-8',
  },
  variants: {
    highlight: {
      true: {
        link: 'text-accent-9 font-semibold',
      },
    },
  },
})
