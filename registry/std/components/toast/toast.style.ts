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
    { color: 'accent', inverse: false, class: { base: 'ring-accent', icon: 'c-accent' } },
    { color: 'neutral', inverse: false, class: { base: 'ring-neutral', icon: 'c-neutral' } },
    { color: 'info', inverse: false, class: { base: 'ring-info', icon: 'c-info' } },
    { color: 'success', inverse: false, class: { base: 'ring-success', icon: 'c-success' } },
    { color: 'warning', inverse: false, class: { base: 'ring-warning', icon: 'c-warning' } },
    { color: 'error', inverse: false, class: { base: 'ring-error', icon: 'c-error' } },

    { color: 'accent', inverse: true, class: { base: 'bg-accent c-accent-1' } },
    { color: 'neutral', inverse: true, class: { base: 'bg-neutral c-neutral-1' } },
    { color: 'info', inverse: true, class: { base: 'bg-info c-info-1' } },
    { color: 'success', inverse: true, class: { base: 'bg-success c-success-1' } },
    { color: 'warning', inverse: true, class: { base: 'bg-warning c-warning-1' } },
    { color: 'error', inverse: true, class: { base: 'bg-error c-error-1' } },
  ],

  defaultVariants: {
    color: 'accent',
    radius: 'lg',
    orientation: 'horizontal',
    inverse: false,
  },
})

export type ToastStyleSlots = typeof useToastStyle['slots']
export type ToastStyleProps = VariantProps<typeof useToastStyle>
