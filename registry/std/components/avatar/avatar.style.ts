import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAvatarStyle = createVariants({
  slots: {
    base: 'relative flex-(~ center) shrink-0 overflow-hidden select-none transition',
    image: 'size-full object-cover rounded-inherit',
    fallback: 'flex-(~ center) size-full font-semibold leading-none',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', inverse: '' },
    size: {
      'xs': { base: 'size-5', fallback: 'text-2.5' },
      'sm': { base: 'size-6', fallback: 'text-3' },
      'md': { base: 'size-8', fallback: 'text-3' },
      'lg': { base: 'size-10', fallback: 'text-3.5' },
      'xl': { base: 'size-16', fallback: 'text-6' },
      '2xl': { base: 'size-20', fallback: 'text-10' },
      '3xl': { base: 'size-24', fallback: 'text-12' },
      '4xl': { base: 'size-32', fallback: 'text-16' },
    },
    radius: {
      none: '',
      sm: { base: 'rounded-sm' },
      md: { base: 'rounded-md' },
      lg: { base: 'rounded-lg' },
      xl: { base: 'rounded-xl' },
      full: { base: 'rounded-full' },
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
    size: 'md',
    radius: 'full',
  },
})

export type AvatarStyleSlots = typeof useAvatarStyle['slots']
export type AvatarStyleProps = VariantProps<typeof useAvatarStyle>
