import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSpinnerStyle = createVariants({
  slots: {
    base: '',
    indicator: 'animate-spin',
    description: 'text-sm',
    overlay: '',
  },

  variants: {
    size: {
      xs: { base: 'gap-1', indicator: 'size-3' },
      sm: { base: 'gap-1', indicator: 'size-4' },
      md: { base: 'gap-1.5', indicator: 'size-6' },
      lg: { base: 'gap-2', indicator: 'size-8' },
      xl: { base: 'gap-2.5', indicator: 'size-10' },
    },
    overlay: {
      true: { base: 'relative overflow-hidden', overlay: 'flex-(~ center) gap-2 c-primary-1' },
      false: { base: 'flex-(~ center) gap-2 c-primary' },
    },
  },

  defaultVariants: {
    size: 'md',
    overlay: false,
  },
})

export type SpinnerStyleSlots = typeof useSpinnerStyle['slots']
export type SpinnerStyleProps = VariantProps<typeof useSpinnerStyle>
