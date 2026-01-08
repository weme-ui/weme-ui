import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useButtonStyle = createVariants({
  slots: {
    root: 'flex-(inline center) cursor-default font-medium select-none transition-colors focus-visible:outline-primary',
    icon: '',
    loading: 'animate-spin',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', ghost: '', plain: '', inverse: '' },
    size: {
      xs: { root: 'text-xs gap-1 h-5 px-1.5 leading-none', icon: 'size-3' },
      sm: { root: 'text-xs gap-1 h-6 px-2.5', icon: 'size-3' },
      md: { root: 'text-sm gap-1.5 h-8 px-3', icon: 'size-3.5' },
      lg: { root: 'text-base gap-2 h-10 px-4', icon: 'size-4' },
      xl: { root: 'text-lg gap-2.5 h-12 px-5', icon: 'size-4.5' },
    },
    radius: {
      none: '',
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'btn',
      variants: ['solid', 'soft', 'surface', 'outline', 'ghost', 'plain', 'inverse'],
      slot: 'root',
    }),
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
    radius: 'sm',
    disabled: false,
  },
})

export type ButtonStyleSlots = typeof useButtonStyle['slots']
export type ButtonStyleProps = VariantProps<typeof useButtonStyle>
