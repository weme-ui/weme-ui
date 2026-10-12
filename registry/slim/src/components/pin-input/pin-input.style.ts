import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePinInputStyle = createVariants({
  slots: {
    root: 'flex w-fit flex-y-center',
    input: 'leading-none font-medium text-center flex flex-center',
  },

  variants: {
    variant: { soft: '', outline: '' },
    size: {
      sm: { root: 'gap-xs', input: 'text-xs size-6' },
      md: { root: 'gap-sm', input: 'text-sm size-8' },
      lg: { root: 'gap-md', input: 'text-base size-10' },
    },
    radius: {
      none: { input: 'rounded-none' },
      xs: { input: 'rounded-xs' },
      sm: { input: 'rounded-sm' },
      md: { input: 'rounded-md' },
      lg: { input: 'rounded-lg' },
      xl: { input: 'rounded-xl' },
      full: { input: 'rounded-full' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    invalid: { true: {} },
    unstyled: {
      false: { root: 'transition-colors', input: 'text-foreground' },
    },
  },

  compoundVariants: [
    { variant: 'soft', unstyled: false, class: { input: 'b b-transparent bg-muted' } },
    { variant: 'outline', unstyled: false, class: { input: 'b b-base bg-base' } },

    {
      variant: 'soft',
      invalid: false,
      unstyled: false,
      class: {
        input: 'bg-muted focus:(bg-base b-accent outline-2 outline-accent-4) hover:not-focus:bg-elevated',
      },
    },
    {
      variant: 'outline',
      invalid: false,
      unstyled: false,
      class: {
        input: 'focus:(bg-base b-accent outline-2 outline-accent-4) hover:not-focus:b-elevated',
      },
    },

    { variant: ['soft', 'outline'], invalid: true, unstyled: false, class: { input: 'b-error outline-2 outline-error-4' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
  },
})

export type PinInputStyleSlots = typeof usePinInputStyle['slots']
export type PinInputStyleProps = VariantProps<typeof usePinInputStyle>
