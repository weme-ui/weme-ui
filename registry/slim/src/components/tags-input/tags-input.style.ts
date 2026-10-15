import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTagsInputStyle = createVariants({
  slots: {
    root: 'group flex flex-wrap transition-colors duration-200 flex-y-center relative',
    prefix: '',
    prefixIcon: '',
    item: 'rounded-inherit flex select-none flex-center',
    itemIcon: '',
    itemText: 'leading-none align-middle text-nowrap',
    itemDelete: '',
    input: 'leading-none outline-none w-fit',
    clear: 'ml-auto p-0.5 rounded-inherit flex flex-center',
  },

  variants: {
    variant: { soft: {}, outline: {} },
    radius: {
      none: { root: 'rounded-none' },
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    size: {
      sm: { root: 'text-xs p-1 gap-1 min-h-4', prefix: 'px-0.5', item: 'text-xs px-1 gap-1 h-4', itemDelete: 'p-0.25 -mr-1', input: 'h-4' },
      md: { root: 'text-sm p-1.25 gap-1.25 min-h-6', prefix: 'px-0.75', item: 'text-sm px-2 gap-1 h-5', itemDelete: 'p-0.25 -mr-1.25', input: 'h-5' },
      lg: { root: 'text-base p-1.5 gap-1.5 min-h-7', prefix: 'px-1', item: 'text-base px-3 gap-sm h-6.5', itemDelete: 'p-0.5 -mr-1.5', input: 'h-6.5' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    invalid: { true: {} },
    hasPrefix: { true: {} },
    unstyled: {
      false: {
        input: 'placeholder:text-subtle',
        item: 'font-medium group-data-[focused]:(text-accent bg-accent-3) group-not-[[data-focused]]:bg-elevated group-not-[[data-focused]]:group-hover:bg-muted',
        itemDelete: 'rounded-inherit hover:(text-highlighted b-elevated bg-accent-5)',
        clear: 'op-0 transition-[opacity,background-color] duration-200 hover:bg-accent-3 group-data-[focused]:op-100',
      },
    },
  },

  compoundSlots: [
    { slots: ['prefixIcon', 'itemIcon'], class: 'shrink-0' },
    { slots: ['root', 'prefix', 'item', 'itemDelete', 'clear'], unstyled: false, class: 'transition-colors duration-200' },

  ],

  compoundVariants: [
    { invalid: false, class: { prefix: 'group-data-[focused]:text-highlighted group-not-[[data-focused]]:text-subtle' } },

    { variant: ['soft', 'outline'], unstyled: false, class: { root: 'b' } },

    { variant: 'soft', unstyled: false, class: { root: 'b-transparent bg-muted' } },
    { variant: 'outline', unstyled: false, class: { root: 'b-base bg-base' } },

    {
      variant: 'soft',
      invalid: false,
      unstyled: false,
      class: {
        root: 'data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:bg-elevated',
      },
    },
    {
      variant: 'outline',
      invalid: false,
      unstyled: false,
      class: {
        root: 'data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:b-elevated',
      },
    },

    { invalid: true, unstyled: false, class: { root: 'b-error outline-2 outline-error-4' } },

    { size: 'sm', hasPrefix: false, class: { input: 'pl-1' } },
    { size: 'md', hasPrefix: false, class: { input: 'pl-1.25' } },
    { size: 'lg', hasPrefix: false, class: { input: 'pl-1.5' } },
  ],

  defaultVariants: {
    variant: 'soft',
    radius: 'md',
    size: 'md',
  },
})

export type TagsInputStyleSlots = typeof useTagsInputStyle['slots']
export type TagsInputStyleProps = VariantProps<typeof useTagsInputStyle>
