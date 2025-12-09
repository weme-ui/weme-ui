import { createVariants } from '~/utils/styles'

export const useTextStyle = createVariants({
  slots: {
    base: '',
  },
})

export type TextStyleSlots = typeof useTextStyle['slots']
