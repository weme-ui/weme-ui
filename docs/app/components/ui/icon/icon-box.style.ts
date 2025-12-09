import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useIconBoxStyle = createVariants({
  slots: {
    base: 'flex-(~ center)',
    icon: '',
  },
  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', inverse: '' },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    size: {
      xs: { base: 'size-4', icon: 'size-2' },
      sm: { base: 'size-6', icon: 'size-2.5' },
      md: { base: 'size-8', icon: 'size-3' },
      lg: { base: 'size-10', icon: 'size-4' },
      xl: { base: 'size-16', icon: 'size-5' },
    },
  },
  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
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
