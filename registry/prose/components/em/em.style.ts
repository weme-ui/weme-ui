import { createVariants } from '~/utils/styles'

export const useEmStyle = createVariants({
  slots: {
    base: 'font-italic',
  },
})

export type EmStyleSlots = typeof useEmStyle['slots']
