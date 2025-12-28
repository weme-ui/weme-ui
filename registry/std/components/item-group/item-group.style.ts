import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useItemGroupStyle = createVariants({
  slots: {
    root: 'relative',
    header: 'flex items-end py-2',
    titleWrapper: 'flex-1',
    title: 'font-semibold text-(base highlighted)',
    description: 'text-sm text-toned',
    actions: 'flex-(~ y-center) h-6 gap-2',
    body: 'flex-(~ col) overflow-hidden',
    item: '',
    footer: 'text-xs text-muted py-2',
  },

  variants: {
    variant: {
      card: {
        body: 'bg-item-group b-(~ default)',
      },
      list: {
        item: 'bg-item-group',
      },
    },
    size: { sm: '', md: '', lg: '' },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '' },
  },

  compoundVariants: [
    { variant: 'card', radius: 'xs', class: { body: 'rounded-xs' } },
    { variant: 'card', radius: 'sm', class: { body: 'rounded-sm' } },
    { variant: 'card', radius: 'md', class: { body: 'rounded-md' } },
    { variant: 'card', radius: 'lg', class: { body: 'rounded-lg' } },
    { variant: 'card', radius: 'xl', class: { body: 'rounded-xl' } },

    { variant: 'list', size: 'sm', class: { body: 'gap-2' } },
    { variant: 'list', size: 'md', class: { body: 'gap-3' } },
    { variant: 'list', size: 'lg', class: { body: 'gap-4' } },
  ],

  defaultVariants: {
    variant: 'card',
    size: 'md',
    radius: 'lg',
  },
})

export type ItemGroupStyleSlots = typeof useItemGroupStyle['slots']
export type ItemGroupStyleProps = VariantProps<typeof useItemGroupStyle>
