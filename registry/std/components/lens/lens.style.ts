import { createVariants } from '~/utils/styles'

export const useLensStyle = createVariants({
  slots: {
    base: 'relative overflow-hidden',
    viewport: [
      'abs inset-0 overflow-hidden transform-origin-[var(--lens-x)_var(--lens-y)] transform-none op-100',
    ],
    zoom: 'abs inset-0 transform-scale-$lens-zoom transform-origin-[var(--lens-x)_var(--lens-y)]',
  },

  variants: {
    hovering: {
      true: { base: 'cursor-none' },
      false: { base: 'cursor-unset' },
    },
  },

  defaultVariants: {
    hovering: false,
  },
})

export type LensStyleSlots = typeof useLensStyle['slots']
