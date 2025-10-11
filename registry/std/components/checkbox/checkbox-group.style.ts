import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCheckboxGroupStyle = createVariants({
  slots: {
    base: 'relative flex',
    item: '',
    leading: '',
    trailing: '',
    label: '',
    description: '',
    indicator: '',
  },

  variants: {
    variant: {
      normal: '',
      card: { item: 'b-(~ default)' },
      table: { item: 'b-(~ default) state-checked:z-1' },
    },
    orientation: {
      vertical: 'flex-col',
      horizontal: 'flex-row',
    },
    size: { sm: '', md: '', lg: '', xl: '' },
  },

  compoundVariants: [
    { variant: 'card', radius: 'xs', class: { item: 'rounded-xs' } },
    { variant: 'card', radius: 'sm', class: { item: 'rounded-sm' } },
    { variant: 'card', radius: 'md', class: { item: 'rounded-md' } },
    { variant: 'card', radius: 'lg', class: { item: 'rounded-lg' } },
    { variant: 'card', radius: 'xl', class: { item: 'rounded-xl' } },

    { variant: 'card', color: 'accent', class: { item: 'state-checked:(ring-2 ring-accent-4)' } },
    { variant: 'card', color: 'neutral', class: { item: 'state-checked:(ring-2 ring-neutral-4)' } },
    { variant: 'card', color: 'info', class: { item: 'state-checked:(ring-2 ring-info-4)' } },
    { variant: 'card', color: 'success', class: { item: 'state-checked:(ring-2 ring-success-4)' } },
    { variant: 'card', color: 'warning', class: { item: 'state-checked:(ring-2 ring-warning-4)' } },
    { variant: 'card', color: 'error', class: { item: 'state-checked:(ring-2 ring-error-4)' } },

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

    { variant: ['normal', 'card'], size: 'sm', class: { base: 'gap-2.5' } },
    { variant: ['normal', 'card'], size: 'md', class: { base: 'gap-3' } },
    { variant: ['normal', 'card'], size: 'lg', class: { base: 'gap-4' } },
    { variant: ['normal', 'card'], size: 'xl', class: { base: 'gap-5' } },

    { variant: ['card', 'table'], size: 'sm', class: { item: 'px-3 py-2.5' } },
    { variant: ['card', 'table'], size: 'md', class: { item: 'px-4 py-3' } },
    { variant: ['card', 'table'], size: 'lg', class: { item: 'px-5 py-4' } },
    { variant: ['card', 'table'], size: 'xl', class: { item: 'px-6 py-5' } },

    { variant: ['card', 'table'], color: 'accent', class: { item: 'state-checked:b-accent hover:state-unchecked:bg-accent-3' } },
    { variant: ['card', 'table'], color: 'neutral', class: { item: 'state-checked:b-neutral hover:state-unchecked:bg-neutral-3' } },
    { variant: ['card', 'table'], color: 'info', class: { item: 'state-checked:b-info hover:state-unchecked:bg-info-3' } },
    { variant: ['card', 'table'], color: 'success', class: { item: 'state-checked:b-success hover:state-unchecked:bg-success-3' } },
    { variant: ['card', 'table'], color: 'warning', class: { item: 'state-checked:b-warning hover:state-unchecked:bg-warning-3' } },
    { variant: ['card', 'table'], color: 'error', class: { item: 'state-checked:b-error hover:state-unchecked:bg-error-3' } },
  ],

  defaultVariants: {
    variant: 'normal',
    orientation: 'vertical',
    size: 'md',
  },
})

export type CheckboxGroupStyleSlots = typeof useCheckboxGroupStyle['slots']
export type CheckboxGroupStyleProps = VariantProps<typeof useCheckboxGroupStyle>
