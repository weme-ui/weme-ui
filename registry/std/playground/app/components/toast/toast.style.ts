import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToastStyle = createVariants({
  slots: {
    base: 'flex gap-2.5 px-4 py-3 shadow-lg overflow-hidden focus:outline-hidden',
    icon: 'shrink-0 size-5',
    wrapper: 'flex-(~ 1 col)',
    title: 'text-sm font-medium',
    description: 'text-sm',
    actions: 'flex shrink-0 gap-2',
    close: [
      'relative flex-(~ center) text-3.5 p-1 rounded-full',
      'hover:before:(abs abs-center block content-[""] size-full rounded-full transition-colors op-15)',
      'active:before:op-20',
    ],
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: {
      solid: {
        base: 'backdrop-blur-3xl',
      },
      outline: {
        base: 'ring-(1 neutral-1) focus-visible:ring-(2 inset)',
        title: 'c-highlighted',
        description: 'c-toned',
      },
    },
    orientation: {
      horizontal: {
        base: 'items-start',
        actions: 'items-center',
      },
      vertical: {
        base: 'items-start',
        actions: 'items-start mt-1.5',
      },
    },
    radius: {
      none: '',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    loading: {
      true: {
        icon: 'animate-spin',
      },
    },
  },

  compoundVariants: [
    { color: 'primary', variant: 'solid', class: { base: 'bg-primary/90 c-primary-1', description: 'c-primary-2', close: 'hover:before:bg-primary-1' } },
    { color: 'secondary', variant: 'solid', class: { base: 'bg-secondary/90 c-secondary-1', description: 'c-secondary-2', close: 'hover:before:bg-secondary-1' } },
    { color: 'neutral', variant: 'solid', class: { base: 'bg-neutral/90 c-neutral-1', description: 'c-neutral-2', close: 'hover:before:bg-neutral-1' } },
    { color: 'info', variant: 'solid', class: { base: 'bg-info/90 c-info-1', description: 'c-info-2', close: 'hover:before:bg-info-1' } },
    { color: 'success', variant: 'solid', class: { base: 'bg-success/90 c-success-1', description: 'c-success-2', close: 'hover:before:bg-success-1' } },
    { color: 'warning', variant: 'solid', class: { base: 'bg-warning/90 c-warning-1', description: 'c-warning-2', close: 'hover:before:bg-warning-1' } },
    { color: 'danger', variant: 'solid', class: { base: 'bg-danger/90 c-danger-1', description: 'c-danger-2', close: 'hover:before:bg-danger-1' } },

    { color: 'primary', variant: 'outline', class: { base: 'ring-primary bg-primary-1', icon: 'c-primary', close: 'hover:before:bg-primary-7' } },
    { color: 'secondary', variant: 'outline', class: { base: 'ring-secondary bg-secondary-1', icon: 'c-secondary', close: 'hover:before:bg-secondary-7' } },
    { color: 'neutral', variant: 'outline', class: { base: 'ring-neutral bg-neutral-1', icon: 'c-neutral', close: 'hover:before:bg-neutral-7' } },
    { color: 'info', variant: 'outline', class: { base: 'ring-info bg-info-1', icon: 'c-info', close: 'hover:before:bg-info-7' } },
    { color: 'success', variant: 'outline', class: { base: 'ring-success bg-success-1', icon: 'c-success', close: 'hover:before:bg-success-7' } },
    { color: 'warning', variant: 'outline', class: { base: 'ring-warning bg-warning-1', icon: 'c-warning', close: 'hover:before:bg-warning-7' } },
    { color: 'danger', variant: 'outline', class: { base: 'ring-danger bg-danger-1', icon: 'c-danger', close: 'hover:before:bg-danger-7' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'outline',
    orientation: 'horizontal',
    radius: 'lg',
    loading: false,
  },
})

export type ToastStyleSlots = typeof useToastStyle['slots']
export type ToastStyleProps = VariantProps<typeof useToastStyle>
