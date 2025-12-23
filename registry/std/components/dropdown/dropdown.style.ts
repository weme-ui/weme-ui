import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useDropdownStyle = createVariants({
  slots: {
    trigger: '',
    content: 'flex-(~ col) p-1 ring-(~ border) shadow-lg z-popup',
    viewport: 'flex-(~ 1 col)',
    group: 'flex-(~ col)',
    item: [
      'group relative flex-(~ y-center) gap-2 text-sm cursor-default select-none px-2.5 py-1.5 outline-hidden overflow-hidden transition-colors',
      'c-highlighted data-[highlighted]:(c-primary-1 bg-primary) hover:(c-primary-1 bg-primary) focus:(c-primary-1 bg-primary) disabled:is-disabled',
    ],
    label: [
      'relative flex-(~ y-center) gap-2 text-sm cursor-default select-none px-2.5 py-1.5 outline-hidden overflow-hidden',
      'text-toned font-medium',
    ],
    itemIndicator: 'abs left-2.5 flex-(~ center) size-3.5 transition-colors c-primary group-data-[highlighted]:c-primary-1',
    itemIcon: 'size-3.5',
    itemLabel: 'flex-1 pr-2',
    itemExternalIcon: 'text-muted',
    itemArrowIcon: 'text-sm group-data-[highlighted]:c-primary-1',
    itemCommand: 'flex-(~ y-center) gap-1 text-(xs toned)',
    separator: '-mx-1 my-1 h-px bg-border',
    arrow: '',
    loading: 'animate-spin',
  },

  variants: {
    side: {
      top: {},
      bottom: {},
      left: {},
      right: {},
    },
    radius: {
      none: '',
      xs: { content: 'rounded-xs', item: 'rounded-xs' },
      sm: { content: 'rounded-sm', item: 'rounded-xs' },
      md: { content: 'rounded-md', item: 'rounded-sm' },
      lg: { content: 'rounded-lg', item: 'rounded-md' },
      xl: { content: 'rounded-xl', item: 'rounded-lg' },
    },
    translucent: {
      true: { content: 'bg-dropdown/80 backdrop-blur-3xl', arrow: 'fill-dropdown/80 backdrop-blur-3xl' },
      false: { content: 'bg-dropdown', arrow: 'fill-dropdown' },
    },
    indent: {
      true: { item: 'pl-8', label: 'pl-8' },
    },
  },

  defaultVariants: {
    side: 'bottom',
    radius: 'lg',
    translucent: false,
    indent: false,
  },
})

export type DropdownStyle = ReturnType<typeof useDropdownStyle>
export type DropdownStyleSlots = typeof useDropdownStyle['slots']
export type DropdownStyleProps = VariantProps<typeof useDropdownStyle>
