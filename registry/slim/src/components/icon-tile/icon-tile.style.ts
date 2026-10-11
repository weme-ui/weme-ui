import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconTileStyle = createVariants({
  slots: {
    root: 'align-middle flex-(inline center) shrink-0 relative',
    icon: 'shrink-0 pointer-events-none',
  },

  variants: {
    color: { accent: {}, neutral: {}, info: {}, success: {}, warning: {}, error: {} },
    variant: { solid: {}, soft: {}, elevated: {}, outline: {}, frame: {}, inverse: {} },
    size: {
      xs: { root: 'size-6', icon: 'size-3.5' },
      sm: { root: 'size-8', icon: 'size-4' },
      md: { root: 'size-10', icon: 'size-4.5' },
      lg: { root: 'size-12', icon: 'size-5.5' },
      xl: { root: 'size-14', icon: 'size-7' },
    },
    radius: {
      none: { root: 'rounded-none' },
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    unstyled: { true: {} },
  },

  compoundVariants: [
    { color: 'accent', variant: 'solid', unstyled: false, class: { root: 'plain-accent' } },
    { color: 'neutral', variant: 'solid', unstyled: false, class: { root: 'plain-neutral' } },
    { color: 'info', variant: 'solid', unstyled: false, class: { root: 'plain-info' } },
    { color: 'success', variant: 'solid', unstyled: false, class: { root: 'plain-success' } },
    { color: 'warning', variant: 'solid', unstyled: false, class: { root: 'plain-warning' } },
    { color: 'error', variant: 'solid', unstyled: false, class: { root: 'plain-error' } },

    { color: 'accent', variant: 'soft', unstyled: false, class: { root: 'plain-accent-soft' } },
    { color: 'neutral', variant: 'soft', unstyled: false, class: { root: 'plain-neutral-soft' } },
    { color: 'info', variant: 'soft', unstyled: false, class: { root: 'plain-info-soft' } },
    { color: 'success', variant: 'soft', unstyled: false, class: { root: 'plain-success-soft' } },
    { color: 'warning', variant: 'soft', unstyled: false, class: { root: 'plain-warning-soft' } },
    { color: 'error', variant: 'soft', unstyled: false, class: { root: 'plain-error-soft' } },

    { color: 'accent', variant: 'elevated', unstyled: false, class: { root: 'plain-accent-elevated' } },
    { color: 'neutral', variant: 'elevated', unstyled: false, class: { root: 'plain-neutral-elevated' } },
    { color: 'info', variant: 'elevated', unstyled: false, class: { root: 'plain-info-elevated' } },
    { color: 'success', variant: 'elevated', unstyled: false, class: { root: 'plain-success-elevated' } },
    { color: 'warning', variant: 'elevated', unstyled: false, class: { root: 'plain-warning-elevated' } },
    { color: 'error', variant: 'elevated', unstyled: false, class: { root: 'plain-error-elevated' } },

    { color: 'accent', variant: 'outline', unstyled: false, class: { root: 'plain-accent-outline' } },
    { color: 'neutral', variant: 'outline', unstyled: false, class: { root: 'plain-neutral-outline' } },
    { color: 'info', variant: 'outline', unstyled: false, class: { root: 'plain-info-outline' } },
    { color: 'success', variant: 'outline', unstyled: false, class: { root: 'plain-success-outline' } },
    { color: 'warning', variant: 'outline', unstyled: false, class: { root: 'plain-warning-outline' } },
    { color: 'error', variant: 'outline', unstyled: false, class: { root: 'plain-error-outline' } },

    { color: 'accent', variant: 'frame', unstyled: false, class: { root: 'plain-accent-frame' } },
    { color: 'neutral', variant: 'frame', unstyled: false, class: { root: 'plain-neutral-frame' } },
    { color: 'info', variant: 'frame', unstyled: false, class: { root: 'plain-info-frame' } },
    { color: 'success', variant: 'frame', unstyled: false, class: { root: 'plain-success-frame' } },
    { color: 'warning', variant: 'frame', unstyled: false, class: { root: 'plain-warning-frame' } },
    { color: 'error', variant: 'frame', unstyled: false, class: { root: 'plain-error-frame' } },

    { color: 'accent', variant: 'inverse', unstyled: false, class: { root: 'plain-accent-inverse' } },
    { color: 'neutral', variant: 'inverse', unstyled: false, class: { root: 'plain-neutral-inverse' } },
    { color: 'info', variant: 'inverse', unstyled: false, class: { root: 'plain-info-inverse' } },
    { color: 'success', variant: 'inverse', unstyled: false, class: { root: 'plain-success-inverse' } },
    { color: 'warning', variant: 'inverse', unstyled: false, class: { root: 'plain-warning-inverse' } },
    { color: 'error', variant: 'inverse', unstyled: false, class: { root: 'plain-error-inverse' } },
  ],

  defaultVariants: {
    color: 'neutral',
    variant: 'solid',
    size: 'md',
    radius: 'md',
  },
})

export type IconTileStyleSlots = typeof useIconTileStyle['slots']
export type IconTileStyleProps = VariantProps<typeof useIconTileStyle>
