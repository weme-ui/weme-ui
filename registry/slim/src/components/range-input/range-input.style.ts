import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useRangeInputStyle = createVariants({
  slots: {
    root: 'group w-fit relative',
    from: '',
    fromIcon: '',
    fromInput: '',
    separator: '',
    to: '',
    toInput: '',
    toIcon: '',
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
    unstyled: {
      false: {
        root: 'text-foreground b',
        separator: 'text-muted group-data-[focused]:text-foreground',
      },
    },
  },

  compoundSlots: [
    { slots: ['root', 'from', 'to'], unstyled: false, class: 'flex flex-y-center' },
    { slots: ['root', 'fromIcon', 'toIcon', 'separator'], unstyled: false, class: 'transition-colors' },

    { slots: ['fromInput', 'toInput'], unstyled: false, class: 'text-center outline-none leading-none size-full placeholder:text-subtle' },
    { slots: ['fromIcon', 'toIcon'], unstyled: false, class: 'flex flex-center [&>svg]:shrink-0' },

    { slots: ['fromIcon', 'toIcon'], size: 'sm', unstyled: false, class: 'size-6' },
    { slots: ['fromIcon', 'toIcon'], size: 'md', unstyled: false, class: 'size-8' },
    { slots: ['fromIcon', 'toIcon'], size: 'lg', unstyled: false, class: 'size-10' },
  ],

  compoundVariants: [
    { variant: 'soft', unstyled: false, class: { root: 'b-transparent bg-muted' } },
    { variant: 'outline', unstyled: false, class: { root: 'b-base bg-base' } },

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

export type RangeInputStyleSlots = typeof useRangeInputStyle['slots']
export type RangeInputStyleProps = VariantProps<typeof useRangeInputStyle>
