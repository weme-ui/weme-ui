import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToggleGroupStyle = createVariants({
  slots: {
    root: 'flex gap-1',
    item: '',
  },

  variants: {
    orientation: {
      horizontal: { root: 'flex-row' },
      vertical: { root: 'flex-col' },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type ToggleGroupStyleSlots = typeof useToggleGroupStyle['slots']
export type ToggleGroupStyleProps = VariantProps<typeof useToggleGroupStyle>
