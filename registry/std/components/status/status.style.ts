import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useStatusStyle = createVariants({
  slots: {
    root: 'flex-(inline y-center)',
    wrapper: '',
    indicator: 'block rounded-full',
    label: '',
  },

  variants: {
    color: createColorVariants({ type: 'box', variant: 'solid', slot: 'indicator' }),
    size: {
      xs: { indicator: 'size-2', label: 'text-xs ml-1.5' },
      sm: { indicator: 'size-2.5', label: 'text-sm ml-2' },
      md: { indicator: 'size-3', label: 'text-base ml-2.5' },
      lg: { indicator: 'size-4', label: 'text-base ml-2.5' },
      xl: { indicator: 'size-5', label: 'text-base ml-2.5' },
    },
    animate: {
      true: { wrapper: 'relative before:(abs content-[""] block inset-0 rounded-full animate-ping)' },
      false: '',
    },
  },

  compoundVariants: [
    { color: 'primary', animate: true, class: { wrapper: 'before:bg-primary/50' } },
    { color: 'secondary', animate: true, class: { wrapper: 'before:bg-secondary/50' } },
    { color: 'neutral', animate: true, class: { wrapper: 'before:bg-neutral/50' } },
    { color: 'info', animate: true, class: { wrapper: 'before:bg-info/50' } },
    { color: 'success', animate: true, class: { wrapper: 'before:bg-success/50' } },
    { color: 'warning', animate: true, class: { wrapper: 'before:bg-warning/50' } },
    { color: 'danger', animate: true, class: { wrapper: 'before:bg-danger/50' } },
  ],

  defaultVariants: {
    color: 'primary',
    size: 'sm',
    animate: false,
  },
})

export type StatusStyleSlots = typeof useStatusStyle['slots']
export type StatusStyleProps = VariantProps<typeof useStatusStyle>
