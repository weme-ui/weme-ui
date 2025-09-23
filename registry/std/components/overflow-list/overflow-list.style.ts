import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useOverflowListStyle = createVariants({
  slots: {
    base: 'flex-(~ y-center)',
    item: 'relative',
  },

  variants: {
    gap: {
      none: '',
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-4',
    },
  },

  defaultVariants: {
    gap: 'sm',
  },
})

export type OverflowListStyleSlots = typeof useOverflowListStyle['slots']
export type OverflowListStyleProps = VariantProps<typeof useOverflowListStyle>
