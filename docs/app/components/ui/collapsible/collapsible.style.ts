import { createVariants } from '~/utils/styles'

export const useCollapsibleStyle = createVariants({
  slots: {
    base: '',
    trigger: '',
    content: 'overflow-hidden will-change-height state-open:animate-collapse-open state-closed:animate-collapse-close',
  },
})

export type CollapsibleStyleSlots = typeof useCollapsibleStyle['slots']
