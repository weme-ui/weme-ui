import { createVariants } from '~/utils/styles'

export const useFeaturesStyle = createVariants({
  slots: {
    base: 'flex-(~ col) gap-y-4 list-none',
    item: 'flex-(~ y-center) gap-x-4 text-highlighted',
    icon: 'flex-(~ center) rounded-full p-1.5 bg-accent-3 b-(~ default)',
    label: 'font-medium',
  },
})
