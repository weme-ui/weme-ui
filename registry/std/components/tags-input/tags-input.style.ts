import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTagsInputStyle = createVariants({
  slots: {
    root: 'relative flex-(~ y-center wrap) w-full transition-colors',
    item: 'flex-(~ center) transition-colors cursor-default focus-visible:outline-none',
    itemText: 'text-highlighted leading-none font-medium',
    itemDelete: 'flex-(~ center)',
    icon: '',
    input: 'flex-1 size-full caret-primary leading-none transition-colors focus-visible:outline-none',
    clear: 'flex-(~ center) transition-colors hover:text-highlighted',
  },

  variants: {
    variant: { soft: '', outline: '', line: '', none: '' },
    size: {
      xs: { root: 'h-5 text-2.5 gap-0.5 p-0.5', icon: 'mx-0.5 text-2.5', item: 'h-3.5 gap-0.5 pl-1 pr-0.75', input: 'ml-0.75', clear: 'mr-0.75' },
      sm: { root: 'h-6 text-2.5 gap-1 p-0.75', icon: 'mx-1 text-3', item: 'h-4 gap-0.75 pl-1.5 pr-1', input: 'ml-0.75', clear: 'mr-0.75' },
      md: { root: 'h-8 text-3 gap-1 p-1', icon: 'mx-1 text-3', item: 'h-5.5 gap-1 pl-2 pr-1.5', input: 'ml-1', clear: 'mr-1' },
      lg: { root: 'h-10 text-3.5 gap-1.75 p-1.5', icon: 'mx-1.5 text-3.5', item: 'h-6.5 gap-1.5 pl-2.5 pr-2', input: 'ml-1.5', clear: 'mr-1.5' },
      xl: { root: 'h-12 text-4 gap-2 p-1.5', icon: 'mx-2 text-4', item: 'h-8 gap-2 pl-3 pr-2.5', input: 'ml-1.5', clear: 'mr-1.5' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
    invalid: { true: '' },
    focused: { true: '' },
    disabled: { true: { root: 'is-disabled' } },
    loading: { true: { icon: 'animate-spin' } },
  },

  compoundVariants: [
    { variant: 'soft', focused: false, invalid: false, class: {
      root: 'bg-muted b-(~ transparent) hover:bg-elevated',
      item: 'bg-primary-1 b-(~ transparent) shadow-sm hover:bg-primary-2',
      input: 'placeholder:text-toned hover:placeholder:text-default',
    } },
    { variant: 'soft', focused: true, disabled: false, invalid: false, class: {
      root: 'bg-primary-1 b-(~ primary)',
      item: 'b-(~ primary-7) hover:b-primary state-active:outline-(1 primary)',
    } },
    { variant: 'soft', invalid: true, class: {
      root: 'bg-danger-3',
      item: 'bg-danger-5 hover:bg-danger-6 state-active:bg-danger-6',
      itemText: 'text-danger',
      itemDelete: 'text-danger',
      input: 'text-danger placeholder:text-danger',
      clear: 'text-danger hover:text-danger-10',
    } },

    { variant: 'outline', focused: false, invalid: false, class: {
      root: 'b-(~ default) hover:b-primary-7',
      item: 'b-(~ default) hover:b-primary-8',
      input: 'placeholder:text-toned hover:placeholder:text-default',
    } },
    { variant: 'outline', focused: true, disabled: false, invalid: false, class: {
      root: 'bg-primary-1 b-(~ primary) outline-primary-4',
      item: 'b-(~ primary-7) hover:b-primary state-active:outline-(1 primary)',
    } },
    { variant: 'outline', invalid: true, class: {
      root: 'b-(~ danger)',
      item: 'bg-danger-5 hover:bg-danger-6 state-active:bg-danger-6',
      itemText: 'text-danger',
      itemDelete: 'text-danger',
      input: 'text-danger placeholder:text-danger',
      clear: 'text-danger hover:text-danger-10',
    } },

    { variant: 'outline', focused: true, disabled: false, invalid: false, size: 'xs', class: { root: 'outline-2' } },
    { variant: 'outline', focused: true, disabled: false, invalid: false, size: 'sm', class: { root: 'outline-2' } },
    { variant: 'outline', focused: true, disabled: false, invalid: false, size: 'md', class: { root: 'outline-3' } },
    { variant: 'outline', focused: true, disabled: false, invalid: false, size: 'lg', class: { root: 'outline-4' } },
    { variant: 'outline', focused: true, disabled: false, invalid: false, size: 'xl', class: { root: 'outline-5' } },

    { variant: 'line', focused: false, invalid: false, class: {
      root: 'b-(b default) hover:b-primary-7',
      item: 'b-(~ default) hover:b-primary-8',
      input: 'placeholder:text-toned hover:placeholder:text-default',
    } },
    { variant: 'line', focused: true, disabled: false, invalid: false, class: {
      root: 'b-(b primary)',
      item: 'b-(~ default) hover:b-primary-8 state-active:outline-(1 primary)',
    } },
    { variant: 'line', invalid: true, class: {
      root: 'b-(b danger)',
      item: 'bg-danger-5 hover:bg-danger-6 state-active:bg-danger-6',
      itemText: 'text-danger',
      itemDelete: 'text-danger',
      input: 'text-danger placeholder:text-danger',
      clear: 'text-danger hover:text-danger-10',
    } },

    { variant: 'none', focused: false, invalid: false, class: {
      item: 'b-(~ default) hover:b-primary-8',
      input: 'placeholder:text-toned hover:placeholder:text-default',
    } },
    { variant: 'none', focused: true, disabled: false, invalid: false, class: {
      item: 'b-(~ default) hover:b-primary-8 state-active:outline-(1 primary)',
    } },
    { variant: 'none', invalid: true, class: {
      item: 'bg-danger-3 hover:bg-danger-5 state-active:bg-danger-5',
      itemText: 'text-danger',
      itemDelete: 'text-danger',
      input: 'text-danger placeholder:text-danger',
      clear: 'text-danger hover:text-danger-10',
    } },

    { variant: ['soft', 'outline'], radius: 'xs', class: { root: 'rounded-xs', item: 'rounded-xs' } },
    { variant: ['soft', 'outline'], radius: 'sm', class: { root: 'rounded-sm', item: 'rounded-xs' } },
    { variant: ['soft', 'outline'], radius: 'md', class: { root: 'rounded-md', item: 'rounded-sm' } },
    { variant: ['soft', 'outline'], radius: 'lg', class: { root: 'rounded-lg', item: 'rounded-md' } },
    { variant: ['soft', 'outline'], radius: 'xl', class: { root: 'rounded-xl', item: 'rounded-lg' } },
    { variant: ['soft', 'outline'], radius: 'full', class: { root: 'rounded-full', item: 'rounded-full' } },

    { variant: ['line', 'none'], radius: 'xs', class: { item: 'rounded-xs' } },
    { variant: ['line', 'none'], radius: 'sm', class: { item: 'rounded-sm' } },
    { variant: ['line', 'none'], radius: 'md', class: { item: 'rounded-md' } },
    { variant: ['line', 'none'], radius: 'lg', class: { item: 'rounded-lg' } },
    { variant: ['line', 'none'], radius: 'xl', class: { item: 'rounded-xl' } },
    { variant: ['line', 'none'], radius: 'full', class: { item: 'rounded-full' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'sm',
  },
})

export type TagsInputStyleSlots = typeof useTagsInputStyle['slots']
export type TagsInputStyleProps = VariantProps<typeof useTagsInputStyle>
