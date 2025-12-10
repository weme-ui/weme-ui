import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSeparatorStyle = createVariants({
  slots: {
    base: '',
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
      true: { base: 'flex' },
    },
    labelPlacement: { start: '', center: '', end: '' },
  },

  compoundVariants: [
    { variant: 'gradient', orientation: 'horizontal', class: { separator: 'bg-linear-to-r' } },
    { variant: 'gradient', orientation: 'vertical', class: { separator: 'bg-linear-to-b' } },
    { variant: 'gradient', hasLabel: false, class: { separator: 'via-border' } },
    { variant: 'gradient', hasLabel: true, orientation: 'horizontal', labelPlacement: 'start', class: { separator: 'from-border' } },
    { variant: 'gradient', hasLabel: true, orientation: 'horizontal', labelPlacement: 'end', class: { separator: 'to-border' } },

    { variant: ['solid', 'dashed', 'dotted'], orientation: 'horizontal', class: { separator: 'b-t' } },
    { variant: ['solid', 'dashed', 'dotted'], orientation: 'vertical', class: { separator: 'b-l' } },

    { orientation: 'horizontal', size: 'xs', class: { separator: 'h-px' } },
    { orientation: 'horizontal', size: 'sm', class: { separator: 'h-[2px]' } },
    { orientation: 'horizontal', size: 'md', class: { separator: 'h-[3px]' } },
    { orientation: 'horizontal', size: 'lg', class: { separator: 'h-[4px]' } },

    { orientation: 'vertical', size: 'xs', class: { separator: 'w-px' } },
    { orientation: 'vertical', size: 'sm', class: { separator: 'w-[2px]' } },
    { orientation: 'vertical', size: 'md', class: { separator: 'w-[3px]' } },
    { orientation: 'vertical', size: 'lg', class: { separator: 'w-[4px]' } },

    { orientation: 'horizontal', hasLabel: true, class: { base: 'items-center' } },
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
