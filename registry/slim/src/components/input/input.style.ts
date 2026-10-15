import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useInputStyle = createVariants({
  slots: {
    root: 'group flex flex-y-center relative',
    prefix: '',
    prefixIcon: '',
    input: 'leading-none outline-none size-full',
    suffix: '',
    suffixIcon: '',
    counter: 'pointer-events-none select-none',
    cleanBtn: 'p-0.5 rounded-inherit flex flex-center',
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
    unstyled: {
      false: {
        root: 'b',
        input: 'placeholder:text-subtle',
        counter: 'text-(xs subtle nowrap)',
        cleanBtn: 'op-0 transition-[opacity,background-color] duration-200 hover:bg-accent-3 group-data-[focused]:op-100',
      },
    },
  },

  compoundSlots: [
    { slots: ['root', 'prefix', 'suffix'], unstyled: false, class: 'transition-colors duration-200' },
    { slots: ['prefix', 'suffix'], invalid: false, class: 'group-data-[focused]:text-highlighted group-not-[[data-focused]]:text-subtle' },
  ],

  compoundVariants: [
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

    { invalid: true, unstyled: false, class: { root: 'b-error outline-2 outline-error-4' } },

    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'sm', unstyled: false, class: { root: 'px-1.5' } },
    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'md', unstyled: false, class: { root: 'px-2.5' } },
    { radius: ['none', 'xs', 'sm', 'md', 'lg', 'xl'], size: 'lg', unstyled: false, class: { root: 'px-3' } },

    { radius: 'full', size: 'sm', unstyled: false, class: { root: 'px-2.25' } },
    { radius: 'full', size: 'md', unstyled: false, class: { root: 'px-3.5' } },
    { radius: 'full', size: 'lg', unstyled: false, class: { root: 'px-4' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'md',
  },
})

export type InputStyleSlots = typeof useInputStyle['slots']
export type InputStyleProps = VariantProps<typeof useInputStyle>
