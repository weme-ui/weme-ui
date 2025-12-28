import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useDataListStyle = createVariants({
  slots: {
    root: 'grid',
    item: 'flex',
    label: '',
    value: 'text-highlighted',
  },

  variants: {
    variant: {
      normal: {
        label: 'text-toned',
      },
      bold: {
        label: 'font-medium text-highlighted',
      },
    },
    size: {
      xs: { root: 'text-xs gap-3', item: 'gap-1' },
      sm: { root: 'text-sm gap-3.5', item: 'gap-1' },
      md: { root: 'text-sm gap-4', item: 'gap-1' },
      lg: { root: 'text-base gap-6', item: 'gap-1.5' },
      xl: { root: 'text-lg gap-8', item: 'gap-2' },
    },
    orientation: {
      vertical: {
        item: 'flex-col',
        value: 'leading-none',
      },
      horizontal: {
        item: 'flex-row',
        label: 'min-w-30',
      },
    },
  },

  defaultVariants: {
    variant: 'normal',
    size: 'md',
    orientation: 'vertical',
  },
})

export type DataListStyleSlots = typeof useDataListStyle['slots']
export type DataListStyleProps = VariantProps<typeof useDataListStyle>
