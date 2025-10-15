import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useDatePickerStyle = createVariants({
  slots: {
    base: '',
  },

  variants: {},

  compoundVariants: [],

  defaultVariants: {},
})

export type DatePickerStyleSlots = typeof useDatePickerStyle['slots']
export type DatePickerStyleProps = VariantProps<typeof useDatePickerStyle>
