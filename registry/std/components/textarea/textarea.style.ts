import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTextareaStyle = createVariants({
  slots: {
    base: 'relative p-1 transition-colors',
    textarea: [
      'block size-full px-2 py-1.5 text-(base highlighted) leading-relaxed outline-none overflow-auto',
      'placeholder:text-toned disabled:is-disabled',
    ],
    count: 'abs bottom-2 right-4 select-none text-(xs toned)',
  },

  variants: {
    color: { accent: '', neutral: '', info: '', success: '', warning: '', error: '' },
    variant: {
      normal: 'bg-elevated data-[focused]:(bg-neutral-1 outline-1 ring-3) [&:hover:not([data-focused])]:bg-neutral-5',
      outline: 'ring-(1 default) data-[focused]:(outline-1 ring-3) [&:hover:not([data-focused])]:ring-neutral-8',
      none: '',
    },
    radius: {
      none: '',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
  },

  compoundVariants: [
    { variant: ['normal', 'outline'], color: 'accent', class: { base: 'data-[focused]:(outline-accent ring-accent-4)' } },
    { variant: ['normal', 'outline'], color: 'neutral', class: { base: 'data-[focused]:(outline-neutral ring-neutral-4)' } },
    { variant: ['normal', 'outline'], color: 'info', class: { base: 'data-[focused]:(outline-info ring-info-4)' } },
    { variant: ['normal', 'outline'], color: 'success', class: { base: 'data-[focused]:(outline-success ring-success-4)' } },
    { variant: ['normal', 'outline'], color: 'warning', class: { base: 'data-[focused]:(outline-warning ring-warning-4)' } },
    { variant: ['normal', 'outline'], color: 'error', class: { base: 'data-[focused]:(outline-error ring-error-4)' } },
  ],

  defaultVariants: {
    color: 'accent',
    variant: 'normal',
    radius: 'sm',
  },
})

export type TextareaStyleSlots = typeof useTextareaStyle['slots']
export type TextareaStyleProps = VariantProps<typeof useTextareaStyle>
