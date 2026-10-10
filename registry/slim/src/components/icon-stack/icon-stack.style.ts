import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconStackStyle = createVariants({
  slots: {
    root: 'text-foreground relative **:data-[slot=icon-stack-layer]:fill-background-base',
    layerWrapper: 'size-full overflow-visible',
    layer: '',
    ellipse: 'blur-xs',
    iconWrapper: 'flex pointer-events-none skew-y--26 scale-x-90 flex-center left-$icon-stack-content-x top-$icon-stack-content-y abs -translate-x-1/2 -translate-y-1/2',
    icon: '',
  },

  variants: {
    color: {
      accent: { root: 'text-accent' },
      neutral: { root: 'text-neutral-11' },
      info: { root: 'text-info' },
      success: { root: 'text-success' },
      warning: { root: 'text-warning' },
      error: { root: 'text-error' },
    },
    size: {
      xs: { root: 'h-12 w-11', icon: 'size-3' },
      sm: { root: 'h-16 w-14', icon: 'size-3.5' },
      md: { root: 'h-20 w-18', icon: 'size-4' },
      lg: { root: 'h-28 w-24', icon: 'size-6' },
    },
  },

  defaultVariants: {
    size: 'sm',
  },
})

export type IconStackStyleSlots = typeof useIconStackStyle['slots']
export type IconStackStyleProps = VariantProps<typeof useIconStackStyle>
