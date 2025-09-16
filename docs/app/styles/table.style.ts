import { createVariants } from '~/utils/styles'

export const useTableStyle = createVariants({
  slots: {
    base: 'w-full rounded-md overflow-hidden ring-(~ default)',
    header: 'bg-accent-3 font-medium b-(b default)',
    row: 'not-last:b-(b default)',
    cell: 'px-5 py-3 text-sm vertical-top space-x-1',
    highlight: 'text-(sm accent-9) bg-accent-3 inline-block b-(~ default) rounded-md font-mono font-medium px-1.5 py-0.5',
  },
  variants: {
    end: {
      true: { cell: 'text-right' },
      false: { cell: 'text-left' },
    },
  },
  defaultVariants: {
    end: false,
  },
})
