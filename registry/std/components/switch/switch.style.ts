import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSwitchStyle = createVariants({
  slots: {
    root: 'relative flex-(~ y-center) bg-muted transition-colors',
    thumb: 'flex-(~ center) my-auto transition-transform translate-x-0.5 will-change-transform state-checked:translate-x-full',
    icon: 'shrink-0 transition-colors',
  },

  variants: {
    color: {
      primary: { root: 'state-checked:bg-primary', thumb: 'bg-primary-1', icon: 'state-checked:text-primary' },
      secondary: { root: 'state-checked:bg-secondary', thumb: 'bg-secondary-1', icon: 'state-checked:text-secondary' },
      neutral: { root: 'state-checked:bg-neutral', thumb: 'bg-neutral-1', icon: 'state-checked:text-neutral' },
      info: { root: 'state-checked:bg-info', thumb: 'bg-info-1', icon: 'state-checked:text-info' },
      success: { root: 'state-checked:bg-success', thumb: 'bg-success-1', icon: 'state-checked:text-success' },
      warning: { root: 'state-checked:bg-warning', thumb: 'bg-warning-1', icon: 'state-checked:text-warning' },
      danger: { root: 'state-checked:bg-danger', thumb: 'bg-danger-1', icon: 'state-checked:text-danger' },
    },
    size: {
      xs: { root: 'w-5.5 h-3.5', thumb: 'size-2.5 text-2 shadow-sm' },
      sm: { root: 'w-6.5 h-4', thumb: 'size-3 text-2.5 shadow-sm' },
      md: { root: 'w-8.5 h-5', thumb: 'size-4 text-3.5 shadow-md' },
      lg: { root: 'w-10.5 h-6', thumb: 'size-5 text-4 shadow-md' },
      xl: { root: 'w-12.75 h-7.5', thumb: 'size-6 text-5 shadow-md' },
    },
    radius: {
      none: '',
      xs: { root: 'rounded-xs', thumb: 'rounded-xs' },
      sm: { root: 'rounded-sm', thumb: 'rounded-xs' },
      md: { root: 'rounded-md', thumb: 'rounded-sm' },
      lg: { root: 'rounded-lg', thumb: 'rounded-md' },
      xl: { root: 'rounded-xl', thumb: 'rounded-xl' },
      full: { root: 'rounded-full', thumb: 'rounded-full' },
    },
    disabled: { true: { root: 'is-disabled' } },
    loading: { true: { root: 'is-loading', icon: 'animate-spin' } },
  },

  defaultVariants: {
    color: 'primary',
    size: 'md',
    radius: 'full',
  },
})

export type SwitchStyleSlots = typeof useSwitchStyle['slots']
export type SwitchStyleProps = VariantProps<typeof useSwitchStyle>
