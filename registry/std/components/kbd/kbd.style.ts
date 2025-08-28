import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useKbdStyle = createVariants({
  base: 'flex-(inline center) font-(sans medium) px-1 select-none',
  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', inverse: '' },
    size: {
      sm: 'h-4 min-w-4 text-[10px]',
      md: 'h-5 min-w-5 text-[11px]',
      lg: 'h-6 min-w-6 text-3',
    },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
  },
  compoundVariants: [
    ...createColorCompoundVariants({
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      states: 'normal',
    }),

    { variant: ['surface', 'outline'], class: 'ring-inset' },
  ],
  defaultVariants: {
    color: 'accent',
    variant: 'soft',
    size: 'md',
    radius: 'sm',
  },
})

export type KbdStyleProps = VariantProps<typeof useKbdStyle>
