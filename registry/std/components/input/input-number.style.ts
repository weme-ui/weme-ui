import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useInputNumberStyle = createVariants({
  slots: {
    base: 'group relative flex-(~ y-center) transition',
    input: 'flex-1 h-full text-center ring-inset outline-0 transition',
    decrement: 'rounded-r-0',
    increment: 'rounded-l-0',
  },

  variants: {
    color: { accent: '', neutral: '', info: '', success: '', warning: '', error: '' },
    variant: {
      normal: {
        base: 'bg-elevated hover:bg-neutral-5',
        input: 'focus:(bg-neutral-1 ring-1)',
      },
      outline: {
        base: 'ring-(~ default) hover:ring-neutral-7',
        decrement: 'b-(r default) group-hover:b-r-neutral-7',
        increment: 'b-(l default) group-hover:b-l-neutral-7',
      },
    },
    radius: {
      none: '',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    size: {
      xs: { base: 'text-xs h-5', decrement: 'size-5', increment: 'size-5' },
      sm: { base: 'text-xs h-6', decrement: 'size-6', increment: 'size-6' },
      md: { base: 'text-sm h-8', decrement: 'size-8', increment: 'size-8' },
      lg: { base: 'text-base h-10', decrement: 'size-10', increment: 'size-10' },
      xl: { base: 'text-lg h-12', decrement: 'size-12', increment: 'size-12' },
    },
  },

  compoundVariants: [
    { variant: 'normal', color: 'accent', class: { input: 'focus:ring-accent' } },
    { variant: 'normal', color: 'neutral', class: { input: 'focus:ring-neutral' } },
    { variant: 'normal', color: 'info', class: { input: 'focus:ring-info' } },
    { variant: 'normal', color: 'success', class: { input: 'focus:ring-success' } },
    { variant: 'normal', color: 'warning', class: { input: 'focus:ring-warning' } },
    { variant: 'normal', color: 'error', class: { input: 'focus:ring-error' } },
  ],

  compoundSlots: [
    { slots: ['decrement', 'increment'], class: 'flex-(~ center) rounded-inherit text-default transition-colors select-none' },
    { slots: ['decrement', 'increment'], variant: 'normal', class: 'hover:not-disabled:(bg-neutral-6 text-highlighted)' },
    { slots: ['decrement', 'increment'], variant: 'outline', class: 'hover:not-disabled:(bg-neutral-3 text-highlighted) active:not-disabled:bg-neutral-4' },
  ],

  defaultVariants: {
    color: 'accent',
    variant: 'normal',
    radius: 'sm',
    size: 'md',
  },
})

export type InputNumberStyleSlots = typeof useInputNumberStyle['slots']
export type InputNumberStyleProps = VariantProps<typeof useInputNumberStyle>
