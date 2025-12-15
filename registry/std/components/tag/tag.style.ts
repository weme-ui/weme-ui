import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTagStyle = createVariants({
  slots: {
    base: 'flex-(inline center) select-none',
    label: 'flex-1 truncate text-nowrap',
    close: [
      'relative flex-(~ center) rounded-full',
      'hover:before:(abs abs-center block content-[""] size-full rounded-full transition-opacity bg-current op-15)',
      'active:before:op-20',
    ],
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', inverse: '' },
    size: {
      xs: { base: 'text-xs h-5 gap-1 leading-none', close: 'size-3' },
      sm: { base: 'text-xs h-6 gap-1', close: 'size-4' },
      md: { base: 'text-sm h-8 gap-1.5', close: 'size-5' },
      lg: { base: 'text-base h-10 gap-2', close: 'size-6' },
    },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
    disabled: {
      true: 'is-disabled',
    },
    closable: { true: '' },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      slot: 'base',
    }),

    { size: 'xs', closable: true, class: { base: 'pl-1.5 pr-1' } },
    { size: 'sm', closable: true, class: { base: 'pl-2.5 pr-1.5' } },
    { size: 'md', closable: true, class: { base: 'pl-3 pr-2' } },
    { size: 'lg', closable: true, class: { base: 'pl-4 pr-3' } },

    { size: 'xs', closable: false, class: { base: 'px-1.5' } },
    { size: 'sm', closable: false, class: { base: 'px-2.5' } },
    { size: 'md', closable: false, class: { base: 'px-3' } },
    { size: 'lg', closable: false, class: { base: 'px-4' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'soft',
    size: 'sm',
    radius: 'sm',
    disabled: false,
  },
})

export type TagStyleSlots = typeof useTagStyle['slots']
export type TagStyleProps = VariantProps<typeof useTagStyle>
