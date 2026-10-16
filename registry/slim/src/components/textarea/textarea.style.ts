import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTextareaStyle = createVariants({
  slots: {
    root: 'h-fit transition-colors duration-200 relative',
    textarea: 'leading-relaxed outline-none rounded-inherit size-full block',
    innerWrapper: 'abs',
    counter: 'block pointer-events-none select-none',
    loader: '',
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
    },
    size: {
      sm: { root: 'text-xs', textarea: 'p-xs', innerWrapper: 'bottom-1 right-1' },
      md: { root: 'text-sm', textarea: 'p-sm', innerWrapper: 'bottom-1.5 right-1.5' },
      lg: { root: 'text-base', textarea: 'p-md', innerWrapper: 'bottom-2 right-2' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    loading: {
      true: { root: 'is-loading', loader: 'animate-spin' },
    },
    overcount: {
      true: { counter: 'text-error' },
    },
    autosize: {
      true: { textarea: 'resize-y' },
      false: { textarea: 'resize-none' },
    },
    unstyled: {
      false: {
        root: 'b',
        textarea: 'placeholder:text-subtle',
        counter: 'text-(xs nowrap) px-sm py-0.5 b b-base rounded-full bg-elevated/80',
      },
    },
    invalid: { true: {} },
  },

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
    { overcount: false, unstyled: false, class: { counter: 'text-subtle' } },
  ],

  defaultVariants: {
    variant: 'soft',
    radius: 'md',
    size: 'md',
  },
})

export type TextareaStyleSlots = typeof useTextareaStyle['slots']
export type TextareaStyleProps = VariantProps<typeof useTextareaStyle>
