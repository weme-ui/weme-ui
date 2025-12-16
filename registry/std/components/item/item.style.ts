import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useItemStyle = createVariants({
  slots: {
    base: 'relative transition-colors',
    item: 'flex-(~ y-center) py-3',
    indicator: 'shrink-0',
    wrapper: 'flex-1 select-none',
    label: 'font-medium text-highlighted',
    description: 'text-toned ',
    content: 'flex-(~ y-center)',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: {
      plain: '',
      underline: { item: 'b-(b default)' },
      outline: { base: 'b-(~ default)' },
    },
    align: {
      start: { base: 'items-start' },
      center: { base: 'items-center' },
      end: { base: 'items-end' },
    },
    size: {
      sm: { base: 'px-3', indicator: 'size-3 mr-2', label: 'text-xs', description: 'text-xs', content: 'text-xs gap-2' },
      md: { base: 'px-4', indicator: 'size-3.5 mr-3', label: 'text-sm', description: 'text-sm', content: 'text-sm gap-2' },
      lg: { base: 'px-5', indicator: 'size-4 mr-3', label: 'text-base', description: 'text-sm', content: 'text-sm gap-3' },
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
    { color: 'primary', variant: ['plain', 'underline'], clickable: true, class: { base: 'hover:bg-primary-3 active:bg-primary-4' } },
    { color: 'secondary', variant: ['plain', 'underline'], clickable: true, class: { base: 'hover:bg-secondary-3 active:bg-secondary-4' } },
    { color: 'neutral', variant: ['plain', 'underline'], clickable: true, class: { base: 'hover:bg-neutral-3 active:bg-neutral-4' } },
    { color: 'info', variant: ['plain', 'underline'], clickable: true, class: { base: 'hover:bg-info-3 active:bg-info-4' } },
    { color: 'success', variant: ['plain', 'underline'], clickable: true, class: { base: 'hover:bg-success-3 active:bg-success-4' } },
    { color: 'warning', variant: ['plain', 'underline'], clickable: true, class: { base: 'hover:bg-warning-3 active:bg-warning-4' } },
    { color: 'danger', variant: ['plain', 'underline'], clickable: true, class: { base: 'hover:bg-danger-3 active:bg-danger-4' } },

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
    variant: 'plain',
    align: 'center',
    size: 'md',
    radius: 'lg',
  },
})

export type ItemStyleSlots = typeof useItemStyle['slots']
export type ItemStyleProps = VariantProps<typeof useItemStyle>
