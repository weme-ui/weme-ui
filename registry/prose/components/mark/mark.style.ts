import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useMarkStyle = createVariants({
  slots: {
    base: '',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', plain: '' },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface'],
      slot: 'base',
    }),
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    radius: 'md',
  },
})

export type MarkStyleSlots = typeof useMarkStyle['slots']
export type MarkStyleProps = VariantProps<typeof useMarkStyle>
