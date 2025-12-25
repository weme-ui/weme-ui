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
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    size: {
      xs: { root: 'size-5', icon: 'size-3.5' },
      sm: { root: 'size-6', icon: 'size-4' },
      md: { root: 'size-8', icon: 'size-5' },
      lg: { root: 'size-10', icon: 'size-6' },
      xl: { root: 'size-16', icon: 'size-10' },
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
