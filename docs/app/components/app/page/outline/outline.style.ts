import { createVariants } from '~/utils/styles'

export const usePageOutlineStyle = createVariants({
  slots: {
    base: 'flex-(~ col) gap-y-2 p-6 w-full',
    icon: 'size-4 c-toned',
    title: 'flex-(~ y-center) gap-x-2 text-(sm highlighted) font-semibold',
    tree: [
      'list-none leading-loose ml-2 pl-4 b-(l default) text-sm',
      '[&_li>ul]:(pl-4 leading-loose) hover:[&_a]:(text-accent-10 font-semibold)',
    ],
  },
})
