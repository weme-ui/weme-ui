import { createVariants } from '~/utils/styles'

export const useScrollAreaStyle = createVariants({
  slots: {
    base: 'relative overflow-hidden',
    viewport: 'size-full scroll-smooth rounded-inherit',
    scrollbar: [
      'flex select-none touch-none bg-transparent',
      'orientation-vertical:(w-1 mr-0.5 my-0.5) orientation-horizontal:(flex-col h-1 mb-0.5 ml-0.5)',
      'state-visible:(animate-fade-in animate-duration-200 animate-ease-in-out)',
      'state-hidden:(animate-fade-out animate-duration-200 animate-ease-in-out)',
    ],
    thumb: [
      'relative z-11 flex-1 bg-border rounded-lg hover:bg-neutral-8',
      'before:(content-[""] abs abs-center size-full min-w-10 min-h-10 transform rounded-md)',
    ],
  },
})

export type ScrollAreaStyleSlots = typeof useScrollAreaStyle['slots']
