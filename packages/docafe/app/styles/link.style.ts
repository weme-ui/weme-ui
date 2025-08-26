import { createVariants } from '~/utils/styles'

export const useLinkStyle = createVariants({
  slots: {
    base: 'group relative scroll-m-20 not-first:mt-6',
    link: '',
    anchor: 'after:(abs block content-["#"] -left-8 text-neutral-8 font-normal opacity-0 group-hover:opacity-100)',
  },
})
