import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useLinkStyle = createVariants({
  slots: {
    root: 'flex-(inline y-center) gap-x-2',
    prefixIcon: 'size-4',
    suffixIcon: 'size-4',
  },

  variants: {
    color: { accent: {}, neutral: {}, info: {}, success: {}, warning: {}, error: {} },
    unstyled: { true: {} },
    external: {
      true: { suffixIcon: 'text-foreground-muted' },
    },
  },

  compoundSlots: [
    { slots: ['root', 'prefixIcon', 'suffixIcon'], className: 'transition-colors' },
  ],

  compoundVariants: [
    { color: 'accent', unstyled: false, class: { root: 'fancy-accent-plain' } },
    { color: 'neutral', unstyled: false, class: { root: 'fancy-neutral-plain' } },
    { color: 'info', unstyled: false, class: { root: 'fancy-info-plain' } },
    { color: 'success', unstyled: false, class: { root: 'fancy-success-plain' } },
    { color: 'warning', unstyled: false, class: { root: 'fancy-warning-plain' } },
    { color: 'error', unstyled: false, class: { root: 'fancy-error-plain' } },
  ],

  defaultVariants: {
    color: 'accent',
    unstyled: false,
    external: false,
  },
})

export type LinkStyleSlots = typeof useLinkStyle['slots']
export type LinkStyleProps = VariantProps<typeof useLinkStyle>
