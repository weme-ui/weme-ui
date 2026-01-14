import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useRadioGroupStyle = createVariants({
  slots: {
    root: 'relative flex data-[disabled]:is-disabled',
    item: 'flex-(~ y-center) transition-colors data-[disabled]:is-disabled',
    indicatorWrapper: 'flex-(~ center) rounded-full bg-muted transition-colors hover:state-unchecked:bg-elevated',
    indicator: 'relative rounded-inherit bg-neutral-1 shadow-sm transition-transform animate-scale-in-big',
    wrapper: 'flex-(~ 1 col) text-highlighted items-start',
    label: 'leading-none state-checked:font-medium',
    description: 'text-toned leading-none state-checked:text-default',
    leading: '',
    trailing: '',
  },

  variants: {
    color: {
      primary: { indicatorWrapper: 'state-checked:bg-primary' },
      secondary: { indicatorWrapper: 'state-checked:bg-secondary' },
      neutral: { indicatorWrapper: 'state-checked:bg-neutral' },
      info: { indicatorWrapper: 'state-checked:bg-info' },
      success: { indicatorWrapper: 'state-checked:bg-success' },
      warning: { indicatorWrapper: 'state-checked:bg-warning' },
      danger: { indicatorWrapper: 'state-checked:bg-danger' },
    },
    variant: {
      list: {
        item: 'focus-visible:b-(b dashed default) focus-visible:outline-none',
      },
      card: {
        item: 'bg-neutral-1 b-(~ default) hover:state-unchecked:b-elevated',
      },
      table: {
        root: 'bg-neutral-1 b-(~ default)',
        item: 'flex-1 overflow-hidden focus-visible:z-1',
      },
    },
    orientation: {
      horizontal: { root: 'flex-row' },
      vertical: { root: 'flex-col' },
    },
    align: {
      start: { item: 'items-start' },
      center: { item: 'items-center' },
      end: { item: 'items-end' },
    },
    size: {
      xs: { item: 'gap-2', indicatorWrapper: 'size-3', indicator: 'size-1.5', wrapper: 'gap-0.5', label: 'text-3 h-3', description: 'text-xs' },
      sm: { item: 'gap-2.5', indicatorWrapper: 'size-3.5', indicator: 'size-1.75', wrapper: 'gap-0.5', label: 'text-3 h-3.5', description: 'text-xs' },
      md: { item: 'gap-3', indicatorWrapper: 'size-4', indicator: 'size-2', wrapper: 'gap-1', label: 'text-3.5 h-4', description: 'text-xs' },
      lg: { item: 'gap-3.5', indicatorWrapper: 'size-4.5', indicator: 'size-2.25', wrapper: 'gap-1', label: 'text-4 h-4.5', description: 'text-sm' },
      xl: { item: 'gap-4', indicatorWrapper: 'size-5', indicator: 'size-2.5', wrapper: 'gap-1', label: 'text-4 h-5', description: 'text-sm' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
  },

  compoundVariants: [
    { variant: 'list', size: 'xs', class: { root: 'gap-2' } },
    { variant: 'list', size: 'sm', class: { root: 'gap-3' } },
    { variant: 'list', size: 'md', class: { root: 'gap-4' } },
    { variant: 'list', size: 'lg', class: { root: 'gap-5' } },
    { variant: 'list', size: 'xl', class: { root: 'gap-6' } },

    { variant: 'card', size: 'xs', class: { root: 'gap-2', item: 'p-2' } },
    { variant: 'card', size: 'sm', class: { root: 'gap-2.5', item: 'p-2.5' } },
    { variant: 'card', size: 'md', class: { root: 'gap-3', item: 'p-3' } },
    { variant: 'card', size: 'lg', class: { root: 'gap-3', item: 'p-3.5' } },
    { variant: 'card', size: 'xl', class: { root: 'gap-4', item: 'p-4' } },

    { variant: 'card', radius: 'xs', class: { item: 'rounded-xs' } },
    { variant: 'card', radius: 'sm', class: { item: 'rounded-sm' } },
    { variant: 'card', radius: 'md', class: { item: 'rounded-md' } },
    { variant: 'card', radius: 'lg', class: { item: 'rounded-lg' } },
    { variant: 'card', radius: 'xl', class: { item: 'rounded-xl' } },
    { variant: 'card', radius: 'full', class: { item: 'rounded-2xl' } },

    { variant: 'card', color: 'primary', class: { item: 'state-checked:b-primary focus-visible:outline-primary' } },
    { variant: 'card', color: 'secondary', class: { item: 'state-checked:b-secondary focus-visible:outline-secondary' } },
    { variant: 'card', color: 'neutral', class: { item: 'state-checked:b-neutral focus-visible:outline-neutral' } },
    { variant: 'card', color: 'info', class: { item: 'state-checked:b-info focus-visible:outline-info' } },
    { variant: 'card', color: 'success', class: { item: 'state-checked:b-success focus-visible:outline-success' } },
    { variant: 'card', color: 'warning', class: { item: 'state-checked:b-warning focus-visible:outline-warning' } },
    { variant: 'card', color: 'danger', class: { item: 'state-checked:b-danger focus-visible:outline-danger' } },

    { variant: 'table', orientation: 'horizontal', class: { root: 'divide-(x default)' } },
    { variant: 'table', orientation: 'vertical', class: { root: 'divide-(y default)' } },

    { variant: 'table', radius: 'xs', class: { root: 'rounded-xs' } },
    { variant: 'table', radius: 'sm', class: { root: 'rounded-sm' } },
    { variant: 'table', radius: 'md', class: { root: 'rounded-md' } },
    { variant: 'table', radius: 'lg', class: { root: 'rounded-lg' } },
    { variant: 'table', radius: 'xl', class: { root: 'rounded-xl' } },
    { variant: 'table', radius: 'full', class: { root: 'rounded-2xl' } },

    { variant: 'table', size: 'xs', class: { item: 'p-2' } },
    { variant: 'table', size: 'sm', class: { item: 'p-2.5' } },
    { variant: 'table', size: 'md', class: { item: 'p-3' } },
    { variant: 'table', size: 'lg', class: { item: 'p-3.5' } },
    { variant: 'table', size: 'xl', class: { item: 'p-4' } },

    { variant: 'table', color: 'primary', class: { item: 'state-checked:bg-primary-2' } },
    { variant: 'table', color: 'secondary', class: { item: 'state-checked:bg-secondary-2' } },
    { variant: 'table', color: 'neutral', class: { item: 'state-checked:bg-neutral-2' } },
    { variant: 'table', color: 'info', class: { item: 'state-checked:bg-info-2' } },
    { variant: 'table', color: 'success', class: { item: 'state-checked:bg-success-2' } },
    { variant: 'table', color: 'warning', class: { item: 'state-checked:bg-warning-2' } },
    { variant: 'table', color: 'danger', class: { item: 'state-checked:bg-danger-2' } },

    { variant: ['card', 'table'], color: 'primary', class: { item: 'focus-visible:outline-primary' } },
    { variant: ['card', 'table'], color: 'secondary', class: { item: 'focus-visible:outline-secondary' } },
    { variant: ['card', 'table'], color: 'neutral', class: { item: 'focus-visible:outline-neutral' } },
    { variant: ['card', 'table'], color: 'info', class: { item: 'focus-visible:outline-info' } },
    { variant: ['card', 'table'], color: 'success', class: { item: 'focus-visible:outline-success' } },
    { variant: ['card', 'table'], color: 'warning', class: { item: 'focus-visible:outline-warning' } },
    { variant: ['card', 'table'], color: 'danger', class: { item: 'focus-visible:outline-danger' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'list',
    orientation: 'vertical',
    align: 'start',
    size: 'md',
    radius: 'sm',
  },
})

export type RadioGroupStyleSlots = typeof useRadioGroupStyle['slots']
export type RadioGroupStyleProps = VariantProps<typeof useRadioGroupStyle>
