import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useNumberInputStyle = createVariants({
  slots: {
    root: 'overflow-hidden',
    input: 'text-highlighted h-full flex-1 focus-visible:outline-none',
    decrement: '',
    increment: '',
  },

  variants: {
    variant: { soft: '', outline: '', line: '', none: '' },
    size: {
      xs: { root: 'h-5 text-2.5', input: 'px-1.5' },
      sm: { root: 'h-6 text-2.5', input: 'px-2' },
      md: { root: 'h-8 text-3', input: 'px-2.5' },
      lg: { root: 'h-10 text-3.5', input: 'px-3' },
      xl: { root: 'h-12 text-4', input: 'px-3.5' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
    orientation: {
      horizontal: { root: 'flex-(inline y-center)' },
      vertical: { root: 'grid-(~ rows-[1fr_1fr])', input: 'grid-row-span-2' },
    },
    disabled: {
      true: {
        decrement: 'is-disabled',
        increment: 'is-disabled',
        input: 'is-disabled',
      },
    },
    focused: { true: '' },
    invalid: { true: '' },
  },

  compoundSlots: [
    { slots: ['root', 'input', 'decrement', 'increment'], class: 'transition-colors' },
    { slots: ['decrement', 'increment'], class: 'flex-(~ center)' },
    { slots: ['decrement', 'increment'], disabled: false, invalid: false, class: 'text-default hover:text-highlighted' },
    { slots: ['decrement', 'increment'], disabled: false, invalid: false, variant: 'soft', class: 'hover:bg-elevated' },
    { slots: ['decrement', 'increment'], disabled: false, invalid: true, class: 'text-danger' },
    { slots: ['decrement', 'increment'], disabled: false, invalid: true, variant: 'soft', class: 'hover:bg-danger-5' },

    { slots: ['decrement', 'increment'], variant: ['soft', 'outline'], orientation: 'horizontal', size: 'xs', class: 'size-5' },
    { slots: ['decrement', 'increment'], variant: ['soft', 'outline'], orientation: 'horizontal', size: 'sm', class: 'size-6' },
    { slots: ['decrement', 'increment'], variant: ['soft', 'outline'], orientation: 'horizontal', size: 'md', class: 'size-8' },
    { slots: ['decrement', 'increment'], variant: ['soft', 'outline'], orientation: 'horizontal', size: 'lg', class: 'size-10' },
    { slots: ['decrement', 'increment'], variant: ['soft', 'outline'], orientation: 'horizontal', size: 'xl', class: 'size-12' },

    { slots: ['decrement', 'increment'], variant: ['line', 'none'], orientation: 'horizontal', class: 'rounded-full hover:bg-muted active:bg-elevated' },
    { slots: ['decrement', 'increment'], variant: ['line', 'none'], orientation: 'horizontal', size: 'xs', class: 'size-3' },
    { slots: ['decrement', 'increment'], variant: ['line', 'none'], orientation: 'horizontal', size: 'sm', class: 'size-4' },
    { slots: ['decrement', 'increment'], variant: ['line', 'none'], orientation: 'horizontal', size: 'md', class: 'size-5' },
    { slots: ['decrement', 'increment'], variant: ['line', 'none'], orientation: 'horizontal', size: 'lg', class: 'size-6' },
    { slots: ['decrement', 'increment'], variant: ['line', 'none'], orientation: 'horizontal', size: 'xl', class: 'size-7' },
  ],

  compoundVariants: [
    { orientation: 'vertical', size: 'xs', class: { root: 'grid-cols-[1fr_20px]' } },
    { orientation: 'vertical', size: 'sm', class: { root: 'grid-cols-[1fr_24px]' } },
    { orientation: 'vertical', size: 'md', class: { root: 'grid-cols-[1fr_28px]' } },
    { orientation: 'vertical', size: 'lg', class: { root: 'grid-cols-[1fr_32px]' } },
    { orientation: 'vertical', size: 'xl', class: { root: 'grid-cols-[1fr_36px]' } },

    { focused: false, disabled: false, invalid: false, class: { input: 'hover:placeholder:text-default' } },

    { variant: 'soft', focused: false, disabled: false, invalid: false, class: { input: 'hover:bg-elevated' } },
    { variant: 'soft', focused: true, disabled: false, invalid: false, class: { input: 'bg-neutral-1 b-primary' } },

    { variant: 'soft', invalid: false, disabled: false, class: { root: 'bg-muted', input: 'b-(~ transparent)' } },
    { variant: 'soft', invalid: true, disabled: false, class: {
      root: 'bg-danger-3',
      input: 'text-danger placeholder:text-danger',
      decrement: 'text-danger',
      increment: 'text-danger',
    } },

    { variant: ['soft', 'outline'], orientation: 'horizontal', disabled: false, invalid: false, class: { decrement: 'b-r-(~ default)', increment: 'b-l-(~ default)' } },
    { variant: ['soft', 'outline'], orientation: 'vertical', disabled: false, invalid: false, class: { decrement: 'b-t-(~ default) b-l-(~ default)', increment: 'b-l-(~ default)' } },

    { variant: 'outline', disabled: false, invalid: false, class: { root: 'b-(~ default)' } },
    { variant: 'outline', focused: false, disabled: false, invalid: false, class: { root: 'hover:b-primary-7', input: 'hover:b-x-primary-7' } },
    { variant: 'outline', focused: true, disabled: false, invalid: false, class: { root: 'b-primary outline-(2 primary-4)' } },

    { variant: 'outline', disabled: false, invalid: true, class: { root: 'b-(~ danger) bg-danger-3' } },

    { disabled: false, invalid: true, class: { input: 'text-danger placeholder:text-danger' } },

    { variant: 'line', disabled: false, invalid: false, class: { root: 'b-b-(~ default)' } },
    { variant: 'line', focused: false, disabled: false, invalid: false, class: { root: 'hover:b-b-primary-7' } },
    { variant: 'line', focused: true, disabled: false, invalid: false, class: { root: 'b-b-primary' } },

    { variant: 'line', disabled: false, invalid: true, class: { root: 'b-(b danger) bg-danger-3' } },

    { variant: ['soft', 'outline'], radius: 'xs', class: { root: 'rounded-xs' } },
    { variant: ['soft', 'outline'], radius: 'sm', class: { root: 'rounded-sm' } },
    { variant: ['soft', 'outline'], radius: 'md', class: { root: 'rounded-md' } },
    { variant: ['soft', 'outline'], radius: 'lg', class: { root: 'rounded-lg' } },
    { variant: ['soft', 'outline'], radius: 'xl', class: { root: 'rounded-xl' } },
    { variant: ['soft', 'outline'], radius: 'full', class: { root: 'rounded-full' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'sm',
    orientation: 'horizontal',
  },
})

export type NumberInputStyleSlots = typeof useNumberInputStyle['slots']
export type NumberInputStyleProps = VariantProps<typeof useNumberInputStyle>
