import { createVariants } from '~/utils/styles'

export const useLinkOverlayStyle = createVariants({
  slots: {
    base: 'static before:(block cursor-inherit content-[""] inset-0 abs)',
  },
})
