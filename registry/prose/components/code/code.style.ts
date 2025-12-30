import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCodeStyle = createVariants({
  slots: {
    base: 'flex-(inline y-center) font-mono',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '' },
    size: {
      xs: { base: 'text-xs px-1 min-h-4' },
      sm: { base: 'text-sm px-1.5 min-h-5' },
      md: { base: 'text-base px-2 min-h-6' },
      lg: { base: 'text-lg px-2.5 min-h-7' },
      xl: { base: 'text-xl px-3 min-h-8' },
    },
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
      variants: ['solid', 'soft', 'surface', 'outline'],
      slot: 'base',
    }),
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'soft',
    size: 'sm',
    radius: 'sm',
  },
})

export type CodeStyleSlots = typeof useCodeStyle['slots']
export type CodeStyleProps = VariantProps<typeof useCodeStyle>
