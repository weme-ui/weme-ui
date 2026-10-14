import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAutocompleteStyle = createVariants({
  slots: {
    root: 'group relative',
    anchor: 'rounded-inherit flex size-full flex-y-center',
    input: 'leading-none outline-none size-full',
    prefix: '',
    prefixIcon: '',
    suffix: '',
    suffixIcon: '',
    clearBtn: '',
    content: 'outline-none will-change-[height,transform,opacity] h-$reka-combobox-content-available-height w-$reka-combobox-trigger-width origin-$reka-combobox-content-transform-origin fixed z-high overflow-hidden',
    viewport: '',
    empty: '',
    emptyIcon: '',
    group: 'flex flex-col',
    label: '',
    item: 'group/item flex flex-y-center relative',
    itemIcon: '',
    itemLabel: '',
    itemIndicator: 'ml-auto',
    separator: 'pointer-events-none',
  },

  variants: {
    variant: { soft: {}, outline: {} },
    radius: { none: {}, xs: {}, sm: {}, md: {}, lg: {}, xl: {}, full: {} },
    size: { sm: {}, md: {}, lg: {} },
    disabled: {
      true: { root: 'is-disabled' },
    },
    loading: {
      true: { root: 'is-loading', suffixIcon: 'animate-spin' },
    },
    invalid: { true: {} },
    unstyled: {
      false: {
        input: 'placeholder:text-subtle',
        content: 'bg-base shadow-xs',
        label: 'text-subtle',
        item: 'data-[highlighted]:bg-muted',
        itemLabel: 'group-data-[highlighted]/item:font-medium',
        itemIcon: 'text-subtle group-data-[highlighted]/item:text-highlighted',
        itemIndicator: 'text-accent',
        clearBtn: 'p-0.5 rounded-full op-0 flex transition-[opacity,background-color] flex-center hover:bg-accent-3 group-data-[focused]:op-100',
        separator: 'my-1 b-b b-base',
      },
    },
  },

  compoundSlots: [
    { slots: ['root', 'prefix', 'suffix', 'item', 'itemIcon'], unstyled: false, class: 'transition-colors duration-200' },
    { slots: ['prefix', 'suffix'], invalid: false, class: 'group-data-[focused]:text-highlighted not-[[data-focused]]:text-subtle' },

    { slots: ['prefixIcon', 'suffixIcon', 'emptyIcon', 'itemIcon', 'itemIndicator', 'clearBtn'], class: 'shrink-0' },

    { slots: ['root', 'content', 'item'], radius: 'none', unstyled: false, class: 'rounded-none' },
    { slots: ['root', 'content', 'item'], radius: 'xs', unstyled: false, class: 'rounded-xs' },
    { slots: ['root', 'content', 'item'], radius: 'sm', unstyled: false, class: 'rounded-sm' },
    { slots: ['root', 'content', 'item'], radius: 'md', unstyled: false, class: 'rounded-md' },
    { slots: ['root', 'content', 'item'], radius: 'lg', unstyled: false, class: 'rounded-lg' },
    { slots: ['root', 'content', 'item'], radius: 'xl', unstyled: false, class: 'rounded-xl' },
  ],

  compoundVariants: [
    { variant: 'soft', unstyled: false, class: { root: 'b b-transparent bg-muted' } },
    { variant: 'outline', unstyled: false, class: { root: 'b b-base bg-base', content: 'b b-base' } },

    {
      variant: 'soft',
      invalid: false,
      unstyled: false,
      class: {
        root: 'bg-muted data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:bg-elevated',
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

    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'sm', unstyled: false, class: { anchor: 'px-1.5' } },
    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'md', unstyled: false, class: { anchor: 'px-2.5' } },
    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'lg', unstyled: false, class: { anchor: 'px-3' } },

    { radius: 'full', size: 'sm', unstyled: false, class: { anchor: 'px-2.25' } },
    { radius: 'full', size: 'md', unstyled: false, class: { anchor: 'px-3.5' } },
    { radius: 'full', size: 'lg', unstyled: false, class: { anchor: 'px-4' } },

    { radius: 'full', unstyled: false, class: { root: 'rounded-full', content: 'rounded-5', item: 'rounded-full' } },

    { size: 'sm', unstyled: false, class: { root: 'text-xs h-6', anchor: 'gap-xs', viewport: 'p-0.5', label: 'text-xs py-1.5 px-2.5', item: 'gap-xs text-xs py-1.5 px-2.5' } },
    { size: 'md', unstyled: false, class: { root: 'text-sm h-8', anchor: 'gap-sm', viewport: 'p-1', label: 'text-sm py-2.5 px-3.5', item: 'gap-sm text-sm py-2.5 px-3.5' } },
    { size: 'lg', unstyled: false, class: { root: 'text-base h-10', anchor: 'gap-md', viewport: 'p-1.5', label: 'text-base py-3 px-4', item: 'gap-md text-base py-3 px-4' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'md',
  },
})

export type AutocompleteStyleSlots = typeof useAutocompleteStyle['slots']
export type AutocompleteStyleProps = VariantProps<typeof useAutocompleteStyle>
