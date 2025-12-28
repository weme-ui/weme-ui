import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useItemStyle = createVariants({
  slots: {
    root: 'relative transition-colors',
    item: 'flex-(~ y-center) py-3',
    indicator: '',
    indicatorIcon: 'shrink-0',
    wrapper: 'flex-1 select-none',
    title: 'font-medium text-highlighted',
    description: 'text-toned ',
    content: 'flex-(~ y-center)',
    arrow: 'shrink-0',
    loading: 'animate-spin',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: {
      plain: '',
      underline: { item: 'b-(b default)' },
      outline: { root: 'b-(~ default)' },
    },
    align: {
      start: { item: 'items-start' },
      center: { item: 'items-center' },
      end: { item: 'items-end' },
    },
    size: {
      sm: { root: 'px-3', item: 'gap-2', indicatorIcon: 'size-3', title: 'text-xs', description: 'text-xs', content: 'text-xs gap-2' },
      md: { root: 'px-4', item: 'gap-3', indicatorIcon: 'size-3.5', title: 'text-sm', description: 'text-sm', content: 'text-sm gap-2' },
      lg: { root: 'px-5', item: 'gap-4', indicatorIcon: 'size-4', title: 'text-base', description: 'text-sm', content: 'text-sm gap-3' },
    },
    radius: {
      none: '',
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
    },
    clickable: { true: '' },
    disabled: { true: { root: 'is-disabled' } },
    loading: { true: { content: 'text-muted' } },
  },

  compoundVariants: [
    { variant: 'outline', clickable: true, class: { root: 'active:outline-4' } },

    { color: 'primary', variant: ['plain', 'underline'], clickable: true, class: { root: 'hover:bg-primary-3 active:bg-primary-4' } },
    { color: 'secondary', variant: ['plain', 'underline'], clickable: true, class: { root: 'hover:bg-secondary-3 active:bg-secondary-4' } },
    { color: 'neutral', variant: ['plain', 'underline'], clickable: true, class: { root: 'hover:bg-neutral-3 active:bg-neutral-4' } },
    { color: 'info', variant: ['plain', 'underline'], clickable: true, class: { root: 'hover:bg-info-3 active:bg-info-4' } },
    { color: 'success', variant: ['plain', 'underline'], clickable: true, class: { root: 'hover:bg-success-3 active:bg-success-4' } },
    { color: 'warning', variant: ['plain', 'underline'], clickable: true, class: { root: 'hover:bg-warning-3 active:bg-warning-4' } },
    { color: 'danger', variant: ['plain', 'underline'], clickable: true, class: { root: 'hover:bg-danger-3 active:bg-danger-4' } },

    { color: 'primary', variant: 'outline', clickable: true, class: { root: 'hover:(b-primary-8 outline-3 outline-primary/5) active:b-primary/50' } },
    { color: 'secondary', variant: 'outline', clickable: true, class: { root: 'hover:(b-secondary-8 outline-3 outline-secondary/5) active:b-secondary' } },
    { color: 'neutral', variant: 'outline', clickable: true, class: { root: 'hover:(b-neutral-8 outline-3 outline-neutral/5) active:b-neutral' } },
    { color: 'info', variant: 'outline', clickable: true, class: { root: 'hover:(b-info-8 outline-3 outline-info/5) active:b-info' } },
    { color: 'success', variant: 'outline', clickable: true, class: { root: 'hover:(b-success-8 outline-3 outline-success/5) active:b-success' } },
    { color: 'warning', variant: 'outline', clickable: true, class: { root: 'hover:(b-warning-8 outline-3 outline-warning/5) active:b-warning' } },
    { color: 'danger', variant: 'outline', clickable: true, class: { root: 'hover:(b-danger-8 outline-3 outline-danger/5) active:b-danger' } },

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
