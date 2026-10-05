import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useButtonStyle = createVariants({
  slots: {
    root: 'relative w-fit flex-(inline center) cursor-pointer select-none',
    icon: 'shrink-0',
    label: 'font-medium',
  },

  variants: {
    variant: {
      primary: { root: 'fancy-accent' },
      secondary: { root: 'fancy-neutral-soft' },
      soft: { root: 'fancy-accent-soft' },
      outline: { root: 'fancy-accent-outline' },
      ghost: { root: 'fancy-accent-ghost' },
      plain: { root: 'fancy-accent-plain' },
      inverse: { root: 'fancy-accent-inverse' },
      danger: { root: 'fancy-error' },
      unstyled: '',
    },
    size: {
      sm: { root: 'h-6 px-sm gap-xs text-xs', icon: 'size-3' },
      md: { root: 'h-8 px-md gap-sm text-sm', icon: 'size-3.5' },
      lg: { root: 'h-10 px-lg gap-md text-base', icon: 'size-4' },
    },
    radius: {
      none: '',
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    loading: {
      true: { root: 'is-loading', icon: 'animate-spin' },
    },
  },

  compoundVariants: [
    {
      variant: ['primary', 'secondary', 'soft', 'outline', 'ghost', 'inverse', 'danger'],
      disabled: false,
      loading: false,
      class: { root: 'transition-all duration-200 ease-out data-[pressed]:scale-96' },
    },
  ],

  defaultVariants: {
    variant: 'primary',
    size: 'md',
    radius: 'sm',
  },
})

export type ButtonStyleSlots = typeof useButtonStyle['slots']
export type ButtonStyleProps = VariantProps<typeof useButtonStyle>
