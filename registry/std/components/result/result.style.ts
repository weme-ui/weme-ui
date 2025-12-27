import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useResultStyle = createVariants({
  slots: {
    root: 'flex-(~ col y-center)',
    indicator: '',
    title: 'c-highlighted font-semibold',
    description: 'c-toned',
  },

  variants: {
    size: {
      sm: { indicator: 'size-6 mb-1', title: 'text-sm', description: 'text-xs' },
      md: { indicator: 'size-8 mb-3', title: 'text-base', description: 'text-sm mt-1' },
      lg: { indicator: 'size-12 mb-3', title: 'text-lg', description: 'text-base mt-1.5' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type ResultStyleSlots = typeof useResultStyle['slots']
export type ResultStyleProps = VariantProps<typeof useResultStyle>
