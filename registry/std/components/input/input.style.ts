import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useInputStyle = createVariants({
  slots: {
    base: 'group relative flex-(~ y-center) transition',
    input: 'flex-1 h-full bg-transparent rounded-inherit text-highlighted leading-none outline-none transition-colors placeholder:text-toned',
    leading: '',
    trailing: '',
    prepend: '',
    append: '',
    count: '',
    clear: [
      'relative hidden group-hover:block',
      'after:(abs abs-center block content-[""] rounded-full transition-opacity bg-current op-0)',
      'hover:after:op-20 active:after:op-30',
    ],
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
      full: 'rounded-full',
    },
    size: {
      xs: { base: 'text-xs h-5 px-2', leading: 'pr-1.5', trailing: 'pl-1.5', prepend: 'pr-1.5', append: 'pl-1.5', clear: 'mr-1.5 after:size-4' },
      sm: { base: 'text-xs h-6 px-2', leading: 'pr-1.5', trailing: 'pl-1.5', prepend: 'pr-1.5', append: 'pl-1.5', clear: 'mr-1.5 after:size-4.5' },
      md: { base: 'text-sm h-8 px-3', leading: 'pr-2', trailing: 'pl-2', prepend: 'pr-2', append: 'pl-2', clear: 'mr-2 after:size-5' },
      lg: { base: 'text-base h-10 px-3', leading: 'pr-2', trailing: 'pl-2', prepend: 'pr-2', append: 'pl-2', clear: 'mr-2 after:size-6' },
      xl: { base: 'text-lg h-12 px-3.5', leading: 'pr-2', trailing: 'pl-2', prepend: 'pr-2', append: 'pl-2', clear: 'mr-2 after:size-7.5' },
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

  compoundSlots: [
    { slots: ['leading', 'trailing', 'prepend', 'append', 'count'], class: 'text-toned transition-colors select-none group-data-[focused]:text-default' },
    { slots: ['leading', 'trailing', 'prepend', 'append'], class: 'flex-(~ center)' },
  ],

  defaultVariants: {
    color: 'accent',
    variant: 'normal',
    size: 'md',
    radius: 'sm',
  },
})

export type InputStyleSlots = typeof useInputStyle['slots']
export type InputStyleProps = VariantProps<typeof useInputStyle>
