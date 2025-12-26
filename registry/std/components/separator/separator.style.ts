import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSeparatorStyle = createVariants({
  slots: {
    root: '',
    label: 'text-(xs toned) select-none px-2',
    separator: '',
  },

  variants: {
    variant: {
      solid: { separator: 'b-default' },
      dashed: { separator: 'b-(dashed default)' },
      dotted: { separator: 'b-(dotted default)' },
      gradient: { separator: 'from-transparent to-transparent' },
    },
    orientation: {
      horizontal: { separator: 'w-full' },
      vertical: { separator: 'h-full' },
    },
    size: { xs: '', sm: '', md: '', lg: '' },
    hasLabel: {
      true: { root: 'flex' },
    },
    labelPlacement: { start: '', center: '', end: '' },
  },

  compoundVariants: [
    { variant: 'gradient', orientation: 'horizontal', class: { separator: 'bg-linear-to-r' } },
    { variant: 'gradient', orientation: 'vertical', class: { separator: 'bg-linear-to-b' } },
    { variant: 'gradient', hasLabel: false, class: { separator: 'via-border' } },
    { variant: 'gradient', hasLabel: true, orientation: 'horizontal', labelPlacement: 'start', class: { separator: 'from-border' } },
    { variant: 'gradient', hasLabel: true, orientation: 'horizontal', labelPlacement: 'end', class: { separator: 'to-border' } },

    { orientation: 'horizontal', variant: 'gradient', size: 'xs', class: { separator: 'h-px' } },
    { orientation: 'horizontal', variant: 'gradient', size: 'sm', class: { separator: 'h-[2px]' } },
    { orientation: 'horizontal', variant: 'gradient', size: 'md', class: { separator: 'h-[3px]' } },
    { orientation: 'horizontal', variant: 'gradient', size: 'lg', class: { separator: 'h-[4px]' } },

    { orientation: 'vertical', variant: 'gradient', size: 'xs', class: { separator: 'w-px' } },
    { orientation: 'vertical', variant: 'gradient', size: 'sm', class: { separator: 'w-[2px]' } },
    { orientation: 'vertical', variant: 'gradient', size: 'md', class: { separator: 'w-[3px]' } },
    { orientation: 'vertical', variant: 'gradient', size: 'lg', class: { separator: 'w-[4px]' } },

    { orientation: 'horizontal', variant: ['solid', 'dashed', 'dotted'], size: 'xs', class: { separator: 'b-t-px' } },
    { orientation: 'horizontal', variant: ['solid', 'dashed', 'dotted'], size: 'sm', class: { separator: 'b-t-[2px]' } },
    { orientation: 'horizontal', variant: ['solid', 'dashed', 'dotted'], size: 'md', class: { separator: 'b-t-[3px]' } },
    { orientation: 'horizontal', variant: ['solid', 'dashed', 'dotted'], size: 'lg', class: { separator: 'b-t-[4px]' } },

    { orientation: 'vertical', variant: ['solid', 'dashed', 'dotted'], size: 'xs', class: { separator: 'b-r-px' } },
    { orientation: 'vertical', variant: ['solid', 'dashed', 'dotted'], size: 'sm', class: { separator: 'b-r-[2px]' } },
    { orientation: 'vertical', variant: ['solid', 'dashed', 'dotted'], size: 'md', class: { separator: 'b-r-[3px]' } },
    { orientation: 'vertical', variant: ['solid', 'dashed', 'dotted'], size: 'lg', class: { separator: 'b-r-[4px]' } },

    { orientation: 'horizontal', hasLabel: true, class: { root: 'items-center' } },
  ],

  defaultVariants: {
    variant: 'solid',
    orientation: 'horizontal',
    size: 'xs',
    hasLabel: false,
  },
})

export type SeparatorStyleSlots = typeof useSeparatorStyle['slots']
export type SeparatorStyleProps = VariantProps<typeof useSeparatorStyle>
