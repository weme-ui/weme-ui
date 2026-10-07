import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useButtonGroupStyle = createVariants({
  slots: {
    root: 'flex w-fit h-fit',
    item: '',
    separator: 'bg-border-base',
  },

  variants: {
    orientation: {
      horizontal: { separator: 'w-px' },
      vertical: { root: 'flex-col items-stretch', separator: 'h-px' },
    },
    gap: {
      none: {},
      xs: { root: 'gap-xs' },
      sm: { root: 'gap-sm' },
      md: { root: 'gap-md' },
      lg: { root: 'gap-lg' },
      xl: { root: 'gap-xl' },
    },
    separator: {
      true: {},
    },
    disabled: {
      true: {},
    },
  },

  compoundVariants: [
    { orientation: 'horizontal', gap: 'none', class: { item: 'data-[order=first]:rounded-r-none data-[order=last]:rounded-l-none data-[order=between]:rounded-none' } },
    { orientation: 'horizontal', gap: 'none', separator: false, class: { item: 'data-[order=first]:border-r-0 data-[order=between]:border-r-0' } },

    { orientation: 'vertical', gap: 'none', class: { item: 'data-[order=first]:rounded-b-none data-[order=last]:rounded-t-none data-[order=between]:rounded-none' } },
    { orientation: 'vertical', gap: 'none', separator: false, class: { item: 'data-[order=first]:border-b-0 data-[order=between]:border-b-0' } },
  ],

  defaultVariants: {
    orientation: 'horizontal',
    gap: 'md',
  },
})

export type ButtonGroupStyleSlots = typeof useButtonGroupStyle['slots']
export type ButtonGroupStyleProps = VariantProps<typeof useButtonGroupStyle>
