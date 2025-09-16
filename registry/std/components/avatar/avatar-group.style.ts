import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAvatarGroupStyle = createVariants({
  slots: {
    base: 'flex-(~ row-reverse) justify-end',
    items: 'relative ring-(1 white-12) first:me-0',
  },

  variants: {
    size: {
      xs: { items: '-me-0.75' },
      sm: { items: '-me-1' },
      md: { items: '-me-2' },
      lg: { items: '-me-2.5' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type AvatarGroupStyleSlots = typeof useAvatarGroupStyle['slots']
export type AvatarGroupStyleProps = VariantProps<typeof useAvatarGroupStyle>
