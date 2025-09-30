import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useInputPinStyle = createVariants({
  slots: {
    base: 'relative flex-(~ y-center)',
    input: [
      'rounded-inherit text-(highlighted center) transition leading-none transition-colors outline-0',
      'placeholder:text-toned focus:(bg-neutral-1 ring-3 outline-1)',
    ],
  },

  variants: {
    color: { accent: '', neutral: '', info: '', success: '', warning: '', error: '' },
    variant: {
      normal: {
        input: 'bg-elevated hover:bg-neutral-5',
      },
      outline: {
        input: 'ring-(1 default)',
      },
    },
    radius: {
      none: '',
      xs: { input: 'rounded-xs' },
      sm: { input: 'rounded-sm' },
      md: { input: 'rounded-md' },
      lg: { input: 'rounded-lg' },
      xl: { input: 'rounded-xl' },
      full: { input: 'rounded-full' },
    },
    size: {
      xs: { base: 'gap-1', input: 'size-5 text-xs' },
      sm: { base: 'gap-1.5', input: 'size-6 text-xs' },
      md: { base: 'gap-2', input: 'size-8 text-sm' },
      lg: { base: 'gap-2.5', input: 'size-10 text-base' },
      xl: { base: 'gap-3', input: 'size-12 text-lg' },
    },
  },

  compoundVariants: [
    { variant: ['normal', 'outline'], color: 'accent', class: { input: 'focus:(outline-accent ring-accent-4)' } },
    { variant: ['normal', 'outline'], color: 'neutral', class: { input: 'focus:(outline-neutral ring-neutral-4)' } },
    { variant: ['normal', 'outline'], color: 'info', class: { input: 'focus:(outline-info ring-info-4)' } },
    { variant: ['normal', 'outline'], color: 'success', class: { input: 'focus:(outline-success ring-success-4)' } },
    { variant: ['normal', 'outline'], color: 'warning', class: { input: 'focus:(outline-warning ring-warning-4)' } },
    { variant: ['normal', 'outline'], color: 'error', class: { input: 'focus:(outline-error ring-error-4)' } },
  ],

  defaultVariants: {
    color: 'accent',
    variant: 'normal',
    size: 'md',
    radius: 'sm',
  },
})

export type InputPinStyleSlots = typeof useInputPinStyle['slots']
export type InputPinStyleProps = VariantProps<typeof useInputPinStyle>
