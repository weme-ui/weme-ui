import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCheckboxStyle = createVariants({
  slots: {
    base: 'group flex-(~ y-center) outline-none select-none disabled:is-disabled',
    leading: '',
    trailing: '',
    wrapper: 'flex-(~ 1 col) items-start',
    label: 'text-highlighted leading-none group-state-checked:font-semibold',
    description: 'text-toned group-state-checked:text-highlighted',
    indicatorWrapper: 'flex-(~ center) bg-elevated group-hover:group-state-unchecked:bg-neutral-5',
    indicator: 'relative transition-transform animate-scale-in-big',
  },

  variants: {
    color: {
      accent: {
        indicatorWrapper: 'group-state-checked:bg-accent group-state-indeterminate:bg-accent',
        indicator: 'c-accent-1',
      },
      neutral: {
        indicatorWrapper: 'group-state-checked:bg-neutral group-state-indeterminate:bg-neutral',
        indicator: 'c-neutral-1',
      },
      info: {
        indicatorWrapper: 'group-state-checked:bg-info group-state-indeterminate:bg-info',
        indicator: 'c-info-1',
      },
      success: {
        indicatorWrapper: 'group-state-checked:bg-success group-state-indeterminate:bg-success',
        indicator: 'c-success-1',
      },
      warning: {
        indicatorWrapper: 'group-state-checked:bg-warning group-state-indeterminate:bg-warning',
        indicator: 'c-warning-1',
      },
      error: {
        indicatorWrapper: 'group-state-checked:bg-error group-state-indeterminate:bg-error',
        indicator: 'c-error-1',
      },
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
    },
    radius: {
      none: '',
      xs: { indicatorWrapper: 'rounded-xs' },
      sm: { indicatorWrapper: 'rounded-sm' },
      md: { indicatorWrapper: 'rounded-md' },
      lg: { indicatorWrapper: 'rounded-lg' },
      xl: { indicatorWrapper: 'rounded-xl' },
    },
    size: {
      sm: { base: 'gap-2.5', indicatorWrapper: 'size-3', indicator: 'size-2', wrapper: 'gap-1', description: 'text-xs' },
      md: { base: 'gap-3', indicatorWrapper: 'size-4', indicator: 'size-3', wrapper: 'gap-1', description: 'text-sm' },
      lg: { base: 'gap-4', indicatorWrapper: 'size-5', indicator: 'size-4', wrapper: 'gap-1.5', description: 'text-base' },
      xl: { base: 'gap-5', indicatorWrapper: 'size-6', indicator: 'size-5', wrapper: 'gap-1.5', description: 'text-base' },
    },
    fill: { true: 'flex-1' },
  },

  compoundSlots: [
    { slots: ['base', 'leading', 'trailing', 'indicatorWrapper', 'wrapper', 'label', 'description'], class: 'transition-colors' },

    { size: 'sm', slots: ['leading', 'trailing', 'wrapper'], class: 'text-sm' },
    { size: 'md', slots: ['leading', 'trailing', 'wrapper'], class: 'text-base' },
    { size: 'lg', slots: ['leading', 'trailing', 'wrapper'], class: 'text-lg' },
    { size: 'xl', slots: ['leading', 'trailing', 'wrapper'], class: 'text-xl' },

    { color: 'accent', slots: ['leading', 'trailing'], class: 'group-state-checked:c-accent' },
    { color: 'neutral', slots: ['leading', 'trailing'], class: 'group-state-checked:c-neutral' },
    { color: 'info', slots: ['leading', 'trailing'], class: 'group-state-checked:c-info' },
    { color: 'success', slots: ['leading', 'trailing'], class: 'group-state-checked:c-success' },
    { color: 'warning', slots: ['leading', 'trailing'], class: 'group-state-checked:c-warning' },
    { color: 'error', slots: ['leading', 'trailing'], class: 'group-state-checked:c-error' },
  ],

  defaultVariants: {
    color: 'accent',
    align: 'start',
    radius: 'sm',
    size: 'md',
  },
})

export type CheckboxStyleSlots = typeof useCheckboxStyle['slots']
export type CheckboxStyleProps = VariantProps<typeof useCheckboxStyle>
