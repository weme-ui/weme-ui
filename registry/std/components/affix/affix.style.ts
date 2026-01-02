import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAffixStyle = createVariants({
  slots: {
    base: 'top-$affix-top bottom-$affix-bottom w-$affix-width h-$affix-height',
  },

  variants: {
    enable: { true: 'fixed z-999' },
  },

  defaultVariants: {
    enable: false,
  },
})

export type AffixStyleSlots = typeof useAffixStyle['slots']
export type AffixStyleProps = VariantProps<typeof useAffixStyle>
