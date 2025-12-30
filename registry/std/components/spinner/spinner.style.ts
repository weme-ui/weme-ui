import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSpinnerStyle = createVariants({
  slots: {
    root: '',
    indicator: 'animate-spin',
    description: 'text-sm',
    viewport: '',
  },

  variants: {
    size: {
      xs: { root: 'gap-1', indicator: 'size-3' },
      sm: { root: 'gap-1', indicator: 'size-4' },
      md: { root: 'gap-1.5', indicator: 'size-6' },
      lg: { root: 'gap-2', indicator: 'size-8' },
      xl: { root: 'gap-2.5', indicator: 'size-10' },
    },
    overlay: {
      true: { root: 'relative overflow-hidden', viewport: 'abs inset-0 flex-(~ center) gap-2 c-primary-1 z-tooltip' },
      false: { root: 'flex-(~ center) gap-2 c-primary' },
    },
  },

  defaultVariants: {
    size: 'md',
    overlay: false,
  },
})

export type SpinnerStyleSlots = typeof useSpinnerStyle['slots']
export type SpinnerStyleProps = VariantProps<typeof useSpinnerStyle>
