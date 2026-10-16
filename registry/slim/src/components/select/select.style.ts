import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSelectStyle = createVariants({
  slots: {
    trigger: 'group/trigger flex select-none flex-y-center relative focus-visible:outline-none',
    prefix: '',
    prefixIcon: '',
    value: 'leading-none text-left flex flex-1 text-nowrap flex-y-center',
    valueWrapper: 'flex flex-y-center',
    valueIcon: '',
    valueCount: '',
    suffix: 'ml-auto outline-none',
    suffixIcon: '',
    content: 'outline-none will-change-[height,transform,opacity] max-h-60 w-$reka-select-trigger-width origin-$reka-select-content-transform-origin fixed z-high overflow-hidden',
    viewport: 'flex flex-col relative',
    group: 'flex flex-col',
    groupLabel: '',
    item: 'group/item flex cursor-default select-none relative',
    itemIcon: '',
    itemContent: 'flex flex-col',
    itemLabel: '',
    itemDescription: '',
    itemIndicator: 'ml-auto',
    separator: 'pointer-events-none',
    scrollUp: '',
    scrollUpIcon: '',
    scrollDown: '',
    scrollDownIcon: '',
    clearBtn: '',
    empty: '',
  },

  variants: {
    variant: { soft: {}, outline: {} },
    size: {
      sm: { trigger: 'text-xs', content: 'text-xs' },
      md: { trigger: 'text-sm', content: 'text-sm' },
      lg: { trigger: 'text-base', content: 'text-base' },
    },
    radius: {
      none: { trigger: 'rounded-none', content: 'rounded-none', item: 'rounded-none' },
      xs: { trigger: 'rounded-xs', content: 'rounded-xs', item: 'rounded-xs' },
      sm: { trigger: 'rounded-sm', content: 'rounded-sm', item: 'rounded-xs' },
      md: { trigger: 'rounded-md', content: 'rounded-md', item: 'rounded-sm' },
      lg: { trigger: 'rounded-lg', content: 'rounded-lg', item: 'rounded-md' },
      xl: { trigger: 'rounded-xl', content: 'rounded-xl', item: 'rounded-lg' },
      full: { trigger: 'rounded-full', content: 'rounded-2xl', item: 'rounded-2xl' },
    },
    disabled: {
      true: { trigger: 'is-disabled' },
    },
    loading: {
      true: { trigger: 'is-loading', suffixIcon: 'animate-spin' },
    },
    unstyled: {
      false: {
        trigger: 'b',
        value: 'data-[placeholder]:text-subtle',
        content: 'bg-base shadow-xs',
        groupLabel: 'text-subtle',
        item: 'outline-none data-[highlighted]:bg-muted',
        itemLabel: 'group-data-[highlighted]/item:font-medium',
        itemIcon: 'text-subtle group-data-[highlighted]/item:text-highlighted',
        itemDescription: 'text-subtle',
        itemIndicator: 'text-accent',
        clearBtn: 'p-0.5 rounded-full op-0 flex transition-[opacity,background-color] flex-center hover:bg-accent-3 group-data-[state=open]/trigger:op-100',
        separator: 'my-1 b-b b-base',
      },
    },
    invalid: { false: {} },
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
    { slots: ['prefix', 'suffix', 'scrollUp', 'scrollDown'], class: 'flex flex-center' },
    { slots: ['prefixIcon', 'suffixIcon', 'itemIcon', 'itemIndicator', 'scrollUpIcon', 'scrollDownIcon'], class: 'shrink-0' },
    { slots: ['trigger', 'prefixIcon', 'suffixIcon', 'item', 'itemIcon', 'itemIndicator', 'scrollUpIcon', 'scrollDownIcon'], unstyled: false, class: 'transition-colors duration-200' },

    { slots: ['prefix', 'suffix'], invalid: false, class: 'group-data-[focused]:text-highlighted not-[[data-focused]]:text-subtle' },
  ],

  compoundVariants: [
    { variant: 'soft', unstyled: false, class: { trigger: 'b-transparent bg-muted' } },
    { variant: 'outline', unstyled: false, class: { trigger: 'b-base bg-base', content: 'b b-base' } },

    {
      variant: 'soft',
      invalid: false,
      unstyled: false,
      class: {
        trigger: 'bg-muted data-[state=open]:(bg-base b-accent outline-2 outline-accent-4) hover:bg-elevated',
      },
    },
    {
      variant: 'outline',
      invalid: false,
      unstyled: false,
      class: {
        trigger: 'data-[state=open]:(bg-base b-accent outline-2 outline-accent-4) hover:b-elevated',
      },
    },

    { invalid: true, unstyled: false, class: { root: 'b-error outline-2 outline-error-4' } },

    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'sm', unstyled: false, class: { trigger: 'px-1.5' } },
    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'md', unstyled: false, class: { trigger: 'px-2.5' } },
    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'lg', unstyled: false, class: { trigger: 'px-3' } },

    { radius: 'full', size: 'sm', unstyled: false, class: { trigger: 'px-2.25' } },
    { radius: 'full', size: 'md', unstyled: false, class: { trigger: 'px-3.5' } },
    { radius: 'full', size: 'lg', unstyled: false, class: { trigger: 'px-4' } },

    { radius: 'full', unstyled: false, class: { trigger: 'rounded-full', content: 'rounded-5', item: 'rounded-4', valueCount: 'rounded-full' } },

    {
      size: 'sm',
      unstyled: false,
      class: {
        trigger: 'text-xs h-6 gap-xs',
        value: 'gap-xs',
        valueWrapper: 'gap-xs -me-1.25',
        valueCount: 'ml-2 text-xs py-0.25 px-1.5',
        group: 'p-0.5',
        groupLabel: 'text-xs py-1 px-2.5',
        itemDescription: 'text-xs',
        item: 'gap-xs text-xs py-1.5 px-2.5',
      },
    },
    {
      size: 'md',
      unstyled: false,
      class: {
        trigger: 'text-sm h-8 gap-sm',
        value: 'gap-sm',
        valueWrapper: 'gap-sm -me-1.5',
        valueCount: 'ml-4 text-xs py-0.5 px-1.5',
        group: 'p-1',
        groupLabel: 'text-xs py-1.5 px-3.5',
        itemDescription: 'text-xs',
        item: 'gap-sm text-sm py-2 px-3.5',
      },
    },
    {
      size: 'lg',
      unstyled: false,
      class: {
        trigger: 'text-base h-10 gap-sm',
        value: 'gap-sm',
        valueWrapper: 'gap-sm -me-2',
        valueCount: 'ml-4 text-xs py-0.5 px-1.5',
        group: 'p-1.5',
        groupLabel: 'text-sm py-2 px-4',
        itemDescription: 'text-sm',
        item: 'gap-md text-base py-2.5 px-4',
      },
    },

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

export type SelectStyleSlots = typeof useSelectStyle['slots']
export type SelectStyleProps = VariantProps<typeof useSelectStyle>
