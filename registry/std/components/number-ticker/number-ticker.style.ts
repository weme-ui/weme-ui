import { createVariants } from '~/utils/styles'

export const useNumberTickerStyle = createVariants({
  slots: {
    base: 'inline-block tabular-nums tracking-wider',
  },
})

export type NumberTickerStyleSlots = typeof useNumberTickerStyle['slots']
