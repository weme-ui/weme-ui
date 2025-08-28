import { createVariants } from '~/utils/styles'

export const useHeaderStyle = createVariants({
  slots: {
    base: [
      'sticky top-0 z-9 transition-colors',
      'before:(abs size-full content-[""] rounded-xl bg-neutral-1/70 backdrop-blur-3xl -z-1)',
    ],
    container: 'flex-(~ y-center) gap-x-6 justify-end px-6 py-4',
    logo: 'flex-(~ y-center) gap-2 c-accent-9 select-none',
    logoText: 'text-lg font-bold tracking-tighter',
    socials: 'flex-(~ y-center) gap-4 select-none',
    socialLink: 'text-neutral-12 hover:text-neutral-11',
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
