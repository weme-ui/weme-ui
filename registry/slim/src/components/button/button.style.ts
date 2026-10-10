import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useButtonStyle = createVariants({
  slots: {
    root: 'font-medium flex-(inline center) w-fit cursor-pointer select-none relative',
    icon: 'shrink-0',
  },

  variants: {
    variant: { primary: {}, secondary: {}, soft: {}, outline: {}, ghost: {}, plain: {}, inverse: {}, danger: {} },
    size: {
      sm: { root: 'text-xs px-sm gap-xs h-6', icon: 'size-3' },
      md: { root: 'text-sm px-md gap-sm h-8', icon: 'size-3.5' },
      lg: { root: 'text-base px-lg gap-md h-10', icon: 'size-4' },
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
    scalable: { true: {} },
    unstyled: { true: {} },
  },

  compoundVariants: [
    { variant: 'primary', unstyled: false, class: { root: 'fancy-accent' } },
    { variant: 'secondary', unstyled: false, class: { root: 'fancy-neutral-soft' } },
    { variant: 'soft', unstyled: false, class: { root: 'fancy-accent-soft' } },
    { variant: 'outline', unstyled: false, class: { root: 'fancy-neutral-outline' } },
    { variant: 'ghost', unstyled: false, class: { root: 'fancy-accent-ghost' } },
    { variant: 'plain', unstyled: false, class: { root: 'fancy-accent-plain' } },
    { variant: 'inverse', unstyled: false, class: { root: 'fancy-accent-inverse' } },
    { variant: 'danger', unstyled: false, class: { root: 'fancy-error' } },

    { disabled: false, loading: false, scalable: true, unstyled: false, class: { root: 'transition-all duration-200 ease-out aria-[pressed=true]:scale-97' } },
  ],

  defaultVariants: {
    variant: 'primary',
    size: 'md',
    radius: 'sm',
    scalable: true,
    unstyled: false,
  },
})

export type ButtonStyleSlots = typeof useButtonStyle['slots']
export type ButtonStyleProps = VariantProps<typeof useButtonStyle>
