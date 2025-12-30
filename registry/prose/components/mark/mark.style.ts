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
      xs: 'rounded-xs',
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
      variants: ['solid', 'soft', 'surface', 'outline', 'plain'],
      slot: 'base',
    }),

    { variant: ['outline', 'plain'], class: 'bg-transparent' },

    { variant: 'plain', class: 'font-semibold' },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    radius: 'md',
  },
})

export type MarkStyleSlots = typeof useMarkStyle['slots']
export type MarkStyleProps = VariantProps<typeof useMarkStyle>
