import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useInputStyle = createVariants({
  slots: {
    root: 'group flex-(inline y-center)',
    prepend: '',
    wrapper: 'flex-(~ 1 y-center)',
    prefix: '',
    icon: 'shrink-0',
    input: 'size-full leading-none outline-none',
    counter: '',
    clear: 'op-0 text-default transition-opacity hover:text-highlighted',
    suffix: '',
    append: '',
  },

  variants: {
    variant: { soft: '', outline: '', line: '', none: '' },
    size: {
      xs: { root: 'h-5 text-3', prefix: 'pl-1' },
      sm: { root: 'h-6 text-3', prefix: 'pl-1.5' },
      md: { root: 'h-8 text-3.5', prefix: 'pl-2.25' },
      lg: { root: 'h-10 text-4', prefix: 'pl-3', input: 'px-2.5' },
      xl: { root: 'h-12 text-4.5', prefix: 'pl-3.75', input: 'px-3' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
    prepend: { true: '' },
    prefix: { true: '' },
    suffix: { true: '' },
    append: { true: '' },
    clear: { true: { clear: 'group-hover:op-100' } },
    counter: { true: '' },
    focused: { true: '' },
    disabled: { true: { root: 'is-disabled' } },
    invalid: { true: '' },
    loading: { true: { root: 'is-loading' } },
    overcount: {
      true: { counter: 'text-danger' },
      false: { counter: 'text-toned' },
    },
  },

  compoundSlots: [
    { slots: ['root', 'wrapper', 'prefix', 'input', 'suffix'], class: 'transition-colors' },
    { slots: ['prepend', 'prefix', 'suffix', 'append', 'clear'], class: 'flex-(~ center)' },
    { slots: ['prepend', 'wrapper', 'append'], class: 'h-full' },

    { slots: ['prefix', 'suffix'], invalid: false, focused: false, class: 'text-toned group-hover:text-default' },
    { slots: ['prefix', 'suffix'], invalid: false, focused: true, class: 'text-highlighted' },
    { slots: ['prepend', 'prefix', 'input', 'suffix', 'append'], invalid: true, class: 'text-danger' },

    { slots: ['prepend', 'suffix', 'append'], size: 'xs', class: 'px-1' },
    { slots: ['prepend', 'suffix', 'append'], size: 'sm', class: 'px-1.5' },
    { slots: ['prepend', 'suffix', 'append'], size: 'md', class: 'px-2.25' },
    { slots: ['prepend', 'suffix', 'append'], size: 'lg', class: 'px-3' },
    { slots: ['prepend', 'suffix', 'append'], size: 'xl', class: 'px-3.75' },
  ],

  compoundVariants: [
    { invalid: false, class: { input: 'text-highlighted placeholder:text-toned' } },
    { invalid: true, class: { input: 'placeholder:text-danger' } },
    { invalid: false, focused: false, class: { input: 'group-hover:placeholder:text-default' } },

    { clear: true, invalid: true, class: { clear: 'text-danger hover:text-danger-10' } },
    { clear: true, counter: true, class: { clear: 'pr-1' } },

    { clear: true, suffix: false, counter: false, size: 'xs', class: { clear: 'pr-1' } },
    { clear: true, suffix: false, counter: false, size: 'sm', class: { clear: 'pr-1.5' } },
    { clear: true, suffix: false, counter: false, size: 'md', class: { clear: 'pr-2.25' } },
    { clear: true, suffix: false, counter: false, size: 'lg', class: { clear: 'pr-3' } },
    { clear: true, suffix: false, counter: false, size: 'xl', class: { clear: 'pr-3.75' } },

    { counter: true, suffix: false, size: 'xs', class: { counter: 'pr-1' } },
    { counter: true, suffix: false, size: 'sm', class: { counter: 'pr-1.5' } },
    { counter: true, suffix: false, size: 'md', class: { counter: 'pr-2.25' } },
    { counter: true, suffix: false, size: 'lg', class: { counter: 'pr-3' } },
    { counter: true, suffix: false, size: 'xl', class: { counter: 'pr-3.75' } },

    { variant: ['soft', 'outline'], size: 'xs', class: { input: 'pl-1' } },
    { variant: ['soft', 'outline'], size: 'sm', class: { input: 'pl-1.5' } },
    { variant: ['soft', 'outline'], size: 'md', class: { input: 'pl-2.25' } },
    { variant: ['soft', 'outline'], size: 'lg', class: { input: 'pl-2.5' } },
    { variant: ['soft', 'outline'], size: 'xl', class: { input: 'pl-3' } },

    { variant: ['line', 'none'], prepend: false, size: 'xs', class: { input: 'pl-1' } },
    { variant: ['line', 'none'], prepend: false, size: 'sm', class: { input: 'pl-1.5' } },
    { variant: ['line', 'none'], prepend: false, size: 'md', class: { input: 'pl-2.25' } },
    { variant: ['line', 'none'], prepend: false, size: 'lg', class: { input: 'pl-2.5' } },
    { variant: ['line', 'none'], prepend: false, size: 'xl', class: { input: 'pl-3' } },

    {
      variant: 'soft',
      invalid: false,
      class: {
        root: 'bg-muted',
        wrapper: 'b-(~ transparent)',
        prepend: 'b-(l y transparent) b-r-(~ elevated)',
        append: 'b-(r y transparent) b-l-(~ elevated)',
      },
    },
    { variant: 'soft', invalid: false, focused: false, class: { root: 'hover:bg-elevated' } },
    { variant: 'soft', invalid: false, focused: true, disabled: false, class: { wrapper: 'bg-primary-1 b-primary' } },
    { variant: 'soft', invalid: true, class: { root: 'bg-danger-3' } },

    {
      variant: 'outline',
      invalid: false,
      class: {
        root: 'b-(~ default)',
        prepend: 'b-(l y transparent) b-r-(~ default) group-hover:b-r-elevated',
        append: 'b-(r y transparent) b-l-(~ default) group-hover:b-l-elevated',
      },
    },
    { variant: 'outline', invalid: false, focused: false, class: { root: 'hover:b-elevated' } },
    { variant: 'outline', invalid: false, focused: true, disabled: false, class: { root: 'b-primary outline-primary-3' } },
    { variant: 'outline', invalid: true, class: { root: 'b-(~ danger)' } },

    { variant: 'line', invalid: false, class: { root: 'b-(b default)' } },
    { variant: 'line', invalid: false, focused: false, class: { root: 'hover:b-elevated' } },
    { variant: 'line', invalid: false, focused: true, disabled: false, class: { root: 'b-primary' } },
    { variant: 'line', invalid: true, class: { root: 'b-(b danger)' } },

    { variant: 'outline', size: 'xs', invalid: false, focused: true, class: { root: 'outline-2' } },
    { variant: 'outline', size: 'sm', invalid: false, focused: true, class: { root: 'outline-2' } },
    { variant: 'outline', size: 'md', invalid: false, focused: true, class: { root: 'outline-3' } },
    { variant: 'outline', size: 'lg', invalid: false, focused: true, class: { root: 'outline-4' } },
    { variant: 'outline', size: 'xl', invalid: false, focused: true, class: { root: 'outline-5' } },

    { variant: ['soft', 'outline'], radius: 'xs', class: { root: 'rounded-xs' } },
    { variant: ['soft', 'outline'], radius: 'sm', class: { root: 'rounded-sm' } },
    { variant: ['soft', 'outline'], radius: 'md', class: { root: 'rounded-md' } },
    { variant: ['soft', 'outline'], radius: 'lg', class: { root: 'rounded-lg' } },
    { variant: ['soft', 'outline'], radius: 'xl', class: { root: 'rounded-xl' } },
    { variant: ['soft', 'outline'], radius: 'full', class: { root: 'rounded-full', wrapper: 'pl-1' } },

    { variant: ['soft', 'outline'], radius: 'xs', append: true, class: { wrapper: 'rounded-l-xs' } },
    { variant: ['soft', 'outline'], radius: 'xs', prepend: true, class: { wrapper: 'rounded-r-xs' } },
    { variant: ['soft', 'outline'], radius: 'xs', append: true, prepend: true, class: { wrapper: 'rounded-xs' } },
    { variant: ['soft', 'outline'], radius: 'sm', append: true, class: { wrapper: 'rounded-l-sm' } },
    { variant: ['soft', 'outline'], radius: 'sm', prepend: true, class: { wrapper: 'rounded-r-sm' } },
    { variant: ['soft', 'outline'], radius: 'sm', append: true, prepend: true, class: { wrapper: 'rounded-sm' } },
    { variant: ['soft', 'outline'], radius: 'md', append: true, class: { wrapper: 'rounded-l-md' } },
    { variant: ['soft', 'outline'], radius: 'md', prepend: true, class: { wrapper: 'rounded-r-md' } },
    { variant: ['soft', 'outline'], radius: 'md', append: true, prepend: true, class: { wrapper: 'rounded-md' } },
    { variant: ['soft', 'outline'], radius: 'lg', append: true, class: { wrapper: 'rounded-l-lg' } },
    { variant: ['soft', 'outline'], radius: 'lg', prepend: true, class: { wrapper: 'rounded-r-lg' } },
    { variant: ['soft', 'outline'], radius: 'lg', append: true, prepend: true, class: { wrapper: 'rounded-lg' } },
    { variant: ['soft', 'outline'], radius: 'xl', append: true, class: { wrapper: 'rounded-l-xl' } },
    { variant: ['soft', 'outline'], radius: 'xl', prepend: true, class: { wrapper: 'rounded-r-xl' } },
    { variant: ['soft', 'outline'], radius: 'xl', append: true, prepend: true, class: { wrapper: 'rounded-xl' } },
    { variant: ['soft', 'outline'], radius: 'full', append: true, class: { wrapper: 'rounded-l-full' } },
    { variant: ['soft', 'outline'], radius: 'full', prepend: true, class: { wrapper: 'rounded-r-full' } },
    { variant: ['soft', 'outline'], radius: 'full', append: true, prepend: true, class: { wrapper: 'rounded-full' } },

    { variant: ['soft', 'outline'], append: false, prepend: false, class: { wrapper: 'rounded-inherit' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'sm',
    disabled: false,
    invalid: false,
  },
})

export type InputStyleSlots = typeof useInputStyle['slots']
export type InputStyleProps = VariantProps<typeof useInputStyle>
