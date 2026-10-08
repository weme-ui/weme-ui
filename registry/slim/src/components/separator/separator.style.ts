import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSeparatorStyle = createVariants({
  slots: {
    root: '',
    label: 'px-sm select-none text-xs text-subtle',
    line: '',
  },

  variants: {
    color: { base: {}, elevated: {}, inverted: {} },
    variant: {
      solid: { line: 'b-solid' },
      dashed: { line: 'b-dashed' },
      dotted: { line: 'b-dotted' },
      double: { line: 'b-double' },
      gradient: {},
    },
    orientation: {
      horizontal: { line: 'w-full h-px' },
      vertical: { line: 'w-px h-full' },
    },
    labelPosition: { none: {}, start: {}, center: {}, end: {} },
  },

  compoundVariants: [
    { variant: 'gradient', labelPosition: 'none', class: { line: 'from-transparent to-transparent' } },

    { color: 'base', variant: 'gradient', labelPosition: 'none', class: { line: 'via-border-base' } },
    { color: 'elevated', variant: 'gradient', labelPosition: 'none', class: { line: 'via-border-elevated' } },
    { color: 'inverted', variant: 'gradient', labelPosition: 'none', class: { line: 'via-border-inverted' } },

    { color: 'base', variant: 'gradient', labelPosition: 'start', class: { line: 'from-border-base' } },
    { color: 'elevated', variant: 'gradient', labelPosition: 'start', class: { line: 'from-border-elevated' } },
    { color: 'inverted', variant: 'gradient', labelPosition: 'start', class: { line: 'from-border-inverted' } },

    { color: 'base', variant: 'gradient', labelPosition: 'end', class: { line: 'to-border-base' } },
    { color: 'elevated', variant: 'gradient', labelPosition: 'end', class: { line: 'to-border-elevated' } },
    { color: 'inverted', variant: 'gradient', labelPosition: 'end', class: { line: 'to-border-inverted' } },

    { color: 'base', variant: ['solid', 'dashed', 'dotted', 'double'], class: { line: 'b-base' } },
    { color: 'elevated', variant: ['solid', 'dashed', 'dotted', 'double'], class: { line: 'b-elevated' } },
    { color: 'inverted', variant: ['solid', 'dashed', 'dotted', 'double'], class: { line: 'b-inverted' } },

    { orientation: 'horizontal', variant: ['solid', 'dashed', 'dotted', 'double'], class: { line: 'b-t' } },
    { orientation: 'vertical', variant: ['solid', 'dashed', 'dotted', 'double'], class: { line: 'b-r' } },

    { orientation: 'horizontal', variant: 'gradient', class: { line: 'bg-linear-to-r' } },
    { orientation: 'vertical', variant: 'gradient', class: { line: 'bg-linear-to-b' } },

    { orientation: 'horizontal', labelPosition: ['start', 'center', 'end'], class: { root: 'items-center', line: 'w-auto flex-1' } },

    { labelPosition: ['start', 'center', 'end'], class: { root: 'flex' } },
  ],

  defaultVariants: {
    color: 'base',
    variant: 'solid',
    orientation: 'horizontal',
    labelPosition: 'none',
  },
})

export type SeparatorStyleSlots = typeof useSeparatorStyle['slots']
export type SeparatorStyleProps = VariantProps<typeof useSeparatorStyle>
