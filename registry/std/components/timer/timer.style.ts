import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTimerStyle = createVariants({
  slots: {
    root: '',
    area: '',
    item: '',
    separator: '',
  },

  variants: {},

  compoundVariants: [],

  defaultVariants: {},
})

export type TimerStyleSlots = typeof useTimerStyle['slots']
export type TimerStyleProps = VariantProps<typeof useTimerStyle>
