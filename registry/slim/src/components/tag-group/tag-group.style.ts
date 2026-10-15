import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTagGroupStyle = createVariants({
  slots: {
    root: 'flex flex-wrap relative',
    item: 'flex select-none flex-center data-[disabled]:is-disabled',
    itemIcon: '',
    itemText: 'leading-none align-middle text-nowrap',
    itemDelete: 'p-0.25 rounded-inherit flex flex-center',
    itemDeleteIcon: '',
  },

  variants: {
    variant: { soft: {}, outline: {}, inverted: {} },
    radius: { none: {}, xs: {}, sm: {}, md: {}, lg: {}, xl: {}, full: {} },
    size: { sm: {}, md: {}, lg: {} },
    disabled: {
      true: { root: 'is-disabled' },
    },
    selectable: { true: {} },
    unstyled: { false: {} },
  },

  compoundSlots: [
    { slots: ['itemIcon', 'itemDeleteIcon'], class: 'shrink-0' },

    { slots: ['item', 'itemDelete'], unstyled: false, class: 'transition-colors duration-200' },
    { slots: ['item', 'itemDelete'], selectable: true, unstyled: false, class: 'transition-[color,background-color,transform] duration-200 ease-out aria-[pressed=true]:scale-97' },

    { slots: ['item', 'itemDelete'], radius: 'none', unstyled: false, class: 'rounded-none' },
    { slots: ['item', 'itemDelete'], radius: 'xs', unstyled: false, class: 'rounded-xs' },
    { slots: ['item', 'itemDelete'], radius: 'sm', unstyled: false, class: 'rounded-sm' },
    { slots: ['item', 'itemDelete'], radius: 'md', unstyled: false, class: 'rounded-md' },
    { slots: ['item', 'itemDelete'], radius: 'lg', unstyled: false, class: 'rounded-lg' },
    { slots: ['item', 'itemDelete'], radius: 'xl', unstyled: false, class: 'rounded-xl' },
    { slots: ['item', 'itemDelete'], radius: 'full', unstyled: false, class: 'rounded-full' },
  ],

  compoundVariants: [
    { variant: 'soft', unstyled: false, class: { item: 'bg-muted text-foreground' } },
    { variant: 'outline', unstyled: false, class: { item: 'b b-base bg-base' } },
    { variant: 'inverted', unstyled: false, class: { item: 'bg-inverted text-inverted' } },

    {
      variant: ['soft', 'outline'],
      unstyled: false,
      class: {
        itemDelete: 'b b-base hover:(bg-elevated text-highlighted b-elevated)',
      },
    },
    {
      variant: ['soft', 'outline'],
      selectable: true,
      unstyled: false,
      class: {
        item: 'hover:data-[state=unchecked]:(bg-elevated text-highlighted)',
      },
    },

    {
      variant: 'soft',
      selectable: true,
      unstyled: false,
      class: {
        item: 'data-[state=checked]:(bg-accent-3 font-medium text-accent)',
      },
    },
    {
      variant: 'outline',
      selectable: true,
      unstyled: false,
      class: {
        item: 'data-[state=checked]:(bg-accent-3 font-medium text-accent b-accent) hover:data-[state=unchecked]:b-elevated',
      },
    },
    {
      variant: 'inverted',
      selectable: true,
      unstyled: false,
      class: {
        item: 'data-[state=checked]:(bg-accent font-medium text-accent-1) hover:data-[state=unchecked]:bg-inverted/60',
      },
    },

    {
      variant: 'inverted',
      unstyled: false,
      class: {
        itemDelete: 'hover:(bg-elevated text-highlighted)',
      },
    },

    { size: 'sm', unstyled: false, class: { root: 'gap-xs', item: 'h-4 text-xs gap-xs px-1.5' } },
    { size: 'md', unstyled: false, class: { root: 'gap-sm', item: 'h-6 text-sm gap-sm px-2.5', itemDelete: '-mr-1.5' } },
    { size: 'lg', unstyled: false, class: { root: 'gap-md', item: 'h-8 text-base gap-md px-3' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'md',
  },
})

export type TagGroupStyleSlots = typeof useTagGroupStyle['slots']
export type TagGroupStyleProps = VariantProps<typeof useTagGroupStyle>
