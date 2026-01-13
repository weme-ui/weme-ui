import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSliderStyle = createVariants({
  slots: {
    root: 'relative flex-(~ y-center) touch-none select-none',
    track: 'relative rounded-full transition-colors grow bg-muted hover:bg-elevated overflow-hidden',
    range: 'abs',
    thumb: 'transition-transform outline-2 hover:outline-3 focus:outline-3',
  },

  variants: {
    color: {
      primary: { range: 'bg-primary', thumb: 'bg-primary-1 text-primary outline-primary' },
      secondary: { range: 'bg-secondary', thumb: 'bg-secondary-1 text-secondary outline-secondary' },
      neutral: { range: 'bg-neutral', thumb: 'bg-neutral-1 text-neutral-12 outline-neutral' },
      info: { range: 'bg-info', thumb: 'bg-info-1 text-info outline-info' },
      success: { range: 'bg-success', thumb: 'bg-success-1 text-success outline-success' },
      warning: { range: 'bg-warning', thumb: 'bg-warning-1 text-warning outline-warning' },
      danger: { range: 'bg-danger', thumb: 'bg-danger-1 text-danger outline-danger' },
    },
    orientation: {
      horizontal: { root: 'w-full', range: 'h-full' },
      vertical: { root: 'flex-col h-full', range: 'w-full' },
    },
    radius: {
      none: '',
      xs: { thumb: 'rounded-xs' },
      sm: { thumb: 'rounded-sm' },
      md: { thumb: 'rounded-md' },
      lg: { thumb: 'rounded-lg' },
      xl: { thumb: 'rounded-xl' },
      full: { thumb: 'rounded-full' },
    },
    size: {
      xs: { thumb: 'size-1.5' },
      sm: { thumb: 'size-2' },
      md: { thumb: 'size-3' },
      lg: { thumb: 'size-4' },
      xl: { thumb: 'size-5' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
  },

  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: { root: 'h-1.5', track: 'h-0.5' } },
    { orientation: 'horizontal', size: 'sm', class: { root: 'h-2', track: 'h-0.75' } },
    { orientation: 'horizontal', size: 'md', class: { root: 'h-3', track: 'h-1' } },
    { orientation: 'horizontal', size: 'lg', class: { root: 'h-4', track: 'h-1.5' } },
    { orientation: 'horizontal', size: 'xl', class: { root: 'h-5', track: 'h-1.75' } },

    { orientation: 'vertical', size: 'xs', class: { root: 'w-1.5', track: 'w-0.5' } },
    { orientation: 'vertical', size: 'sm', class: { root: 'w-2', track: 'w-0.75' } },
    { orientation: 'vertical', size: 'md', class: { root: 'w-3', track: 'w-1' } },
    { orientation: 'vertical', size: 'lg', class: { root: 'w-4', track: 'w-1.5' } },
    { orientation: 'vertical', size: 'xl', class: { root: 'w-5', track: 'w-1.75' } },
  ],

  defaultVariants: {
    color: 'primary',
    orientation: 'horizontal',
    size: 'md',
    radius: 'full',
  },
})

export type SliderStyleSlots = typeof useSliderStyle['slots']
export type SliderStyleProps = VariantProps<typeof useSliderStyle>
