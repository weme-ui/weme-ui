import { createVariants } from '~/utils/styles'

export const useCollapsibleStyle = createVariants({
  slots: {
    base: '',
    trigger: '',
    content: 'overflow-hidden will-change-height state-open:animate-collapse-open state-closed:animate-collapse-close',
  },

  variants: {
    disabled: {
      true: 'is-disabled',
    },
  },
})

export type CollapsibleStyleSlots = typeof useCollapsibleStyle['slots']
