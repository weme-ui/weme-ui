import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useDataListStyle = createVariants({
  slots: {
    base: 'grid',
    item: 'flex',
    label: 'min-w-20 leading-none',
    value: '',
  },

  variants: {
    orientation: {
      horizontal: {},
      vertical: {
        item: 'flex-col',
        label: 'leading-none',
      },
    },
    size: {
      xs: { base: 'text-xs gap-2', item: 'gap-0.5' },
      sm: { base: 'text-sm gap-3', item: 'gap-1' },
      md: { base: 'text-base gap-4', item: 'gap-1.5' },
      lg: { base: 'text-base gap-5', item: 'gap-2' },
      xl: { base: 'text-base gap-6', item: 'gap-2.5' },
    },
    highlight: {
      false: {
        label: 'text-toned',
        value: 'text-default',
      },
      true: {
        label: 'text-toned',
        value: 'text-highlighted',
      },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
    size: 'sm',
    highlight: false,
  },
})

export type DataListStyleSlots = typeof useDataListStyle['slots']
export type DataListStyleProps = VariantProps<typeof useDataListStyle>
