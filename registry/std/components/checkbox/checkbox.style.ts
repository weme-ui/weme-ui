import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCheckboxStyle = createVariants({
  slots: {
    root: 'flex-(~ y-center)',
    indicatorWrapper: 'flex-(~ center) bg-muted transition-colors hover:state-unchecked:bg-elevated',
    indicator: 'relative text-neutral-1 transition-transform animate-scale-in-big',
    wrapper: 'flex-(~ 1 col) text-highlighted items-start',
    label: 'leading-none state-checked:font-medium',
    description: 'text-toned leading-none state-checked:text-default',
    leading: '',
    trailing: '',
  },

  variants: {
    color: {
      primary: {
        indicatorWrapper: 'state-checked:bg-primary state-indeterminate:bg-primary',
      },
      secondary: {
        indicatorWrapper: 'state-checked:bg-secondary state-indeterminate:bg-secondary',
      },
      neutral: {
        indicatorWrapper: 'state-checked:bg-neutral state-indeterminate:bg-neutral',
      },
      info: {
        indicatorWrapper: 'state-checked:bg-info state-indeterminate:bg-info',
      },
      success: {
        indicatorWrapper: 'state-checked:bg-success state-indeterminate:bg-success',
      },
      warning: {
        indicatorWrapper: 'state-checked:bg-warning state-indeterminate:bg-warning',
      },
      danger: {
        indicatorWrapper: 'state-checked:bg-danger state-indeterminate:bg-danger',
      },
    },
    size: {
      xs: { root: 'gap-2', indicatorWrapper: 'size-3', indicator: 'size-2', wrapper: 'gap-0.5', label: 'text-3 h-3', description: 'text-xs' },
      sm: { root: 'gap-2.5', indicatorWrapper: 'size-3.5', indicator: 'size-2.5', wrapper: 'gap-0.5', label: 'text-3 h-3.5', description: 'text-xs' },
      md: { root: 'gap-3', indicatorWrapper: 'size-4', indicator: 'size-3', wrapper: 'gap-1', label: 'text-3.5 h-4', description: 'text-xs' },
      lg: { root: 'gap-3.5', indicatorWrapper: 'size-4.5', indicator: 'size-3.5', wrapper: 'gap-1', label: 'text-4 h-4.5', description: 'text-sm' },
      xl: { root: 'gap-4', indicatorWrapper: 'size-5', indicator: 'size-4', wrapper: 'gap-1', label: 'text-4 h-5', description: 'text-sm' },
    },
    radius: {
      none: '',
      xs: { indicatorWrapper: 'rounded-xs' },
      sm: { indicatorWrapper: 'rounded-sm' },
      md: { indicatorWrapper: 'rounded-md' },
      lg: { indicatorWrapper: 'rounded-lg' },
      xl: { indicatorWrapper: 'rounded-xl' },
      full: { indicatorWrapper: 'rounded-full' },
    },
    align: {
      start: { root: 'items-start' },
      center: { root: 'items-center' },
      end: { root: 'items-end' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
  },

  defaultVariants: {
    color: 'primary',
    size: 'md',
    radius: 'sm',
    align: 'start',
  },
})

export type CheckboxStyleSlots = typeof useCheckboxStyle['slots']
export type CheckboxStyleProps = VariantProps<typeof useCheckboxStyle>
