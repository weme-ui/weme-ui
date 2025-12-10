import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconButtonStyle = createVariants({
  slots: {
    base: 'px-0',
    icon: '',
    loading: '',
  },

  variants: {
    size: {
      xs: { base: 'size-5' },
      sm: { base: 'size-6' },
      md: { base: 'size-8' },
      lg: { base: 'size-10' },
      xl: { base: 'size-16' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type IconButtonStyleSlots = typeof useIconButtonStyle['slots']
export type IconButtonStyleProps = VariantProps<typeof useIconButtonStyle>
