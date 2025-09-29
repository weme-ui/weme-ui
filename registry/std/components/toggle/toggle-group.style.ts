import { createVariants } from '~/utils/styles'

export const useToggleGroupStyle = createVariants({
  slots: {
    base: 'flex gap-1',
    item: '',
  },
})

export type ToggleGroupStyleSlots = typeof useToggleGroupStyle['slots']
