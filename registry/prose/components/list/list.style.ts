import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useListStyle = createVariants({
  slots: {
    base: 'flex-(~ col)',
    item: '',
    indicator: 'flex-(~ center) mie-2 shrink-0',
  },

  variants: {
    variant: {
      none: { item: 'flex-inline' },
      marker: { base: 'list-revert' },
    },
    align: {
      start: { item: 'items-start' },
      center: { item: 'items-center' },
      end: { item: 'items-end' },
    },
  },

  defaultVariants: {
    variant: 'marker',
    align: 'start',
  },
})

export type ListStyleSlots = typeof useListStyle['slots']
export type ListStyleProps = VariantProps<typeof useListStyle>
