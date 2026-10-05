import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useButtonStyle = createVariants({
  slots: {
    root: 'flex-(inline center) cursor-default select-none',
    icon: 'shrink-0',
    label: 'font-medium select-none',
  },

  variants: {
    color: { primary: '', secondary: '', info: '', success: '', warning: '', error: '' },
    variant: { solid: '', soft: '', outline: '', ghost: '', plain: '', inverse: '', unstyled: '' },
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
    { color: 'primary', variant: 'solid', class: { root: 'fancy-primary' } },
    { color: 'secondary', variant: 'solid', class: { root: 'fancy-secondary' } },
    { color: 'info', variant: 'solid', class: { root: 'fancy-info' } },
    { color: 'success', variant: 'solid', class: { root: 'fancy-success' } },
    { color: 'warning', variant: 'solid', class: { root: 'fancy-warning' } },
    { color: 'error', variant: 'solid', class: { root: 'fancy-error' } },

    { color: 'primary', variant: 'soft', class: { root: 'fancy-primary-soft' } },
    { color: 'secondary', variant: 'soft', class: { root: 'fancy-secondary-soft' } },
    { color: 'info', variant: 'soft', class: { root: 'fancy-info-soft' } },
    { color: 'success', variant: 'soft', class: { root: 'fancy-success-soft' } },
    { color: 'warning', variant: 'soft', class: { root: 'fancy-warning-soft' } },
    { color: 'error', variant: 'soft', class: { root: 'fancy-error-soft' } },

    { color: 'primary', variant: 'outline', class: { root: 'fancy-primary-outline' } },
    { color: 'secondary', variant: 'outline', class: { root: 'fancy-secondary-outline' } },
    { color: 'info', variant: 'outline', class: { root: 'fancy-info-outline' } },
    { color: 'success', variant: 'outline', class: { root: 'fancy-success-outline' } },
    { color: 'warning', variant: 'outline', class: { root: 'fancy-warning-outline' } },
    { color: 'error', variant: 'outline', class: { root: 'fancy-error-outline' } },

    { color: 'primary', variant: 'ghost', class: { root: 'fancy-primary-ghost' } },
    { color: 'secondary', variant: 'ghost', class: { root: 'fancy-secondary-ghost' } },
    { color: 'info', variant: 'ghost', class: { root: 'fancy-info-ghost' } },
    { color: 'success', variant: 'ghost', class: { root: 'fancy-success-ghost' } },
    { color: 'warning', variant: 'ghost', class: { root: 'fancy-warning-ghost' } },
    { color: 'error', variant: 'ghost', class: { root: 'fancy-error-ghost' } },

    { color: 'primary', variant: 'plain', class: { root: 'fancy-primary-plain' } },
    { color: 'secondary', variant: 'plain', class: { root: 'fancy-secondary-plain' } },
    { color: 'info', variant: 'plain', class: { root: 'fancy-info-plain' } },
    { color: 'success', variant: 'plain', class: { root: 'fancy-success-plain' } },
    { color: 'warning', variant: 'plain', class: { root: 'fancy-warning-plain' } },
    { color: 'error', variant: 'plain', class: { root: 'fancy-error-plain' } },

    { color: 'primary', variant: 'inverse', class: { root: 'fancy-primary-inverse' } },
    { color: 'secondary', variant: 'inverse', class: { root: 'fancy-secondary-inverse' } },
    { color: 'info', variant: 'inverse', class: { root: 'fancy-info-inverse' } },
    { color: 'success', variant: 'inverse', class: { root: 'fancy-success-inverse' } },
    { color: 'warning', variant: 'inverse', class: { root: 'fancy-warning-inverse' } },
    { color: 'error', variant: 'inverse', class: { root: 'fancy-error-inverse' } },

    {
      variant: ['solid', 'soft', 'outline', 'ghost', 'inverse'],
      disabled: false,
      loading: false,
      class: { root: 'transition-transform duration-200 ease-out data-[pressed]:scale-96' },
    },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    radius: 'sm',
  },
})

export type ButtonStyleSlots = typeof useButtonStyle['slots']
export type ButtonStyleProps = VariantProps<typeof useButtonStyle>
