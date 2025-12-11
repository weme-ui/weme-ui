import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAvatarGroupStyle = createVariants({
  slots: {
    base: 'flex-(~ row-reverse) justify-end',
    item: 'relative ring-(1 white-12) first:me-0',
  },

  variants: {
    size: {
      xs: { item: '-me-0.75' },
      sm: { item: '-me-1' },
      md: { item: '-me-2' },
      lg: { item: '-me-2.5' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type AvatarGroupStyleSlots = typeof useAvatarGroupStyle['slots']
export type AvatarGroupStyleProps = VariantProps<typeof useAvatarGroupStyle>
