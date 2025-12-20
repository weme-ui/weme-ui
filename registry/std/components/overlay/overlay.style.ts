import { createVariants } from '~/utils/styles'

export const useOverlayStyle = createVariants({
  slots: {
    base: 'abs inset-0 z-overlay bg-overlay/80 pointer-events-auto',
  },
})

export type OverlayStyleSlots = typeof useOverlayStyle['slots']
