import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconButtonStyle = createVariants({
  slots: {
    root: 'px-0 shrink-0',
    icon: '',
    loading: '',
  },

  variants: {
    size: {
      xs: { root: 'size-5', icon: 'size-3.5' },
      sm: { root: 'size-6', icon: 'size-3.5' },
      md: { root: 'size-8', icon: 'size-3.5' },
      lg: { root: 'size-10', icon: 'size-4' },
      xl: { root: 'size-12', icon: 'size-4.5' },
    },
  },

  defaultVariants: {
    size: 'md',
  },
})

export type IconButtonStyleSlots = typeof useIconButtonStyle['slots']
export type IconButtonStyleProps = VariantProps<typeof useIconButtonStyle>
