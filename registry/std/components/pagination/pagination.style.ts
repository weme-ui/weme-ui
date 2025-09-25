import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePaginationStyle = createVariants({
  slots: {
    base: 'flex-(~ y-center) gap-x-4',
    list: 'flex-(~ 1 y-center)',
    item: 'flex-(~ center) rounded-sm transition-colors disabled:is-disabled hover:[&:not([data-selected])]:(c-accent bg-accent-3)',
    ellipsis: 'flex-(~ center)',
    total: '',
  },

  variants: {
    variant: {
      solid: { item: 'data-[selected]:(bg-accent c-accent-1)' },
      soft: { item: 'data-[selected]:(bg-accent-3 c-accent)' },
      surface: { item: 'data-[selected]:(bg-accent-3 c-accent ring-1 ring-accent-6)' },
      outline: { item: 'data-[selected]:(c-accent ring-1 ring-accent-6)' },
      inverse: { item: 'data-[selected]:(bg-accent-1 c-accent-9)' },
    },
    align: {
      start: { list: 'justify-start' },
      end: { list: 'justify-end' },
    },
    size: {
      sm: { base: 'text-xs', list: 'gap-x-1', item: 'min-w-5 h-5', ellipsis: 'min-w-5 h-5' },
      md: { base: 'text-sm', list: 'gap-x-2', item: 'min-w-6 h-6', ellipsis: 'min-w-6 h-6' },
      lg: { base: 'text-base', list: 'gap-x-2.5', item: 'min-w-8 h-8', ellipsis: 'min-w-8 h-8' },
    },
  },

  defaultVariants: {
    variant: 'solid',
    align: 'end',
    size: 'md',
  },
})

export type PaginationStyleSlots = typeof usePaginationStyle['slots']
export type PaginationStyleProps = VariantProps<typeof usePaginationStyle>
