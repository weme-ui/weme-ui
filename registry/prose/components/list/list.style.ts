import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useListStyle = createVariants({
  slots: {
    root: 'flex-(~ col)',
    item: '',
    indicator: 'flex-(~ center) mie-2 shrink-0',
  },

  variants: {
    color: {
      primary: { item: 'marker:text-primary', indicator: 'text-primary' },
      secondary: { item: 'marker:text-secondary', indicator: 'text-secondary' },
      neutral: { item: 'marker:text-neutral', indicator: 'text-neutral' },
      info: { item: 'marker:text-info', indicator: 'text-info' },
      success: { item: 'marker:text-success', indicator: 'text-success' },
      warning: { item: 'marker:text-warning', indicator: 'text-warning' },
      danger: { item: 'marker:text-danger', indicator: 'text-danger' },
    },
    variant: {
      none: { item: 'flex-inline' },
      marker: { root: 'list-revert' },
    },
  },

  defaultVariants: {
    variant: 'marker',
  },
})

export type ListStyleSlots = typeof useListStyle['slots']
export type ListStyleProps = VariantProps<typeof useListStyle>
