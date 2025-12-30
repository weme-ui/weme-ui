import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useHighlightStyle = createVariants({
  slots: {
    mark: 'px-1 py-0.5 font-medium',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', plain: '' },
    radius: {
      none: '',
      xs: { mark: 'rounded-xs' },
      sm: { mark: 'rounded-sm' },
      md: { mark: 'rounded-md' },
      lg: { mark: 'rounded-lg' },
      xl: { mark: 'rounded-xl px-1.5' },
      full: { mark: 'rounded-full px-1.5' },
    },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline', 'plain'],
      slot: 'mark',
    }),

    { variant: ['outline', 'plain'], class: { mark: 'bg-transparent' } },
    { variant: 'plain', class: { mark: 'font-semibold' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'soft',
    radius: 'md',
  },
})

export type HighlightStyleProps = VariantProps<typeof useHighlightStyle>
