import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useImageStyle = createVariants({
  slots: {
    base: '',
  },

  variants: {
    fit: {
      none: 'object-none',
      contain: 'object-contain',
      cover: 'object-cover',
      fill: 'object-fill',
      scaleDown: 'object-scale-down',
    },
    radius: {
      none: '',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
  },

  defaultVariants: {
    fit: 'none',
    radius: 'none',
  },
})

export type ImageStyleSlots = typeof useImageStyle['slots']
export type ImageStyleProps = VariantProps<typeof useImageStyle>
