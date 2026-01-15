import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSpinnerStyle = createVariants({
  slots: {
    root: '',
    indicator: 'animate-spin',
    description: 'text-sm',
    viewport: '',
    overlay: '',
  },

  variants: {
    size: {
      xs: { indicator: 'size-3' },
      sm: { indicator: 'size-4' },
      md: { indicator: 'size-6' },
      lg: { indicator: 'size-8' },
      xl: { indicator: 'size-10' },
    },
    overlay: {
      true: { viewport: 'abs inset-0 flex-(~ center) gap-2 c-primary-1 z-tooltip' },
      false: { root: 'flex-(~ center) gap-2 c-primary' },
    },
    loading: { true: '' },
  },

  compoundVariants: [
    { loading: true, overlay: true, class: { root: 'relative' } },

    { loading: true, size: 'xs', class: { root: 'gap-1' } },
    { loading: true, size: 'sm', class: { root: 'gap-1' } },
    { loading: true, size: 'md', class: { root: 'gap-1.5' } },
    { loading: true, size: 'lg', class: { root: 'gap-2' } },
    { loading: true, size: 'xl', class: { root: 'gap-2.5' } },
  ],

  defaultVariants: {
    size: 'md',
    overlay: false,
  },
})

export type SpinnerStyleSlots = typeof useSpinnerStyle['slots']
export type SpinnerStyleProps = VariantProps<typeof useSpinnerStyle>
