import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useHeadingStyle = createVariants({
  slots: {
    base: 'font-semibold',
  },

  variants: {
    size: {
      'xs': 'text-xs',
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
    },
  },

  defaultVariants: {
    size: 'xl',
  },
})

export type HeadingStyleSlots = typeof useHeadingStyle['slots']
export type HeadingStyleProps = VariantProps<typeof useHeadingStyle>
