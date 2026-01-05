import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useInputStyle = createVariants({
  slots: {
    root: 'group flex-(inline y-center)',
    prepend: '',
    wrapper: 'relative flex-1 rounded-inherit',
    prefix: '',
    icon: '',
    input: 'size-full text-highlighted outline-none leading-none placeholder:text-toned',
    clear: 'flex-(~ center) text-highlighted rounded-full transition-colors hover:bg-muted op-0',
    counter: 'text-toned',
    suffix: '',
    append: '',
  },

  variants: {
    variant: {
      soft: '',
      outline: { root: 'b' },
      line: {
        root: 'b-b bg-transparent',
      },
      none: '',
    },
    size: {
      xs: { root: 'h-5 text-2.5', clear: 'mr-1 p-0.5' },
      sm: { root: 'h-6 text-2.5', clear: 'mr-1.5 p-0.75' },
      md: { root: 'h-8 text-3', clear: 'mr-2 p-1' },
      lg: { root: 'h-10 text-3.5', clear: 'mr-2.5 p-1.25' },
      xl: { root: 'h-12 text-4', clear: 'mr-3 p-1.5' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
    clear: { true: { clear: 'group-hover:op-100' } },
    disabled: { true: { root: 'is-disabled' } },
    prepend: { true: '' },
    append: { true: '' },
    focused: { true: '' },
    readonly: { true: '' },
    invalid: { true: '' },
    overcount: { true: { counter: 'text-danger font-medium' } },
  },

  compoundSlots: [
    { slots: ['prefix', 'suffix'], class: 'flex-(~ center)' },
    { slots: ['prefix', 'suffix'], focused: true, disabled: false, readonly: false, invalid: false, class: 'text-highlighted' },

    { slots: ['prepend', 'wrapper', 'append'], class: 'flex-(~ y-center) h-full' },
    { slots: ['root', 'prepend', 'prefix', 'wrapper', 'suffix', 'append'], class: 'transition-colors' },

    { slots: ['prepend', 'wrapper', 'append'], variant: 'soft', class: 'b-(~ transparent)' },

    { size: 'xs', variant: ['soft', 'outline'], slots: ['prepend', 'append', 'input'], class: 'px-1.5' },
    { size: 'sm', variant: ['soft', 'outline'], slots: ['prepend', 'append', 'input'], class: 'px-2' },
    { size: 'md', variant: ['soft', 'outline'], slots: ['prepend', 'append', 'input'], class: 'px-2.5' },
    { size: 'lg', variant: ['soft', 'outline'], slots: ['prepend', 'append', 'input'], class: 'px-3' },
    { size: 'xl', variant: ['soft', 'outline'], slots: ['prepend', 'append', 'input'], class: 'px-3.5' },

    { slots: ['prepend', 'prefix', 'input', 'suffix', 'clear', 'append'], invalid: true, disabled: false, class: 'text-danger' },
  ],

  compoundVariants: [
    { variant: 'soft', focused: false, disabled: false, readonly: false, invalid: false, class: {
      root: 'bg-muted hover:bg-elevated',
      prepend: 'bg-muted',
      append: 'bg-muted',
    } },
    { variant: 'outline', focused: false, disabled: false, readonly: false, invalid: false, class: {
      root: 'b-default bg-neutral-1 hover:b-primary-7',
    } },
    { variant: 'line', focused: false, disabled: false, readonly: false, invalid: false, class: {
      root: 'b-default hover:b-primary-7',
    } },

    { variant: 'soft', focused: true, disabled: false, readonly: false, invalid: false, class: {
      root: 'bg-muted',
      wrapper: 'b-primary bg-neutral-1',
    } },
    { variant: 'outline', focused: true, disabled: false, readonly: false, invalid: false, class: {
      root: 'b-primary outline-(2 primary-4)',
    } },
    { variant: 'line', focused: true, disabled: false, readonly: false, invalid: false, class: {
      root: 'b-primary',
    } },

    { invalid: true, disabled: false, class: {
      prepend: 'text-danger',
      append: 'text-danger',
      input: 'placeholder:text-danger',
    } },
    { variant: ['soft', 'outline', 'line'], invalid: true, disabled: false, class: {
      root: 'b-danger bg-danger-3',
    } },
    { variant: 'soft', invalid: true, disabled: false, class: {
      root: 'b-1',
    } },

    { invalid: false, disabled: false, readonly: false, focused: false, class: {
      input: 'hover:placeholder:text-default',
    } },

    { variant: ['soft', 'outline'], invalid: false, prepend: true, class: { prepend: 'b-r-(1 default)' } },
    { variant: ['soft', 'outline'], invalid: false, append: true, class: { append: 'b-l-(1 default)' } },
    { variant: ['soft', 'outline'], invalid: true, prepend: true, class: { prepend: 'b-r-(1 danger)' } },
    { variant: ['soft', 'outline'], invalid: true, append: true, class: { append: 'b-l-(1 danger)' } },

    { size: 'xs', variant: 'line', class: { root: 'px-1.5' } },
    { size: 'sm', variant: 'line', class: { root: 'px-1.5' } },
    { size: 'md', variant: 'line', class: { root: 'px-1.5' } },
    { size: 'lg', variant: 'line', class: { root: 'px-2' } },
    { size: 'xl', variant: 'line', class: { root: 'px-2' } },

    { size: 'xs', variant: ['line', 'none'], class: { input: 'px-1.5', prefix: 'pl-1.5', suffix: 'pr-1.5', counter: 'pr-1.5' } },
    { size: 'sm', variant: ['line', 'none'], class: { input: 'px-1.5', prefix: 'pl-1.5', suffix: 'pr-1.5', counter: 'pr-1.5' } },
    { size: 'md', variant: ['line', 'none'], class: { input: 'px-1.5', prefix: 'pl-1.5', suffix: 'pr-1.5', counter: 'pr-1.5' } },
    { size: 'lg', variant: ['line', 'none'], class: { input: 'px-2', prefix: 'pl-2', suffix: 'pr-2', counter: 'pr-2' } },
    { size: 'xl', variant: ['line', 'none'], class: { input: 'px-2', prefix: 'pl-2', suffix: 'pr-2', counter: 'pr-2' } },

    { size: 'xs', variant: ['soft', 'outline'], class: { prefix: 'pl-1.5', suffix: 'pr-1.5', counter: 'pr-1.5' } },
    { size: 'sm', variant: ['soft', 'outline'], class: { prefix: 'pl-2', suffix: 'pr-2', counter: 'pr-2' } },
    { size: 'md', variant: ['soft', 'outline'], class: { prefix: 'pl-2.5', suffix: 'pr-2.5', counter: 'pr-2.5' } },
    { size: 'lg', variant: ['soft', 'outline'], class: { prefix: 'pl-3', suffix: 'pr-3', counter: 'pr-3' } },
    { size: 'xl', variant: ['soft', 'outline'], class: { prefix: 'pl-3.5', suffix: 'pr-3.5', counter: 'pr-3.5' } },

    { variant: ['soft', 'outline'], radius: 'xs', class: { root: 'rounded-xs' } },
    { variant: ['soft', 'outline'], radius: 'sm', class: { root: 'rounded-sm' } },
    { variant: ['soft', 'outline'], radius: 'md', class: { root: 'rounded-md' } },
    { variant: ['soft', 'outline'], radius: 'lg', class: { root: 'rounded-lg' } },
    { variant: ['soft', 'outline'], radius: 'xl', class: { root: 'rounded-xl' } },
    { variant: ['soft', 'outline'], radius: 'full', class: { root: 'rounded-full' } },

    { variant: ['soft', 'outline'], radius: 'xs', prepend: true, class: { prepend: 'rounded-l-xs', wrapper: 'rounded-l-none' } },
    { variant: ['soft', 'outline'], radius: 'sm', prepend: true, class: { prepend: 'rounded-l-sm', wrapper: 'rounded-l-none' } },
    { variant: ['soft', 'outline'], radius: 'md', prepend: true, class: { prepend: 'rounded-l-md', wrapper: 'rounded-l-none' } },
    { variant: ['soft', 'outline'], radius: 'lg', prepend: true, class: { prepend: 'rounded-l-lg', wrapper: 'rounded-l-none' } },
    { variant: ['soft', 'outline'], radius: 'xl', prepend: true, class: { prepend: 'rounded-l-xl', wrapper: 'rounded-l-none' } },
    { variant: ['soft', 'outline'], radius: 'full', prepend: true, class: { prepend: 'rounded-l-full', wrapper: 'rounded-l-none' } },

    { variant: ['soft', 'outline'], radius: 'xs', append: true, class: { append: 'rounded-r-xs', wrapper: 'rounded-r-none' } },
    { variant: ['soft', 'outline'], radius: 'sm', append: true, class: { append: 'rounded-r-sm', wrapper: 'rounded-r-none' } },
    { variant: ['soft', 'outline'], radius: 'md', append: true, class: { append: 'rounded-r-md', wrapper: 'rounded-r-none' } },
    { variant: ['soft', 'outline'], radius: 'lg', append: true, class: { append: 'rounded-r-lg', wrapper: 'rounded-r-none' } },
    { variant: ['soft', 'outline'], radius: 'xl', append: true, class: { append: 'rounded-r-xl', wrapper: 'rounded-r-none' } },
    { variant: ['soft', 'outline'], radius: 'full', append: true, class: { append: 'rounded-r-full', wrapper: 'rounded-r-none' } },
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
