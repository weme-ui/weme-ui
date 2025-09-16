import { createVariants } from '~/utils/styles'

export const useHeaderStyle = createVariants({
  slots: {
    base: [
      'sticky top-0 z-9 transition-colors',
      'before:(abs size-full content-[""] rounded-xl bg-neutral-1/70 backdrop-blur-3xl -z-1)',
    ],
    container: 'flex-(~ y-center) gap-x-6 justify-end px-6 py-4',
  },
  variants: {
    bordered: {
      true: {
        base: 'b-(b default)',
      },
    },
  },
  defaultVariants: {
    bordered: true,
  },
})
