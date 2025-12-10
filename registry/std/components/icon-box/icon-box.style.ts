import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconBoxStyle = createVariants({
  slots: {
    base: 'flex-(~ center)',
    icon: 'shrink-0',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', plain: '', inverse: '' },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    size: {
      xs: { base: 'size-5', icon: 'size-3' },
      sm: { base: 'size-6', icon: 'size-3.5' },
      md: { base: 'size-8', icon: 'size-4' },
      lg: { base: 'size-10', icon: 'size-5' },
      xl: { base: 'size-16', icon: 'size-8' },
    },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline', 'plain', 'inverse'],
      slot: 'base',
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
