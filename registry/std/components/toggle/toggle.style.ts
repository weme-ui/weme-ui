import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useToggleStyle = createVariants({
  base: [
    'flex-(inline center) gap-(x-1.5 y-1) bg-transparent select-none',
    'focus-visible:outline-hidden disabled:is-disabled',
  ],

  variants: {
    color: {
      accent: 'hover:(bg-accent-3 text-accent) state-on:(bg-accent-3 text-accent) hover:state-on:bg-accent-4',
      neutral: 'hover:(bg-neutral-3 text-neutral) state-on:(bg-neutral-3 text-neutral) hover:state-on:bg-neutral-4',
      info: 'hover:(bg-info-3 text-info) state-on:(bg-info-3 text-info) hover:state-on:bg-info-4',
      success: 'hover:(bg-success-3 text-success) state-on:(bg-success-3 text-success) hover:state-on:bg-success-4',
      warning: 'hover:(bg-warning-3 text-warning) state-on:(bg-warning-3 text-warning) hover:state-on:bg-warning-4',
      error: 'hover:(bg-error-3 text-error) state-on:(bg-error-3 text-error) hover:state-on:bg-error-4',
    },
    orientation: {
      horizontal: '',
      vertical: 'flex-col',
    },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    size: {
      xs: 'min-h-5 px-1 min-w-5 text-3',
      sm: 'min-h-6 px-1.5 min-w-6 text-xs',
      md: 'min-h-8 px-2 min-w-8 text-sm',
      lg: 'min-h-10 px-2.5 min-w-10 text-base',
    },
  },

  compoundVariants: [
    { orientation: 'vertical', size: 'xs', class: 'py-1' },
    { orientation: 'vertical', size: 'sm', class: 'py-1.5' },
    { orientation: 'vertical', size: 'md', class: 'py-2' },
    { orientation: 'vertical', size: 'lg', class: 'py-2.5' },
  ],

  defaultVariants: {
    color: 'accent',
    orientation: 'horizontal',
    radius: 'sm',
    size: 'sm',
  },
})

export type ToggleStyleProps = VariantProps<typeof useToggleStyle>
