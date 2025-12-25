import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconButtonStyle = createVariants({
  slots: {
    base: 'px-0 shrink-0',
    icon: '',
    loading: '',
  },

  variants: {
    size: {
      xs: { base: 'size-5', icon: 'size-3.5' },
      sm: { base: 'size-6', icon: 'size-4' },
      md: { base: 'size-8', icon: 'size-5' },
      lg: { base: 'size-10', icon: 'size-6' },
      xl: { base: 'size-16', icon: 'size-10' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type IconButtonStyleSlots = typeof useIconButtonStyle['slots']
export type IconButtonStyleProps = VariantProps<typeof useIconButtonStyle>
