import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePinInputStyle = createVariants({
  slots: {
    root: 'flex-(inline y-center)',
    input: 'flex-(~ center) text-center leading-none font-medium transition-colors',
  },

  variants: {
    variant: { soft: '', outline: '', line: '', none: '' },
    size: {
      xs: { root: 'gap-1', input: 'size-5 text-3' },
      sm: { root: 'gap-1.5', input: 'size-6 text-3' },
      md: { root: 'gap-2', input: 'size-8 text-3.5' },
      lg: { root: 'gap-2.5', input: 'size-10 text-4' },
      xl: { root: 'gap-4', input: 'size-12 text-4.5' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
    invalid: { true: '' },
    focused: { true: '' },
    disabled: { true: { input: 'is-disabled' } },
  },

  compoundVariants: [
    { invalid: false, class: { input: 'text-highlighted' } },
    { invalid: false, focused: false, class: { input: 'placeholder:text-toned hover:placeholder:text-default' } },

    { variant: 'soft', invalid: false, focused: false, class: { input: 'bg-muted hover:bg-elevated' } },
    { variant: 'soft', invalid: false, focused: true, class: { input: 'bg-neutral-1 b-(~ primary) outline-none' } },
    { variant: 'soft', invalid: true, class: { input: 'bg-danger-3 text-danger placeholder:text-danger' } },

    { variant: 'outline', invalid: false, focused: false, class: { input: 'bg-neutral-1 b-(~ default) hover:b-primary-7' } },
    { variant: 'outline', invalid: false, focused: true, class: { input: 'bg-neutral-1 b-(~ primary) outline-primary-4' } },
    { variant: 'outline', invalid: true, class: { input: ' b-(~ danger) bg-danger-3 text-danger placeholder:text-danger outline-none' } },

    { variant: 'outline', size: 'xs', invalid: false, focused: true, class: { input: 'outline-2' } },
    { variant: 'outline', size: 'sm', invalid: false, focused: true, class: { input: 'outline-2' } },
    { variant: 'outline', size: 'md', invalid: false, focused: true, class: { input: 'outline-3' } },
    { variant: 'outline', size: 'lg', invalid: false, focused: true, class: { input: 'outline-4' } },
    { variant: 'outline', size: 'xl', invalid: false, focused: true, class: { input: 'outline-5' } },

    { variant: 'line', invalid: false, focused: false, class: { input: 'b-(b default) hover:b-primary-7' } },
    { variant: 'line', invalid: false, focused: true, class: { input: 'b-(b primary) outline-none' } },
    { variant: 'line', invalid: true, class: { input: 'bg-danger-3 text-danger placeholder:text-danger outline-none' } },

    { variant: 'none', invalid: false, focused: true, class: { input: 'outline-primary' } },
    { variant: 'none', invalid: true, class: { input: 'text-danger placeholder:text-danger outline-none' } },

    { variant: ['soft', 'outline', 'none'], radius: 'xs', class: { input: 'rounded-xs' } },
    { variant: ['soft', 'outline', 'none'], radius: 'sm', class: { input: 'rounded-sm' } },
    { variant: ['soft', 'outline', 'none'], radius: 'md', class: { input: 'rounded-md' } },
    { variant: ['soft', 'outline', 'none'], radius: 'lg', class: { input: 'rounded-lg' } },
    { variant: ['soft', 'outline', 'none'], radius: 'xl', class: { input: 'rounded-xl' } },
    { variant: ['soft', 'outline', 'none'], radius: 'full', class: { input: 'rounded-full' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'sm',
  },
})

export type PinInputStyleSlots = typeof usePinInputStyle['slots']
export type PinInputStyleProps = VariantProps<typeof usePinInputStyle>
