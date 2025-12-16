import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTableStyle = createVariants({
  slots: {
    base: '',
    caption: '',
    table: '',
    header: '',
    body: '',
    footer: '',
    head: '',
    row: '',
    cell: '',
    empty: '',
    loading: '',
  },

  variants: {
    variant: {
      outline: {},
      line: {},
    },
    size: {
      sm: {},
      md: {},
      lg: {},
    },
  },

  compoundVariants: [],

  defaultVariants: {},
})

export type TableStyleSlots = typeof useTableStyle['slots']
export type TableStyleProps = VariantProps<typeof useTableStyle>
