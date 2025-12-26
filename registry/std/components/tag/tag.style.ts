import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTagStyle = createVariants({
  slots: {
    root: 'flex-(inline center) select-none',
    label: 'flex-(~ 1 center) truncate text-nowrap',
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
      xs: { root: 'text-xs h-5 gap-1 leading-none', close: 'size-3' },
      sm: { root: 'text-xs h-6 gap-1', close: 'size-4' },
      md: { root: 'text-sm h-8 gap-1.5', close: 'size-5' },
      lg: { root: 'text-base h-10 gap-2', close: 'size-6' },
    },
    radius: {
      none: '',
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    disabled: { true: { root: 'is-disabled' } },
    closable: { true: '' },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      slot: 'root',
    }),

    { size: 'xs', closable: true, class: { root: 'pl-1.5 pr-1' } },
    { size: 'sm', closable: true, class: { root: 'pl-2.5 pr-1.5' } },
    { size: 'md', closable: true, class: { root: 'pl-3 pr-2' } },
    { size: 'lg', closable: true, class: { root: 'pl-4 pr-3' } },

    { size: 'xs', closable: false, class: { root: 'px-1.5' } },
    { size: 'sm', closable: false, class: { root: 'px-2.5' } },
    { size: 'md', closable: false, class: { root: 'px-3' } },
    { size: 'lg', closable: false, class: { root: 'px-4' } },
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
