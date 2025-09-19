import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useEmptyStyle = createVariants({
  slots: {
    base: 'flex-(~ col center)',
    image: 'c-muted aspect-square',
    description: 'text-(sm muted)',
  },

  variants: {
    type: {
      empty: '',
      notfound: { base: 'gap-y-3', image: 'aspect-2/1' },
      forbidden: '',
      search: '',
    },
    size: {
      sm: { image: 'size-16' },
      md: { image: 'size-32' },
      lg: { image: 'size-64' },
    },
  },

  compoundVariants: [
    { type: 'notfound', size: 'sm', class: { image: 'w-32 h-16' } },
    { type: 'notfound', size: 'md', class: { image: 'w-64 h-32' } },
    { type: 'notfound', size: 'lg', class: { image: 'w-128 h-64' } },
  ],

  defaultVariants: {
    size: 'md',
  },
})

export type EmptyStyleSlots = typeof useEmptyStyle['slots']
export type EmptyStyleProps = VariantProps<typeof useEmptyStyle>
