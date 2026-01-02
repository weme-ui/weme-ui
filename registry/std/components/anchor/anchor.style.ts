import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAnchorStyle = createVariants({
  slots: {
    root: '',
    indicator: '',
    list: '',
    item: '',
    link: '',
  },

  variants: {},

  defaultVariants: {},
})

export type AnchorStyleSlots = typeof useAnchorStyle['slots']
export type AnchorStyleProps = VariantProps<typeof useAnchorStyle>
