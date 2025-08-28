import { createVariants } from '~/utils/styles'

export const usePageOutlineStyle = createVariants({
  slots: {
    base: 'flex-(~ col) gap-y-2 p-6',
    title: 'flex-(~ y-center) gap-x-2 text-(sm highlighted) font-semibold',
    titleIcon: 'size-4 c-toned',
    tree: [
      'list-none ml-2 py-2 pl-4 b-(l default) leading-loose text-sm',
      '[&_li>ul]:pl-4 hover:[&_a]:(text-accent-10 font-semibold)',
    ],
  },
})
