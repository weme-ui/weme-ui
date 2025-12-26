import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useOverflowStyle = createVariants({
  slots: {
    root: 'flex-(inline y-center)',
    item: '',
    overflow: 'text-sm font-medium',
  },

  variants: {
    gap: {
      xs: { root: 'gap-1' },
      sm: { root: 'gap-2' },
      md: { root: 'gap-3' },
      lg: { root: 'gap-5' },
    },
  },

  defaultVariants: {
    gap: 'sm',
  },
})

export type OverflowStyleSlots = typeof useOverflowStyle['slots']
export type OverflowStyleProps = VariantProps<typeof useOverflowStyle>
