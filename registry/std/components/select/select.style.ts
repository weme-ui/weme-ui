import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSelectStyle = createVariants({
  slots: {
    base: 'group relative flex-(inline y-center)',
    prefix: 'flex-(~ center)',
    value: 'flex-1 text-(left highlighted) leading-none',
    triggerIcon: 'shrink-0',
    content: [
      'relative bg-popover b-(~ default) shadow-lg z-popup overflow-(x-hidden y-auto)',
      'w-$reka-select-trigger-width min-w-32 max-h-$reka-select-content-available-height',
      'origin-$reka-select-content-transform-origin state-open:animate-scale-in state-closed:animate-scale-out',
    ],
    viewport: 'flex-(~ col)',
    item: 'flex-(~ y-center) select-none text-highlighted focus:(font-medium bg-muted outline-none) data-[disabled]:is-disabled',
    itemIcon: 'flex-(~ center)',
    itemText: 'flex-1 truncate cursor-default',
    itemIndicator: 'shrink-0',
    group: '',
    label: 'flex-(~ y-center) c-muted py-0.5',
    separator: 'b-b-(~ default) pointer-events-none -mx-1 my-1',
    arrow: 'fill-popover',
    scrollUp: '',
    scrollDown: '',
    loading: 'flex-(~ center) text-toned h-32',
  },

  variants: {
    variant: { soft: '', outline: '', line: '', none: '' },
    size: {
      xs: { base: 'h-5 text-3 px-1 gap-1', viewport: 'py-0.5 text-3', item: 'h-5' },
      sm: { base: 'h-6 text-3 px-1.5 gap-1.5', viewport: 'py-0.75 text-3', item: 'h-6' },
      md: { base: 'h-8 text-3.5 px-3 gap-2', viewport: 'py-1 text-3.5', label: 'text-3', item: 'h-8' },
      lg: { base: 'h-10 text-4 px-3 gap-2', viewport: 'py-1 text-4', label: 'text-3', item: 'h-10' },
      xl: { base: 'h-12 text-4.5 px-3.5 gap-2.5', viewport: 'py-1 text-4.5', label: 'text-3', item: 'h-12' },
    },
    radius: {
      none: '',
      xs: { content: 'rounded-xs', item: 'rounded-xs' },
      sm: { content: 'rounded-sm', item: 'rounded-xs' },
      md: { content: 'rounded-md', item: 'rounded-sm' },
      lg: { content: 'rounded-lg', item: 'rounded-md' },
      xl: { content: 'rounded-xl', item: 'rounded-lg' },
      full: { content: 'rounded-2xl', item: 'rounded-xl' },
    },
    disabled: {
      true: { base: 'is-disabled' },
    },
    invalid: { true: '' },
  },

  compoundSlots: [
    { slots: ['base', 'value', 'item'], class: 'transition-colors' },
    { slots: ['scrollUp', 'scrollDown'], class: 'flex-(~ center) py-1 text-default hover:text-highlighted' },

    { slots: ['item', 'label'], size: 'xs', class: 'px-1 gap-1' },
    { slots: ['item', 'label'], size: 'sm', class: 'px-1.5 gap-1.5' },
    { slots: ['item', 'label'], size: 'md', class: 'px-3 gap-2' },
    { slots: ['item', 'label'], size: 'lg', class: 'px-3 gap-2' },
    { slots: ['item', 'label'], size: 'xl', class: 'px-3.5 gap-2.5' },
  ],

  compoundVariants: [
    { invalid: false, disabled: false, class: {
      base: 'state-closed:text-toned hover:state-closed:text-default state-open:text-highlighted',
      value: 'state-closed:data-[placeholder]:text-toned group-hover:data-[placeholder]:text-default',
    } },
    { invalid: true, disabled: false, class: { base: 'state-closed:text-danger', value: 'state-closed:text-danger state-closed:data-[placeholder]:text-danger' } },

    { variant: 'soft', disabled: false, class: { base: 'outline-none b-(~ transparent) focus-visible:(bg-default b-primary) state-open:(bg-default b-primary) state-closed:(bg-muted hover:bg-elevated)' } },
    { variant: 'soft', invalid: true, disabled: false, class: { base: 'state-closed:(bg-danger-3 hover:bg-danger-4)' } },

    { variant: 'outline', disabled: false, class: { base: 'b-(~ default) outline-primary-3 state-open:(bg-default b-primary outline-3 outline-primary-3) focus-visible:(outline-3 b-primary)' } },
    { variant: 'outline', invalid: false, disabled: false, class: { base: 'state-closed:hover:b-elevated' } },
    { variant: 'outline', invalid: true, disabled: false, class: { base: 'b-(~ danger)' } },

    { variant: 'line', disabled: false, class: { base: 'b-(b default) outline-none state-open:b-primary focus-visible:b-primary' } },
    { variant: 'line', invalid: false, disabled: false, class: { base: 'state-closed:hover:b-elevated' } },
    { variant: 'line', invalid: true, disabled: false, class: { base: 'b-(b danger)' } },

    { variant: ['outline', 'line'], invalid: true, disabled: false, class: { base: 'state-closed:(b-danger hover:b-danger-10)' } },

    { variant: ['soft', 'outline'], radius: 'xs', class: { base: 'rounded-xs' } },
    { variant: ['soft', 'outline'], radius: 'sm', class: { base: 'rounded-sm' } },
    { variant: ['soft', 'outline'], radius: 'md', class: { base: 'rounded-md' } },
    { variant: ['soft', 'outline'], radius: 'lg', class: { base: 'rounded-lg' } },
    { variant: ['soft', 'outline'], radius: 'xl', class: { base: 'rounded-xl' } },
    { variant: ['soft', 'outline'], radius: 'full', class: { base: 'rounded-2xl' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'sm',
  },
})

export type SelectStyleSlots = typeof useSelectStyle['slots']
export type SelectStyleProps = VariantProps<typeof useSelectStyle>
