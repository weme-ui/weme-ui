import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconBoxStyle = createVariants({
  slots: {
    root: 'flex-(~ center)',
    icon: 'shrink-0',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', plain: '', inverse: '' },
    radius: {
      none: '',
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    size: {
      xs: { root: 'size-5', icon: 'size-3' },
      sm: { root: 'size-6', icon: 'size-3.5' },
      md: { root: 'size-8', icon: 'size-4' },
      lg: { root: 'size-10', icon: 'size-5' },
      xl: { root: 'size-12', icon: 'size-6' },
    },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline', 'plain', 'inverse'],
      slot: 'root',
    }),
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'soft',
    radius: 'sm',
    size: 'md',
  },
})

export type IconBoxStyleSlots = typeof useIconBoxStyle['slots']
export type IconBoxStyleProps = VariantProps<typeof useIconBoxStyle>
