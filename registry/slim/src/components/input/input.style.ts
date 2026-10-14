import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useInputStyle = createVariants({
  slots: {
    root: 'group flex flex-y-center relative',
    prefix: '',
    prefixIcon: '',
    input: 'leading-none outline-none size-full placeholder:text-subtle',
    suffix: '',
    suffixIcon: '',
    counter: 'text-(xs subtle nowrap) pointer-events-none select-none',
    cleanBtn: 'p-0.5 rounded-full op-0 flex transition-[opacity,background-color] flex-center hover:bg-accent-3 group-data-[focused]:op-100',
  },

  variants: {
    variant: { soft: {}, outline: {} },
    radius: {
      none: { root: 'rounded-none' },
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    size: {
      sm: { root: 'text-xs gap-xs h-6' },
      md: { root: 'text-sm gap-sm h-8' },
      lg: { root: 'text-base gap-md h-10' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    loading: {
      true: { root: 'is-loading', suffixIcon: 'animate-spin' },
    },
    overcount: {
      true: { counter: 'text-error' },
    },
    invalid: { true: {} },
    unstyled: { true: {} },
  },

  compoundSlots: [
    { slots: ['root', 'prefix', 'suffix'], unstyled: false, class: 'transition-colors duration-200' },
    { slots: ['prefix', 'suffix'], invalid: false, class: 'group-data-[focused]:text-highlighted not-[[data-focused]]:text-subtle' },
  ],

  compoundVariants: [
    { variant: ['soft', 'outline'], unstyled: false, class: { root: 'b' } },

    { variant: 'soft', unstyled: false, class: { root: 'b-transparent bg-muted' } },
    { variant: 'outline', unstyled: false, class: { root: 'b-base bg-base' } },

    {
      variant: 'soft',
      invalid: false,
      unstyled: false,
      class: {
        root: 'data-[focused]:(bg-base b-accent outline-2 outline-accent-4) hover:not-[[data-focused]]:bg-elevated',
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

    { variant: ['soft', 'outline'], radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'sm', unstyled: false, class: { root: 'px-1.5' } },
    { variant: ['soft', 'outline'], radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'md', unstyled: false, class: { root: 'px-2.5' } },
    { variant: ['soft', 'outline'], radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'lg', unstyled: false, class: { root: 'px-3' } },

    { variant: ['soft', 'outline'], radius: 'full', size: 'sm', unstyled: false, class: { root: 'px-2.25' } },
    { variant: ['soft', 'outline'], radius: 'full', size: 'md', unstyled: false, class: { root: 'px-3.5' } },
    { variant: ['soft', 'outline'], radius: 'full', size: 'lg', unstyled: false, class: { root: 'px-4' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'md',
  },
})

export type InputStyleSlots = typeof useInputStyle['slots']
export type InputStyleProps = VariantProps<typeof useInputStyle>
