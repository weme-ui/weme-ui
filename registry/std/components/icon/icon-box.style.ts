import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconBoxStyle = createVariants({
  slots: {
    base: '',
  },

  variants: {},

  compoundVariants: [],

  defaultVariants: {},
})

export type IconBoxStyleSlots = typeof useIconBoxStyle['slots']
export type IconBoxStyleProps = VariantProps<typeof useIconBoxStyle>
