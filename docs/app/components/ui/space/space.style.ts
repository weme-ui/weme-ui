import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSpaceStyle = createVariants({
  slots: {
    base: 'flex',
    item: '',
    separator: 'c-muted',
  },
  variants: {
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    },
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    size: {
      xs: 'gap-2',
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-10',
    },
    wrap: {
      true: 'flex-wrap',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: { separator: 'h-2.5' } },
    { orientation: 'horizontal', size: 'sm', class: { separator: 'h-3.5' } },
    { orientation: 'horizontal', size: 'md', class: { separator: 'h-4.5' } },
    { orientation: 'horizontal', size: 'lg', class: { separator: 'h-6.5' } },
    { orientation: 'horizontal', size: 'xl', class: { separator: 'h-10.5' } },
  ],
  defaultVariants: {
    align: 'center',
    orientation: 'horizontal',
    size: 'sm',
  },
})

export type SpaceStyleSlots = typeof useSpaceStyle['slots']
export type SpaceStyleProps = VariantProps<typeof useSpaceStyle>
