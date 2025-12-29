import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePaginationStyle = createVariants({
  slots: {
    root: 'flex-(~ y-center) gap-4',
    list: 'flex-(~ 1 y-center) select-none',
    item: 'flex-(~ center) transition-colors data-[selected]:font-semibold disabled:is-disabled',
    ellipsis: 'flex-(~ center)',
    total: 'c-toned text-left',
    content: 'flex-(~ y-center) gap-2',
  },

  variants: {
    variant: {
      solid: { item: 'data-[selected]:box-primary' },
      soft: { item: 'data-[selected]:box-primary-soft' },
      surface: { item: 'data-[selected]:box-primary-surface' },
      outline: { item: 'data-[selected]:box-primary-outline' },
      ghost: { item: 'data-[selected]:c-primary' },
      plain: { item: 'data-[selected]:c-primary' },
      inverse: { item: 'c-primary-1 data-[selected]:box-primary-inverse', ellipsis: 'c-primary-3', content: 'c-primary-1' },
    },
    size: {
      sm: { root: 'text-xs', list: 'gap-1', item: 'min-w-5 h-5', ellipsis: 'min-w-5 h-5' },
      md: { root: 'text-sm', list: 'gap-2', item: 'min-w-6 h-6', ellipsis: 'min-w-6 h-6' },
      lg: { root: 'text-base', list: 'gap-2.5', item: 'min-w-7 h-7', ellipsis: 'min-w-7 h-7' },
    },
    radius: {
      none: '',
      xs: { item: 'rounded-xs' },
      sm: { item: 'rounded-sm' },
      md: { item: 'rounded-md' },
      lg: { item: 'rounded-lg' },
      xl: { item: 'rounded-xl' },
      full: { item: 'rounded-full' },
    },
    align: {
      start: { list: 'justify-start' },
      center: { list: 'justify-center' },
      end: { list: 'justify-end' },
    },
  },

  compoundVariants: [
    { variant: ['solid', 'soft', 'surface', 'outline', 'ghost'], class: { item: 'hover:[&:not([data-selected])]:bg-primary-3' } },
  ],

  defaultVariants: {
    variant: 'solid',
    size: 'md',
    radius: 'sm',
    align: 'start',
  },
})

export type PaginationStyleSlots = typeof usePaginationStyle['slots']
export type PaginationStyleProps = VariantProps<typeof usePaginationStyle>
