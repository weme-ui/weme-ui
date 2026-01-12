import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToggleStyle = createVariants({
  slots: {
    root: 'flex-(~ center) hover:state-off:text-highlighted',
    icon: 'shrink-0',
    label: 'leading-none state-on:font-medium',
  },

  variants: {
    color: {
      primary: { root: 'focus-visible:outline-primary' },
      secondary: { root: 'focus-visible:outline-secondary' },
      neutral: { root: 'focus-visible:outline-neutral' },
      info: { root: 'focus-visible:outline-info' },
      success: { root: 'focus-visible:outline-success' },
      warning: { root: 'focus-visible:outline-warning' },
      danger: { root: 'focus-visible:outline-danger' },
    },
    variant: { solid: '', soft: '', surface: '', outline: '', plain: '', inverse: { root: 'state-on:shadow-sm' } },
    size: {
      xs: { root: 'h-5 px-0.75 gap-0.75 text-3.5' },
      sm: { root: 'h-6 px-1.25 gap-1 text-3.5' },
      md: { root: 'h-8 px-2.25 gap-2 text-3.5' },
      lg: { root: 'h-10 px-3 gap-2 text-4' },
      xl: { root: 'h-12 px-4 gap-2 text-4.5' },
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
  },

  compoundSlots: [
    { slots: ['root', 'icon', 'label'], class: 'transition-colors' },
  ],

  compoundVariants: [
    { variant: ['solid', 'soft'], class: { root: 'hover:state-off:bg-muted' } },
    { variant: ['surface', 'outline'], class: { root: 'state-off:(ring-1 ring-border) hover:state-off:ring-border-elevated' } },

    { color: 'primary', variant: 'solid', class: { root: 'state-on:(bg-primary text-primary-1)' } },
    { color: 'primary', variant: 'soft', class: { root: 'state-on:(bg-primary-4 text-primary)' } },
    { color: 'primary', variant: 'surface', class: { root: 'state-on:(bg-primary-4 text-primary ring-1 ring-primary)' } },
    { color: 'primary', variant: 'outline', class: { root: 'state-on:(bg-transparent text-primary ring-1 ring-primary)' } },
    { color: 'primary', variant: 'plain', class: { root: 'state-on:text-primary' } },
    { color: 'primary', variant: 'inverse', class: { root: 'state-on:(bg-primary-1 text-primary)' } },

    { color: 'secondary', variant: 'solid', class: { root: 'state-on:(bg-secondary text-secondary-1)' } },
    { color: 'secondary', variant: 'soft', class: { root: 'state-on:(bg-secondary-4 text-secondary)' } },
    { color: 'secondary', variant: 'surface', class: { root: 'state-on:(bg-secondary-4 text-secondary ring-1 ring-secondary)' } },
    { color: 'secondary', variant: 'outline', class: { root: 'state-on:(bg-transparent text-secondary ring-1 ring-secondary)' } },
    { color: 'secondary', variant: 'plain', class: { root: 'state-on:text-secondary' } },
    { color: 'secondary', variant: 'inverse', class: { root: 'state-on:(bg-secondary-1 text-secondary)' } },

    { color: 'neutral', variant: 'solid', class: { root: 'state-on:(bg-neutral text-neutral-1)' } },
    { color: 'neutral', variant: 'soft', class: { root: 'state-on:(bg-neutral-4 text-neutral-12)' } },
    { color: 'neutral', variant: 'surface', class: { root: 'state-on:(bg-neutral-4 text-neutral-12 ring-1 ring-neutral)' } },
    { color: 'neutral', variant: 'outline', class: { root: 'state-on:(bg-transparent text-neutral-12 ring-1 ring-neutral)' } },
    { color: 'neutral', variant: 'plain', class: { root: 'state-on:text-neutral-12' } },
    { color: 'neutral', variant: 'inverse', class: { root: 'state-on:(bg-neutral-1 text-neutral-12)' } },

    { color: 'info', variant: 'solid', class: { root: 'state-on:(bg-info text-info-1)' } },
    { color: 'info', variant: 'soft', class: { root: 'state-on:(bg-info-4 text-info)' } },
    { color: 'info', variant: 'surface', class: { root: 'state-on:(bg-info-4 text-info ring-1 ring-info)' } },
    { color: 'info', variant: 'outline', class: { root: 'state-on:(bg-transparent text-info ring-1 ring-info)' } },
    { color: 'info', variant: 'plain', class: { root: 'state-on:text-info' } },
    { color: 'info', variant: 'inverse', class: { root: 'state-on:(bg-info-1 text-info)' } },

    { color: 'success', variant: 'solid', class: { root: 'state-on:(bg-success text-success-1)' } },
    { color: 'success', variant: 'soft', class: { root: 'state-on:(bg-success-4 text-success)' } },
    { color: 'success', variant: 'surface', class: { root: 'state-on:(bg-success-4 text-success ring-1 ring-success)' } },
    { color: 'success', variant: 'outline', class: { root: 'state-on:(bg-transparent text-success ring-1 ring-success)' } },
    { color: 'success', variant: 'plain', class: { root: 'state-on:text-success' } },
    { color: 'success', variant: 'inverse', class: { root: 'state-on:(bg-success-1 text-success)' } },

    { color: 'warning', variant: 'solid', class: { root: 'state-on:(bg-warning text-warning-1)' } },
    { color: 'warning', variant: 'soft', class: { root: 'state-on:(bg-warning-4 text-warning)' } },
    { color: 'warning', variant: 'surface', class: { root: 'state-on:(bg-warning-4 text-warning ring-1 ring-warning)' } },
    { color: 'warning', variant: 'outline', class: { root: 'state-on:(bg-transparent text-warning ring-1 ring-warning)' } },
    { color: 'warning', variant: 'plain', class: { root: 'state-on:text-warning' } },
    { color: 'warning', variant: 'inverse', class: { root: 'state-on:(bg-warning-1 text-warning)' } },

    { color: 'danger', variant: 'solid', class: { root: 'state-on:(bg-danger text-danger-1)' } },
    { color: 'danger', variant: 'soft', class: { root: 'state-on:(bg-danger-4 text-danger)' } },
    { color: 'danger', variant: 'surface', class: { root: 'state-on:(bg-danger-4 text-danger ring-1 ring-danger)' } },
    { color: 'danger', variant: 'outline', class: { root: 'state-on:(bg-transparent text-danger ring-1 ring-danger)' } },
    { color: 'danger', variant: 'plain', class: { root: 'state-on:text-danger' } },
    { color: 'danger', variant: 'inverse', class: { root: 'state-on:(bg-danger-1 text-danger)' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    radius: 'sm',
  },
})

export type ToggleStyleSlots = typeof useToggleStyle['slots']
export type ToggleStyleProps = VariantProps<typeof useToggleStyle>
