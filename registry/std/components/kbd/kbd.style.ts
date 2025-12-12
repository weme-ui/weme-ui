import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useKbdStyle = createVariants({
  slots: {
    base: 'flex-(inline center) font-(sans medium) px-1',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', plain: '', inverse: '' },
    size: {
      xs: 'h-4 min-w-4 text-[10px]',
      sm: 'h-5 min-w-5 text-[11px]',
      md: 'h-6 min-w-6 text-3',
    },
    radius: {
      none: '',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
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
    size: 'md',
    radius: 'sm',
  },
})

export type KbdStyleSlots = typeof useKbdStyle['slots']
export type KbdStyleProps = VariantProps<typeof useKbdStyle>
