import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useListboxStyle = createVariants({
  slots: {
    root: 'flex flex-col relative',
    filter: 'relative',
    filterIcon: '',
    filterInput: 'leading-none outline-none size-full',
    content: 'flex flex-col select-none',
    group: '',
    groupLabel: '',
    item: 'flex cursor-default focus:outline-none',
    itemIcon: '',
    itemContent: 'flex-1',
    itemLabel: '',
    itemDescription: '',
    itemIndicator: 'ml-auto',
    separator: 'pointer-events-none',
    empty: '',
  },

  variants: {
    variant: { soft: {}, outline: {} },
    size: {
      sm: { root: 'text-xs gap-xs', filter: 'gap-xs h-6', content: 'p-xs gap-xs', item: 'px-sm py-xs gap-xs', itemDescription: 'text-xs' },
      md: { root: 'text-sm gap-sm', filter: 'gap-sm h-8', content: 'p-sm gap-sm', item: 'px-md py-sm gap-sm', itemDescription: 'text-xs' },
      lg: { root: 'text-base gap-md', filter: 'gap-md h-10', content: 'p-md gap-md', item: 'px-lg py-md gap-md', itemDescription: 'text-sm' },
    },
    radius: {
      none: { filter: 'rounded-none', content: 'rounded-none', item: 'rounded-none' },
      xs: { filter: 'rounded-xs', content: 'rounded-xs', item: 'rounded-xs' },
      sm: { filter: 'rounded-sm', content: 'rounded-sm', item: 'rounded-sm' },
      md: { filter: 'rounded-md', content: 'rounded-md', item: 'rounded-md' },
      lg: { filter: 'rounded-lg', content: 'rounded-lg', item: 'rounded-lg' },
      xl: { filter: 'rounded-xl', content: 'rounded-xl', item: 'rounded-xl' },
      full: { filter: 'rounded-full', content: 'rounded-2xl', item: 'rounded-2xl' },
    },
    orientation: {
      vertical: {
        group: 'flex flex-col',
      },
      horizontal: {
        group: 'flex flex-wrap gap-y-xs',
        item: 'flex-1/4',
      },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    invalid: { true: {} },
    unstyled: {
      false: {
        filter: 'group/filter b',
        filterInput: 'placeholder:text-subtle',
        filterIcon: 'group-data-[focused]/filter:text-highlighted group-not-[[data-focused]]/filter:text-subtle',
        content: 'b',
        groupLabel: 'text-xs text-muted py-sm',
        item: 'b b-transparent data-[highlighted]:not-[[data-state=checked]]:b-elevated',
        itemLabel: 'font-medium group-data-[highlighted]/item:font-medium',
        itemIcon: 'text-subtle group-data-[highlighted]/item:text-highlighted',
        itemDescription: 'text-subtle',
      },
    },
    hasDescription: {
      true: {
        itemContent: 'pr-2 flex flex-col',
      },
      false: {
        item: 'flex-y-center',
      },
    },
  },

  compoundSlots: [
    { slots: ['filter', 'filterIcon', 'item', 'itemIcon'], unstyled: false, class: 'transition-colors duration-200' },
  ],

  compoundVariants: [
    { variant: 'soft', unstyled: false, class: { filter: 'b-transparent bg-muted', content: 'b-transparent bg-muted' } },
    { variant: 'outline', unstyled: false, class: { filter: 'b-base bg-base', content: 'b-base bg-base' } },

    {
      variant: 'soft',
      invalid: false,
      unstyled: false,
      class: {
        filter: 'data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:bg-elevated',
        item: 'data-[state=checked]:bg-elevated',
      },
    },
    {
      variant: 'outline',
      invalid: false,
      unstyled: false,
      class: {
        filter: 'data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:b-elevated',
        item: 'data-[state=checked]:b-base data-[state=checked]:bg-muted ',
      },
    },

    { invalid: true, unstyled: false, class: { filter: 'b-error outline-2 outline-error-4' } },

    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'sm', unstyled: false, class: { filter: 'px-1.5' } },
    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'md', unstyled: false, class: { filter: 'px-2.5' } },
    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'lg', unstyled: false, class: { filter: 'px-3' } },

    { radius: 'full', size: 'sm', unstyled: false, class: { filter: 'px-2.25' } },
    { radius: 'full', size: 'md', unstyled: false, class: { filter: 'px-3.5' } },
    { radius: 'full', size: 'lg', unstyled: false, class: { filter: 'px-4' } },

    { size: 'sm', hasDescription: true, unstyled: false, class: { itemIcon: 'mt-0.5' } },
    { size: 'md', hasDescription: true, unstyled: false, class: { itemIcon: 'mt-0.75' } },
    { size: 'lg', hasDescription: true, unstyled: false, class: { itemIcon: 'mt-1' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'md',
  },
})

export type ListboxStyleSlots = typeof useListboxStyle['slots']
export type ListboxStyleProps = VariantProps<typeof useListboxStyle>
