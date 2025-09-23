import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSpinnerStyle = createVariants({
  slots: {
    base: '',
    icon: 'c-accent',
    description: 'text-(sm accent) select-none',
    overlay: 'abs inset-0 flex-(~ col center) bg-neutral-6/60 z-overlay',
  },

  variants: {
    size: {
      xs: { icon: 'size-3' },
      sm: { icon: 'size-4' },
      md: { icon: 'size-5' },
      lg: { icon: 'size-8' },
      xl: { icon: 'size-10' },
    },
    animate: {
      true: { icon: 'animate-spin' },
    },
    mask: {
      true: {
        base: 'relative',
      },
      false: {
        base: 'flex-(~ col center)',
      },
    },
  },

  compoundVariants: [
    { mask: false, size: 'xs', class: { base: 'gap-y-1' } },
    { mask: false, size: 'sm', class: { base: 'gap-y-1' } },
    { mask: false, size: 'md', class: { base: 'gap-y-1.5' } },
    { mask: false, size: 'lg', class: { base: 'gap-y-2' } },
    { mask: false, size: 'xl', class: { base: 'gap-y-2.5' } },

    { mask: true, size: 'xs', class: { overlay: 'gap-y-1' } },
    { mask: true, size: 'sm', class: { overlay: 'gap-y-1' } },
    { mask: true, size: 'md', class: { overlay: 'gap-y-1.5' } },
    { mask: true, size: 'lg', class: { overlay: 'gap-y-2' } },
    { mask: true, size: 'xl', class: { overlay: 'gap-y-2.5' } },
  ],

  defaultVariants: {
    size: 'md',
    animate: false,
  },
})

export type SpinnerStyleSlots = typeof useSpinnerStyle['slots']
export type SpinnerStyleProps = VariantProps<typeof useSpinnerStyle>
