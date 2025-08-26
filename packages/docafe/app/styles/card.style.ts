import { createVariants } from '~/utils/styles'

export const useCardStyle = createVariants({
  slots: {
    base: 'relative flex-(~ col) gap-y-4 px-6 py-4 bg-neutral-1 rounded-lg ring-(~ default)',
    icon: 'c-accent-9 size-8 text-8 leading-none',
    title: 'text-(lg highlighted) font-medium',
    description: 'text-sm',
    external: 'abs right-6 top-4 size-4',
  },
  variants: {
    clickable: {
      true: {
        base: 'hover:(bg-accent-3 ring-2 ring-accent-9)',
      },
    },
  },
})
