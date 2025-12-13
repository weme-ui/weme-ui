import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useStackStyle = createVariants({
  slots: {
    base: 'flex gap-2',
    item: '',
    separator: '',
  },

  variants: {
    orientation: {
      horizontal: { base: 'flex-row', separator: 'h-auto' },
      vertical: { base: 'flex-col', separator: 'w-auto' },
    },
  },

  defaultVariants: {
    orientation: 'vertical',
  },
})

export type StackStyleSlots = typeof useStackStyle['slots']
export type StackStyleProps = VariantProps<typeof useStackStyle>
