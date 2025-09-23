import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useDropdownStyle = createVariants({
  slots: {
    base: 'flex-(~ col) p-1 shadow-lg z-popup',
    viewport: 'flex-(~ 1 col) min-w-40',
    group: 'flex-(~ col)',
    item: [
      'group relative flex-(~ y-center) gap-2 text-sm cursor-default select-none px-2.5 py-1.5 outline-hidden overflow-hidden transition-colors',
      'data-[highlighted]:(c-accent-1 bg-accent) hover:(c-accent-1 bg-accent) focus:(c-accent-1 bg-accent) disabled:is-disabled',
    ],
    label: 'relative flex-(~ y-center) gap-2 text-sm cursor-default select-none px-2.5 py-1.5 outline-hidden overflow-hidden text-dimmed font-medium',
    indicator: 'abs left-2.5 flex-(~ center) size-3.5 transition-colors c-accent group-data-[highlighted]:c-accent-1',
    icon: 'text-toned transition-colors group-data-[highlighted]:c-accent-1',
    loading: 'animate-spin',
    external: 'text-muted',
    extras: 'flex-(~ center) gap-0.5',
    separator: '-mx-1 my-1 h-px bg-border',
    arrow: '',
  },

  variants: {
    side: {
      top: { base: 'side-top:animate-popup-top state-closed:animate-popup-out-bottom' },
      right: { base: 'side-right:animate-popup-left state-closed:animate-popup-out-left' },
      bottom: { base: 'side-bottom:animate-popup-bottom state-closed:animate-popup-out-top' },
      left: { base: 'side-left:animate-popup-right state-closed:animate-popup-out-right' },
    },
    radius: {
      none: '',
      sm: { base: 'rounded-sm', item: 'rounded-sm' },
      md: { base: 'rounded-md', item: 'rounded-sm' },
      lg: { base: 'rounded-lg', item: 'rounded-md' },
      xl: { base: 'rounded-xl', item: 'rounded-lg' },
    },
    translucent: {
      true: { base: 'bg-dropdown/70 backdrop-blur-3xl', arrow: 'fill-dropdown/70 backdrop-blur-3xl' },
      false: { base: 'bg-dropdown', arrow: 'fill-dropdown' },
    },
    indent: {
      true: { item: 'pl-8', label: 'pl-8' },
    },
  },

  defaultVariants: {
    side: 'bottom',
    radius: 'lg',
    translucent: false,
  },
})

export type DropdownStyle = ReturnType<typeof useDropdownStyle>
export type DropdownStyleSlots = typeof useDropdownStyle['slots']
export type DropdownStyleProps = VariantProps<typeof useDropdownStyle>
