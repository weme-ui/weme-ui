import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useScrollAreaStyle = createVariants({
  slots: {
    base: 'relative',
    viewport: 'relative size-full scroll-smooth rounded-inherit',
    scrollbar: [
      'flex select-none touch-none bg-transparent',
      'state-visible:(animate-fade-in animate-duration-100 animate-ease-in-out)',
      'state-hidden:(animate-fade-out animate-duration-100 animate-ease-in-out)',
    ],
    thumb: [
      'relative z-1 flex-1 bg-border hover:bg-border-elevated',
      'before:(content-[""] abs abs-center size-full min-w-10 min-h-10 transform)',
    ],
    item: '',
  },

  variants: {
    orientation: {
      vertical: { base: 'overflow-y-auto overflow-x-hidden', scrollbar: 'flex-row' },
      horizontal: { base: 'overflow-x-auto overflow-y-hidden', scrollbar: 'flex-col' },
    },
    size: { xs: '', sm: '', md: '', lg: '' },
    radius: {
      none: '',
      sm: { thumb: 'rounded-sm before:rounded-xs' },
      md: { thumb: 'rounded-md before:rounded-sm' },
      lg: { thumb: 'rounded-lg before:rounded-md' },
    },
  },

  compoundVariants: [
    { orientation: 'vertical', size: 'xs', class: { scrollbar: 'w-1 mr-0.5 my-0.5' } },
    { orientation: 'vertical', size: 'sm', class: { scrollbar: 'w-1.5 mr-0.5 my-0.5' } },
    { orientation: 'vertical', size: 'md', class: { scrollbar: 'w-2 mr-0.5 my-0.5' } },
    { orientation: 'vertical', size: 'lg', class: { scrollbar: 'w-2.5 mr-0.5 my-0.5' } },

    { orientation: 'horizontal', size: 'xs', class: { scrollbar: 'h-1 mb-0.5 ml-0.5' } },
    { orientation: 'horizontal', size: 'sm', class: { scrollbar: 'h-1.5 mb-0.5 ml-0.5' } },
    { orientation: 'horizontal', size: 'md', class: { scrollbar: 'h-2 mb-0.5 ml-0.5' } },
    { orientation: 'horizontal', size: 'lg', class: { scrollbar: 'h-2.5 mb-0.5 ml-0.5' } },
  ],

  defaultVariants: {
    size: 'sm',
    radius: 'sm',
  },
})

export type ScrollAreaStyleSlots = typeof useScrollAreaStyle['slots']
export type ScrollAreaStyleProps = VariantProps<typeof useScrollAreaStyle>
