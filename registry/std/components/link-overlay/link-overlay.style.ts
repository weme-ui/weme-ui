import { createVariants } from '~/utils/styles'

export const useLinkOverlayStyle = createVariants({
  slots: {
    base: 'static before:(abs block inset-0 content-[""] cursor-inherit)',
  },
})

export type LinkOverlayStyleSlots = typeof useLinkOverlayStyle['slots']
