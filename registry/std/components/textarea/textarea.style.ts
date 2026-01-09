import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTextareaStyle = createVariants({
  slots: {
    root: 'relative transition-colors',
    textarea: 'block size-full px-3 py-2 text-sm rounded-inherit transition-colors caret-primary leading-relaxed',
    counter: 'abs bottom-3 right-3 px-2 py-0.25 rounded-full bg-muted text-xs pointer-events-none',
  },

  variants: {
    variant: { soft: '', outline: '', line: '', none: { textarea: 'outline-none' } },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '' },
    disabled: { true: { root: 'is-disabled' } },
    focused: { true: '' },
    invalid: { true: '' },
    overcount: { true: { counter: 'text-danger font-medium' } },
    autoSize: {
      true: { textarea: 'resize' },
      false: { textarea: 'resize-none' },
    },
  },

  compoundVariants: [
    { invalid: true, class: { textarea: 'text-danger placeholder:text-danger', counter: 'text-danger bg-danger-5' } },
    { disabled: false, focused: true, invalid: false, class: { textarea: 'text-highlighted placeholder:text-toned' } },
    { disabled: false, focused: false, invalid: false, class: { textarea: 'text-highlighted placeholder:text-toned hover:placeholder:text-default' } },

    { variant: 'soft', invalid: false, disabled: false, focused: false, class: { root: 'bg-muted b-(~ transparent) hover:bg-elevated' } },
    { variant: 'soft', invalid: false, disabled: false, focused: true, class: { root: 'bg-neutral-1 b-(~ primary)', textarea: 'outline-none' } },
    { variant: 'soft', invalid: true, class: { root: 'bg-danger-3', textarea: 'outline-none' } },

    { variant: 'outline', invalid: false, disabled: false, focused: false, class: { root: 'bg-neutral-1 b-(~ default) hover:b-primary-7' } },
    { variant: 'outline', invalid: false, disabled: false, focused: true, class: { root: 'bg-neutral-1 b-(~ primary) outline-(3 primary-3)', textarea: 'outline-none' } },
    { variant: 'outline', invalid: true, class: { root: 'b-(~ danger)', textarea: 'outline-none' } },

    { variant: 'line', invalid: false, disabled: false, focused: false, class: { root: 'b-(b default) hover:b-primary-7' } },
    { variant: 'line', invalid: false, disabled: false, focused: true, class: { root: 'b-(b primary)', textarea: 'outline-none' } },
    { variant: 'line', invalid: true, class: { root: 'b-(b danger)', textarea: 'outline-none' } },

    { variant: ['soft', 'outline'], radius: 'xs', class: { root: 'rounded-xs' } },
    { variant: ['soft', 'outline'], radius: 'sm', class: { root: 'rounded-sm' } },
    { variant: ['soft', 'outline'], radius: 'md', class: { root: 'rounded-md' } },
    { variant: ['soft', 'outline'], radius: 'lg', class: { root: 'rounded-lg' } },
    { variant: ['soft', 'outline'], radius: 'xl', class: { root: 'rounded-xl' } },
  ],

  defaultVariants: {
    variant: 'soft',
    radius: 'sm',
    disabled: false,
    focused: false,
    invalid: false,
    overcount: false,
    autoSize: false,
  },
})

export type TextareaStyleSlots = typeof useTextareaStyle['slots']
export type TextareaStyleProps = VariantProps<typeof useTextareaStyle>
