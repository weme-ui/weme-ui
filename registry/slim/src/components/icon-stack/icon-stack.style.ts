import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconStackStyle = createVariants({
  slots: {
    root: 'relative text-foreground **:data-[slot=icon-stack-layer]:fill-background-base',
    layerWrapper: 'size-full overflow-visible',
    layer: '',
    ellipse: 'blur-xs',
    iconWrapper: 'abs top-$icon-stack-content-y left-$icon-stack-content-x -translate-x-1/2 -translate-y-1/2 scale-x-90 skew-y--26 flex-(~ center) pointer-events-none',
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
      xs: { root: 'w-11 h-12', icon: 'size-3' },
      sm: { root: 'w-14 h-16', icon: 'size-3.5' },
      md: { root: 'w-18 h-20', icon: 'size-4' },
      lg: { root: 'w-24 h-28', icon: 'size-6' },
    },
  },

  defaultVariants: {
    size: 'sm',
  },
})

export type IconStackStyleSlots = typeof useIconStackStyle['slots']
export type IconStackStyleProps = VariantProps<typeof useIconStackStyle>
