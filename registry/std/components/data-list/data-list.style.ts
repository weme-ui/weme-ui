import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useDataListStyle = createVariants({
  slots: {
    base: 'grid',
    item: 'flex',
    label: '',
    value: 'text-highlighted leading-none',
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
      xs: { base: 'text-xs gap-3', item: 'gap-1' },
      sm: { base: 'text-sm gap-3.5', item: 'gap-1' },
      md: { base: 'text-sm gap-4', item: 'gap-1' },
      lg: { base: 'text-base gap-6', item: 'gap-1.5' },
      xl: { base: 'text-lg gap-8', item: 'gap-2' },
    },
    orientation: {
      vertical: {
        item: 'flex-col',
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
