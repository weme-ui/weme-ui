import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useRadioGroupStyle = createVariants({
  slots: {
    base: 'flex',
    item: 'group flex-(~ y-center) outline-none',
    leading: '',
    trailing: '',
    wrapper: 'flex-(~ 1 col) text-left',
    label: 'text-highlighted leading-none group-state-checked:font-semibold',
    description: 'text-toned group-state-checked:text-highlighted',
    indicatorWrapper: 'flex-(~ center) bg-elevated rounded-full',
    indicator: [
      'relative rounded-full transition-transform animate-scale-in-big',
      'after:(block content-[""] rounded-full size-full shadow-md)',
    ],
  },

  variants: {
    color: {
      accent: { indicatorWrapper: 'group-state-checked:bg-accent', indicator: 'bg-accent-1' },
      neutral: { indicatorWrapper: 'group-state-checked:bg-neutral', indicator: 'bg-neutral-1' },
      info: { indicatorWrapper: 'group-state-checked:bg-info', indicator: 'bg-info-1' },
      success: { indicatorWrapper: 'group-state-checked:bg-success', indicator: 'bg-success-1' },
      warning: { indicatorWrapper: 'group-state-checked:bg-warning', indicator: 'bg-warning-1' },
      error: { indicatorWrapper: 'group-state-checked:bg-error', indicator: 'bg-error-1' },
    },
    variant: {
      normal: '',
      card: { item: 'b-(~ default)' },
      table: { item: 'b-(~ default) state-checked:z-1' },
      capsule: { base: 'bg-elevated p-1', item: 'state-checked:shadow-sm' },
    },
    orientation: { vertical: 'flex-col', horizontal: 'flex-row' },
    align: {
      start: {
        item: 'items-start',
      },
      center: {
        item: 'items-center',
      },
      end: {
        item: 'items-end',
      },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '' },
    size: {
      sm: { indicatorWrapper: 'size-3', indicator: 'size-1.5', wrapper: 'gap-1', description: 'text-xs' },
      md: { indicatorWrapper: 'size-4', indicator: 'size-2', wrapper: 'gap-1', description: 'text-sm' },
      lg: { indicatorWrapper: 'size-5', indicator: 'size-2.5', wrapper: 'gap-1.5', description: 'text-base' },
      xl: { indicatorWrapper: 'size-6', indicator: 'size-3', wrapper: 'gap-1.5', description: 'text-base' },
    },
    fill: {
      true: { item: 'flex-1' },
    },
  },

  compoundSlots: [
    { slots: ['leading', 'trailing', 'item', 'label', 'description', 'indicatorWrapper'], class: 'transition-colors' },

    { color: 'accent', slots: ['leading', 'trailing'], class: 'group-state-checked:c-accent' },
    { color: 'neutral', slots: ['leading', 'trailing'], class: 'group-state-checked:c-neutral' },
    { color: 'info', slots: ['leading', 'trailing'], class: 'group-state-checked:c-info' },
    { color: 'success', slots: ['leading', 'trailing'], class: 'group-state-checked:c-success' },
    { color: 'warning', slots: ['leading', 'trailing'], class: 'group-state-checked:c-warning' },
    { color: 'error', slots: ['leading', 'trailing'], class: 'group-state-checked:c-error' },

    { size: 'sm', variant: ['normal', 'card', 'capsule'], slots: ['base', 'item'], class: 'gap-2.5' },
    { size: 'md', variant: ['normal', 'card', 'capsule'], slots: ['base', 'item'], class: 'gap-3' },
    { size: 'lg', variant: ['normal', 'card', 'capsule'], slots: ['base', 'item'], class: 'gap-4' },
    { size: 'xl', variant: ['normal', 'card', 'capsule'], slots: ['base', 'item'], class: 'gap-5' },

    { size: 'sm', variant: 'table', slots: ['item'], class: 'gap-2.5' },
    { size: 'md', variant: 'table', slots: ['item'], class: 'gap-3' },
    { size: 'lg', variant: 'table', slots: ['item'], class: 'gap-4' },
    { size: 'xl', variant: 'table', slots: ['item'], class: 'gap-5' },

    { size: 'sm', slots: ['leading', 'trailing', 'wrapper'], class: 'text-sm' },
    { size: 'md', slots: ['leading', 'trailing', 'wrapper'], class: 'text-base' },
    { size: 'lg', slots: ['leading', 'trailing', 'wrapper'], class: 'text-lg' },
    { size: 'xl', slots: ['leading', 'trailing', 'wrapper'], class: 'text-xl' },
  ],

  compoundVariants: [
    { variant: 'card', radius: 'xs', class: { item: 'rounded-xs' } },
    { variant: 'card', radius: 'sm', class: { item: 'rounded-sm' } },
    { variant: 'card', radius: 'md', class: { item: 'rounded-md' } },
    { variant: 'card', radius: 'lg', class: { item: 'rounded-lg' } },
    { variant: 'card', radius: 'xl', class: { item: 'rounded-xl' } },

    { variant: 'capsule', radius: 'xs', class: { item: 'rounded-xs' } },
    { variant: 'capsule', radius: 'sm', class: { item: 'rounded-xs' } },
    { variant: 'capsule', radius: 'md', class: { item: 'rounded-sm' } },
    { variant: 'capsule', radius: 'lg', class: { item: 'rounded-md' } },
    { variant: 'capsule', radius: 'xl', class: { item: 'rounded-lg' } },

    { variant: 'table', orientation: 'horizontal', class: { base: 'space-x-[-1px]' } },
    { variant: 'table', orientation: 'vertical', class: { base: 'space-y-[-1px]' } },

    { variant: 'table', orientation: 'vertical', radius: 'xs', class: { item: 'first:rounded-t-xs last:rounded-b-xs' } },
    { variant: 'table', orientation: 'vertical', radius: 'sm', class: { item: 'first:rounded-t-sm last:rounded-b-sm' } },
    { variant: 'table', orientation: 'vertical', radius: 'md', class: { item: 'first:rounded-t-md last:rounded-b-md' } },
    { variant: 'table', orientation: 'vertical', radius: 'lg', class: { item: 'first:rounded-t-lg last:rounded-b-lg' } },
    { variant: 'table', orientation: 'vertical', radius: 'xl', class: { item: 'first:rounded-t-xl last:rounded-b-xl' } },
    { variant: 'table', orientation: 'horizontal', radius: 'xs', class: { item: 'first:rounded-l-xs last:rounded-r-xs' } },
    { variant: 'table', orientation: 'horizontal', radius: 'sm', class: { item: 'first:rounded-l-sm last:rounded-r-sm' } },
    { variant: 'table', orientation: 'horizontal', radius: 'md', class: { item: 'first:rounded-l-md last:rounded-r-md' } },
    { variant: 'table', orientation: 'horizontal', radius: 'lg', class: { item: 'first:rounded-l-lg last:rounded-r-lg' } },
    { variant: 'table', orientation: 'horizontal', radius: 'xl', class: { item: 'first:rounded-l-xl last:rounded-r-xl' } },

    { variant: 'capsule', color: 'accent', class: { item: 'state-checked:bg-accent-1' } },
    { variant: 'capsule', color: 'neutral', class: { item: 'state-checked:bg-neutral-1' } },
    { variant: 'capsule', color: 'info', class: { item: 'state-checked:bg-info-1' } },
    { variant: 'capsule', color: 'success', class: { item: 'state-checked:bg-success-1' } },
    { variant: 'capsule', color: 'warning', class: { item: 'state-checked:bg-warning-1' } },
    { variant: 'capsule', color: 'error', class: { item: 'state-checked:bg-error-1' } },

    { variant: ['card', 'table'], color: 'accent', class: { item: 'state-checked:(b-accent ring-2 ring-accent-4)' } },
    { variant: ['card', 'table'], color: 'neutral', class: { item: 'state-checked:(b-neutral ring-2 ring-neutral-4)' } },
    { variant: ['card', 'table'], color: 'info', class: { item: 'state-checked:(b-info ring-2 ring-info-4)' } },
    { variant: ['card', 'table'], color: 'success', class: { item: 'state-checked:(b-success ring-2 ring-success-4)' } },
    { variant: ['card', 'table'], color: 'warning', class: { item: 'state-checked:(b-warning ring-2 ring-warning-4)' } },
    { variant: ['card', 'table'], color: 'error', class: { item: 'state-checked:(b-error ring-2 ring-error-4)' } },

    { variant: ['card', 'table', 'capsule'], size: 'sm', class: { item: 'px-3 py-2.5' } },
    { variant: ['card', 'table', 'capsule'], size: 'md', class: { item: 'px-4 py-3' } },
    { variant: ['card', 'table', 'capsule'], size: 'lg', class: { item: 'px-5 py-4' } },
    { variant: ['card', 'table', 'capsule'], size: 'xl', class: { item: 'px-6 py-5' } },

    { variant: ['table', 'capsule'], radius: 'xs', class: { base: 'rounded-xs' } },
    { variant: ['table', 'capsule'], radius: 'sm', class: { base: 'rounded-sm' } },
    { variant: ['table', 'capsule'], radius: 'md', class: { base: 'rounded-md' } },
    { variant: ['table', 'capsule'], radius: 'lg', class: { base: 'rounded-lg' } },
    { variant: ['table', 'capsule'], radius: 'xl', class: { base: 'rounded-xl' } },

  ],

  defaultVariants: {
    color: 'accent',
    variant: 'normal',
    orientation: 'vertical',
    align: 'start',
    radius: 'sm',
    size: 'md',
  },
})

export type RadioGroupStyleSlots = typeof useRadioGroupStyle['slots']
export type RadioGroupStyleProps = VariantProps<typeof useRadioGroupStyle>
