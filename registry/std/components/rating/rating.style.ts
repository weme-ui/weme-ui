import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useRatingStyle = createVariants({
  slots: {
    root: 'flex-(~ y-center) gap-1',
    star: 'flex-(~ center) text-muted transition-colors',
  },

  variants: {
    color: {
      primary: { star: 'data-[highlighted]:text-primary' },
      secondary: { star: 'data-[highlighted]:text-secondary' },
      neutral: { star: 'data-[highlighted]:text-neutral-11' },
      info: { star: 'data-[highlighted]:text-info' },
      success: { star: 'data-[highlighted]:text-success' },
      warning: { star: 'data-[highlighted]:text-warning' },
      danger: { star: 'data-[highlighted]:text-danger' },
    },
    size: {
      xs: { root: 'text-2.5' },
      sm: { root: 'text-3' },
      md: { root: 'text-4' },
      lg: { root: 'text-5' },
      xl: { root: 'text-6' },
    },
  },

  defaultVariants: {
    color: 'primary',
    size: 'md',
  },
})

export type RatingStyleSlots = typeof useRatingStyle['slots']
export type RatingStyleProps = VariantProps<typeof useRatingStyle>
