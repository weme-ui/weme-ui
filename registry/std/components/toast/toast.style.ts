import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToastStyle = createVariants({
  slots: {
    base: 'flex gap-2.5 px-4 py-3.5 shadow-lg overflow-hidden focus:outline-hidden',
    icon: 'shrink-0 size-5',
    title: 'text-sm font-medium',
    description: 'text-sm',
    actions: 'flex shrink-0 gap-1.5',
    close: [
      'text-3.5 flex-(~ center) [&>svg]:z-1',
      'after:(abs size-6 block content-[""] op-0 rounded-full transition-colors)',
      'hover:after:(bg-current op-20) active:after:op-30',
    ],
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    orientation: {
      horizontal: {
        base: 'items-center',
        actions: 'items-center',
      },
      vertical: {
        base: 'items-start',
        actions: 'items-start mt-1.5',
      },
    },
    inverse: {
      true: { base: 'ring-(1 toast/90) focus-visible:ring-(2 inset)', description: 'op-60' },
      false: { base: 'bg-toast ring-1', title: 'text-highlighted' },
    },
  },

  compoundVariants: [
    { color: 'primary', inverse: false, class: { base: 'ring-primary', icon: 'c-primary' } },
    { color: 'secondary', inverse: false, class: { base: 'ring-secondary', icon: 'c-secondary' } },
    { color: 'neutral', inverse: false, class: { base: 'ring-neutral', icon: 'c-neutral' } },
    { color: 'info', inverse: false, class: { base: 'ring-info', icon: 'c-info' } },
    { color: 'success', inverse: false, class: { base: 'ring-success', icon: 'c-success' } },
    { color: 'warning', inverse: false, class: { base: 'ring-warning', icon: 'c-warning' } },
    { color: 'danger', inverse: false, class: { base: 'ring-danger', icon: 'c-danger' } },

    { color: 'primary', inverse: true, class: { base: 'bg-primary c-primary-1' } },
    { color: 'secondary', inverse: true, class: { base: 'bg-secondary c-secondary-1' } },
    { color: 'neutral', inverse: true, class: { base: 'bg-neutral c-neutral-1' } },
    { color: 'info', inverse: true, class: { base: 'bg-info c-info-1' } },
    { color: 'success', inverse: true, class: { base: 'bg-success c-success-1' } },
    { color: 'warning', inverse: true, class: { base: 'bg-warning c-warning-1' } },
    { color: 'danger', inverse: true, class: { base: 'bg-danger c-danger-1' } },
  ],

  defaultVariants: {
    color: 'primary',
    radius: 'lg',
    orientation: 'horizontal',
    inverse: false,
  },
})

export type ToastStyleSlots = typeof useToastStyle['slots']
export type ToastStyleProps = VariantProps<typeof useToastStyle>
