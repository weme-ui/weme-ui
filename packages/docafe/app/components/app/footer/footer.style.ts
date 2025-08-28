import { createVariants } from '~/utils/styles'

export const useFooterStyle = createVariants({
  slots: {
    base: 'flex justify-between text-sm px-6 py-4 bg-neutral-1',
    copyright: '',
    links: 'flex-(~ y-center) gap-4',
    linkItem: 'flex-(inline y-center) gap-x-2',
    link: 'hover:text-accent-9',
    linkExternalIcon: 'size-3.5 c-accent-8',
  },
  variants: {
    bordered: {
      true: {
        base: 'b-(t default)',
      },
    },
  },
  defaultVariants: {
    bordered: true,
  },
})
