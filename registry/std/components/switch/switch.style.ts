import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSwitchStyle = createVariants({
  slots: {
    base: 'relative flex-(~ y-center) cursor-default bg-elevated transition-colors disabled:is-disabled',
    thumb: [
      'flex-(~ center) my-auto shadow-md rounded-inherit',
      'transition-transform translate-x-0.5 will-change-transform state-checked:translate-x-full',
    ],
  },

  variants: {
    color: {
      accent: { base: 'state-checked:bg-accent', thumb: 'c-accent bg-accent-1' },
      neutral: { base: 'state-checked:bg-neutral', thumb: 'c-neutral bg-neutral-1' },
      info: { base: 'state-checked:bg-info', thumb: 'c-info bg-info-1' },
      success: { base: 'state-checked:bg-success', thumb: 'c-success bg-success-1' },
      warning: { base: 'state-checked:bg-warning', thumb: 'c-warning bg-warning-1' },
      error: { base: 'state-checked:bg-error', thumb: 'c-error bg-error-1' },
    },
    radius: {
      none: '',
      sm: { base: 'rounded-sm' },
      md: { base: 'rounded-md' },
      lg: { base: 'rounded-lg' },
      xl: { base: 'rounded-xl' },
      full: { base: 'rounded-full' },
    },
    size: {
      xs: { base: 'w-5.5 h-3.5', thumb: 'size-2.5 text-2' },
      sm: { base: 'w-6.5 h-4', thumb: 'size-3 text-2.5' },
      md: { base: 'w-8.5 h-5', thumb: 'size-4 text-3' },
      lg: { base: 'w-10.5 h-6', thumb: 'size-5 text-3.5' },
    },
  },

  defaultVariants: {
    color: 'accent',
    radius: 'full',
    size: 'md',
  },
})

export type SwitchStyleSlots = typeof useSwitchStyle['slots']
export type SwitchStyleProps = VariantProps<typeof useSwitchStyle>
