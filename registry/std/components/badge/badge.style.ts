import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useBadgeStyle = createVariants({
  slots: {
    base: 'flex-(inline center) cursor-default select-none transition-colors',
    icon: '',
    close: [
      'relative flex-(~ center) c-current ml-1',
      'hover:before:(abs abs-center block content-[""] rounded-full transition-opacity bg-current op-20)',
      'active:before:op-30',
    ],
  },
  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', inverse: '' },
    size: {
      xs: { base: 'text-xs gap-1 h-5 px-1.5 leading-none', icon: 'size-3', close: 'size-3' },
      sm: { base: 'text-xs gap-1 h-6 px-2.5', icon: 'size-3', close: 'size-3' },
      md: { base: 'text-sm gap-1.5 h-8 px-3', icon: 'size-3.5', close: 'size-3.5' },
      lg: { base: 'text-base gap-2 h-10 px-4', icon: 'size-4', close: 'size-4' },
    },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    square: { true: 'px-unset' },
    closable: { true: '' },
    disabled: { true: 'is-disabled' },
    clickable: { true: 'cursor-pointer' },
  },
  compoundVariants: [
    // Static
    ...createColorCompoundVariants({
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      states: 'normal',
      slot: 'base',
    }),

    // Clickable
    ...createColorCompoundVariants({
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      states: ['hover', 'active'],
      slot: 'base',
      extra: { clickable: true },
    }),

    // Square
    { square: true, size: 'xs', class: { base: 'w-5' } },
    { square: true, size: 'sm', class: { base: 'w-6' } },
    { square: true, size: 'md', class: { base: 'w-8' } },
    { square: true, size: 'lg', class: { base: 'w-10' } },

    // Closable
    { closable: true, size: 'xs', class: { close: 'before:size-4' } },
    { closable: true, size: 'sm', class: { close: 'before:size-5' } },
    { closable: true, size: 'md', class: { close: 'before:size-6' } },
    { closable: true, size: 'lg', class: { close: 'before:size-7' } },
  ],
  defaultVariants: {
    color: 'accent',
    variant: 'soft',
    size: 'sm',
    radius: 'sm',
  },
})

export type BadgeStyleSlots = typeof useBadgeStyle['slots']
export type BadgeStyleProps = VariantProps<typeof useBadgeStyle>
