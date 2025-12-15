import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useItemStyle = createVariants({
  slots: {
    base: 'relative flex-(~ y-center) transition-colors',
    indicator: 'shrink-0',
    wrapper: 'flex-1',
    label: 'font-medium text-highlighted',
    description: 'text-toned ',
    content: 'flex-(~ y-center)',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: {
      plain: '',
      outline: { base: 'b-(~ default)' },
    },
    align: {
      start: { base: 'items-start' },
      center: { base: 'items-center' },
      end: { base: 'items-end' },
    },
    size: {
      sm: { base: 'p-3', indicator: 'size-3 mr-2', label: 'text-xs', description: 'text-xs', content: 'text-xs gap-2' },
      md: { base: 'px-4 py-3', indicator: 'size-3.5 mr-3', label: 'text-sm', description: 'text-sm', content: 'text-sm gap-2' },
      lg: { base: 'px-5 py-3', indicator: 'size-4 mr-3', label: 'text-base', description: 'text-sm', content: 'text-sm gap-3' },
    },
    radius: {
      none: '',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    clickable: { true: '' },
    disabled: { true: 'is-disabled' },
    loading: { true: { content: 'text-muted' } },
  },

  compoundVariants: [
    { color: 'primary', variant: 'plain', clickable: true, class: { base: 'hover:bg-primary-3' } },
    { color: 'secondary', variant: 'plain', clickable: true, class: { base: 'hover:bg-secondary-3' } },
    { color: 'neutral', variant: 'plain', clickable: true, class: { base: 'hover:bg-neutral-3' } },
    { color: 'info', variant: 'plain', clickable: true, class: { base: 'hover:bg-info-3' } },
    { color: 'success', variant: 'plain', clickable: true, class: { base: 'hover:bg-success-3' } },
    { color: 'warning', variant: 'plain', clickable: true, class: { base: 'hover:bg-warning-3' } },
    { color: 'danger', variant: 'plain', clickable: true, class: { base: 'hover:bg-danger-3' } },

    { color: 'primary', variant: 'outline', clickable: true, class: { base: 'hover:(b-primary-8 outline-3 outline-primary/5)' } },
    { color: 'secondary', variant: 'outline', clickable: true, class: { base: 'hover:(b-secondary-8 outline-3 outline-secondary/5)' } },
    { color: 'neutral', variant: 'outline', clickable: true, class: { base: 'hover:(b-neutral-8 outline-3 outline-neutral/5)' } },
    { color: 'info', variant: 'outline', clickable: true, class: { base: 'hover:(b-info-8 outline-3 outline-info/5)' } },
    { color: 'success', variant: 'outline', clickable: true, class: { base: 'hover:(b-success-8 outline-3 outline-success/5)' } },
    { color: 'warning', variant: 'outline', clickable: true, class: { base: 'hover:(b-warning-8 outline-3 outline-warning/5)' } },
    { color: 'danger', variant: 'outline', clickable: true, class: { base: 'hover:(b-danger-8 outline-3 outline-danger/5)' } },

    { size: 'sm', align: 'start', class: { indicator: 'mt-px' } },
    { size: 'md', align: 'start', class: { indicator: 'mt-[3px]' } },
    { size: 'lg', align: 'start', class: { indicator: 'mt-1' } },

    { size: 'sm', align: 'end', class: { indicator: 'mb-px' } },
    { size: 'md', align: 'end', class: { indicator: 'mb-[3px]' } },
    { size: 'lg', align: 'end', class: { indicator: 'mb-1' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'outline',
    align: 'start',
    size: 'md',
    radius: 'lg',
  },
})

export type ItemStyleSlots = typeof useItemStyle['slots']
export type ItemStyleProps = VariantProps<typeof useItemStyle>
