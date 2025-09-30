import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useButtonStyle = createVariants({
  slots: {
    base: 'flex-(inline center) cursor-button font-medium select-none transition-colors',
    icon: '',
    loading: '',
  },
  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', ghost: '', link: '', inverse: '' },
    size: {
      xs: { base: 'text-xs gap-1 h-5 px-1.5 leading-none', icon: 'size-3' },
      sm: { base: 'text-xs gap-1 h-6 px-2.5', icon: 'size-3' },
      md: { base: 'text-sm gap-1.5 h-8 px-3', icon: 'size-3.5' },
      lg: { base: 'text-base gap-2 h-10 px-4', icon: 'size-4' },
      xl: { base: 'text-lg gap-2.5 h-12 px-5', icon: 'size-4.5' },
    },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    loading: {
      true: {
        loading: 'animate-spin',
      },
    },
    disabled: {
      true: 'is-disabled',
    },
    square: {
      true: 'p-0',
    },
  },
  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'click',
      variants: ['solid', 'soft', 'surface', 'outline', 'ghost', 'link', 'inverse'],
      slot: 'base',
    }),

    // Square
    { square: true, size: 'xs', class: { base: 'w-5' } },
    { square: true, size: 'sm', class: { base: 'w-6' } },
    { square: true, size: 'md', class: { base: 'w-8' } },
    { square: true, size: 'lg', class: { base: 'w-10' } },
    { square: true, size: 'xl', class: { base: 'w-12' } },
  ],
  defaultVariants: {
    color: 'accent',
    variant: 'solid',
    size: 'md',
    radius: 'sm',
    loading: false,
    disabled: false,
    square: false,
  },
})

export type ButtonStyleSlots = typeof useButtonStyle['slots']
export type ButtonStyleProps = VariantProps<typeof useButtonStyle>
