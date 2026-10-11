import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useNumberInputStyle = createVariants({
  slots: {
    root: 'flex-(inline y-center) w-fit',
    input: 'text-center outline-none flex-1 h-full',
    increment: '',
    decrement: '',
  },

  variants: {
    variant: { soft: {}, outline: {} },
    size: {
      sm: { root: 'text-xs h-6' },
      md: { root: 'text-sm h-8' },
      lg: { root: 'text-base h-10' },
    },
    radius: {
      none: { root: 'rounded-none' },
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
    invalid: { true: {} },
    unstyled: { true: {} },
  },

  compoundSlots: [
    { slots: ['root', 'decrement', 'increment'], unstyled: false, class: 'transition-colors' },

    { slots: ['decrement', 'increment'], class: 'flex-(~ center) rounded-inherit cursor-pointer' },
    { slots: ['decrement', 'increment'], unstyled: false, class: 'hover:bg-muted' },

    { slots: ['decrement', 'increment'], size: 'sm', class: 'size-5.5' },
    { slots: ['decrement', 'increment'], size: 'md', class: 'size-7.5' },
    { slots: ['decrement', 'increment'], size: 'lg', class: 'size-9.5' },
  ],

  compoundVariants: [
    { variant: 'soft', unstyled: false, class: { root: 'b b-transparent bg-muted' } },
    { variant: 'outline', unstyled: false, class: { root: 'b b-base bg-base', decrement: 'b-r b-base', increment: 'b-l b-base' } },

    {
      variant: 'soft',
      invalid: false,
      unstyled: false,
      class: {
        root: 'bg-muted data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:bg-elevated',
      },
    },
    {
      variant: 'outline',
      invalid: false,
      unstyled: false,
      class: {
        root: 'data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:b-elevated',
      },
    },

    { variant: ['soft', 'outline'], invalid: true, unstyled: false, class: { root: 'b-error outline-2 outline-error-4' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'md',
  },
})

export type NumberInputStyleSlots = typeof useNumberInputStyle['slots']
export type NumberInputStyleProps = VariantProps<typeof useNumberInputStyle>
