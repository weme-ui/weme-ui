import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useBadgeStyle = createVariants({
  slots: {
    root: 'flex-(inline center) select-none transition-colors',
    icon: '',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', inverse: '' },
    size: {
      xs: { root: 'text-xs h-5 px-1.5 leading-none', icon: 'size-3 mr-1' },
      sm: { root: 'text-xs h-6 px-2.5', icon: 'size-3 mr-1' },
      md: { root: 'text-sm h-8 px-3', icon: 'size-3.5 mr-1.5' },
      lg: { root: 'text-base h-10 px-4', icon: 'size-4 mr-2' },
    },
    radius: {
      none: '',
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    clickable: {
      true: { root: 'relative cursor-pointer' },
    },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      slot: 'root',
      extra: { clickable: false },
    }),

    ...createColorCompoundVariants({
      type: 'btn',
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      slot: 'root',
      extra: { clickable: true },
    }),
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'soft',
    size: 'sm',
    radius: 'sm',
    disabled: false,
    clickable: false,
  },
})

export type BadgeStyleSlots = typeof useBadgeStyle['slots']
export type BadgeStyleProps = VariantProps<typeof useBadgeStyle>
