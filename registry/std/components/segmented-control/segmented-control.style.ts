import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSegmentedControlStyle = createVariants({
  slots: {
    root: 'relative flex place-self-start',
    item: 'relative flex-(~ center) text-highlighted transition-colors z-1 state-checked:font-medium data-[disabled]:is-disabled',
    icon: 'shrink-0',
    label: 'select-none',
    indicator: 'abs duration-200 ease-in-out',
  },

  variants: {
    color: {
      primary: { root: 'bg-muted', item: 'state-checked:text-primary focus-visible:outline-primary', indicator: 'bg-primary-1 shadow-primary/15' },
      secondary: { root: 'bg-secondary-3', item: 'state-checked:text-secondary focus-visible:outline-secondary', indicator: 'bg-secondary-1 shadow-secondary/15' },
      neutral: { root: 'bg-neutral-3', item: 'state-checked:text-neutral-12 focus-visible:outline-neutral', indicator: 'bg-neutral-1 shadow-neutral/15' },
      info: { root: 'bg-info-3', item: 'state-checked:text-info focus-visible:outline-info', indicator: 'bg-info-1 shadow-info/15' },
      success: { root: 'bg-success-3', item: 'state-checked:text-success focus-visible:outline-success', indicator: 'bg-success-1 shadow-success/15' },
      warning: { root: 'bg-warning-3', item: 'state-checked:text-warning focus-visible:outline-warning', indicator: 'bg-warning-1 shadow-warning/15' },
      danger: { root: 'bg-danger-3', item: 'state-checked:text-danger focus-visible:outline-danger', indicator: 'bg-danger-1 shadow-danger/15' },
    },
    orientation: {
      horizontal: {
        indicator: 'w-$segmented-control-indicator-size left-$segmented-control-indicator-position transition-[width,left] will-change-[width,left]',
      },
      vertical: {
        root: 'flex-col',
        indicator: 'h-$segmented-control-indicator-size top-$segmented-control-indicator-position transition-[height,top] will-change-[height,top]',
      },
    },
    size: {
      xs: { root: 'p-0.5 gap-0.5', item: 'px-1.5 h-4 gap-0.75 text-xs', indicator: 'h-4 shadow-xs' },
      sm: { root: 'p-1 gap-1', item: 'px-2.5 h-4 gap-1 text-xs', indicator: 'h-4 shadow-sm' },
      md: { root: 'p-1 gap-1', item: 'px-3 h-6 gap-1.5 text-sm', indicator: 'h-6 shadow-sm' },
      lg: { root: 'p-1 gap-1', item: 'px-4 h-8 gap-2 text-sm', indicator: 'h-8 shadow-sm' },
      xl: { root: 'p-1.5 gap-1.5', item: 'px-5 h-9 gap-2.5 text-base', indicator: 'h-9 shadow' },
    },
    radius: {
      none: '',
      xs: { root: 'rounded-xs', indicator: 'rounded-xs' },
      sm: { root: 'rounded-sm', indicator: 'rounded-xs' },
      md: { root: 'rounded-md', indicator: 'rounded-sm' },
      lg: { root: 'rounded-lg', indicator: 'rounded-md' },
      xl: { root: 'rounded-xl', indicator: 'rounded-lg' },
      full: { root: 'rounded-full', indicator: 'rounded-full' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
  },

  compoundVariants: [
    { orientation: 'vertical', size: 'xs', class: { indicator: 'left-0.5 right-0.5' } },
    { orientation: 'vertical', size: 'sm', class: { indicator: 'left-1 right-1' } },
    { orientation: 'vertical', size: 'md', class: { indicator: 'left-1 right-1' } },
    { orientation: 'vertical', size: 'lg', class: { indicator: 'left-1 right-1' } },
    { orientation: 'vertical', size: 'xl', class: { indicator: 'left-1.5 right-1.5' } },
  ],

  defaultVariants: {
    color: 'primary',
    orientation: 'horizontal',
    size: 'md',
    radius: 'sm',
  },
})

export type SegmentedControlStyleSlots = typeof useSegmentedControlStyle['slots']
export type SegmentedControlStyleProps = VariantProps<typeof useSegmentedControlStyle>
