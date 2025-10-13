import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSliderStyle = createVariants({
  slots: {
    base: 'relative flex items-center select-none touch-none',
    track: 'relative bg-elevated overflow-hidden rounded-full grow',
    range: 'abs rounded-full',
    thumb: 'rounded-full ring-2 transition focus-visible:(outline-2 outline-offset-2) hover:(outline-2 outline-offset-2)',
  },

  variants: {
    color: {
      accent: { range: 'bg-accent', thumb: 'bg-accent-1 ring-accent focus-visible:outline-accent/50 hover:outline-accent/30' },
      neutral: { range: 'bg-neutral', thumb: 'bg-neutral-1 ring-neutral focus-visible:outline-neutral/50 hover:outline-neutral/30' },
      info: { range: 'bg-info', thumb: 'bg-info-1 ring-info focus-visible:outline-info/50 hover:outline-info/30' },
      success: { range: 'bg-success', thumb: 'bg-success-1 ring-success focus-visible:outline-success/50 hover:outline-success/30' },
      warning: { range: 'bg-warning', thumb: 'bg-warning-1 ring-warning focus-visible:outline-warning/50 hover:outline-warning/30' },
      error: { range: 'bg-error', thumb: 'bg-error-1 ring-error focus-visible:outline-error/50 hover:outline-error/30' },
    },
    orientation: {
      horizontal: {
        base: 'w-full',
        range: 'h-full',
      },
      vertical: {
        base: 'flex-col h-full',
        range: 'w-full',
      },
    },
    size: {
      xs: { thumb: 'size-3' },
      sm: { thumb: 'size-3.5' },
      md: { thumb: 'size-4' },
      lg: { thumb: 'size-4.5' },
      xl: { thumb: 'size-5' },
    },
    disabled: {
      true: 'is-disabled',
    },
  },

  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: { track: 'h-1' } },
    { orientation: 'horizontal', size: 'sm', class: { track: 'h-1.5' } },
    { orientation: 'horizontal', size: 'md', class: { track: 'h-2' } },
    { orientation: 'horizontal', size: 'lg', class: { track: 'h-2.5' } },
    { orientation: 'horizontal', size: 'xl', class: { track: 'h-3' } },

    { orientation: 'vertical', size: 'xs', class: { track: 'w-1' } },
    { orientation: 'vertical', size: 'sm', class: { track: 'w-1.5' } },
    { orientation: 'vertical', size: 'md', class: { track: 'w-2' } },
    { orientation: 'vertical', size: 'lg', class: { track: 'w-2.5' } },
    { orientation: 'vertical', size: 'xl', class: { track: 'w-3' } },
  ],

  defaultVariants: {
    color: 'accent',
    orientation: 'horizontal',
    size: 'md',
  },
})

export type SliderStyleSlots = typeof useSliderStyle['slots']
export type SliderStyleProps = VariantProps<typeof useSliderStyle>
