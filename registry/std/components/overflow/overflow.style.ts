import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useOverflowStyle = createVariants({
  slots: {
    base: 'flex-(~ y-center)',
    item: '',
    overflow: 'text-sm font-medium',
  },

  variants: {
    gap: {
      xs: { base: 'gap-1' },
      sm: { base: 'gap-2' },
      md: { base: 'gap-3' },
      lg: { base: 'gap-5' },
    },
  },

  defaultVariants: {
    gap: 'sm',
  },
})

export type OverflowStyleSlots = typeof useOverflowStyle['slots']
export type OverflowStyleProps = VariantProps<typeof useOverflowStyle>
