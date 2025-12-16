import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useItemGroupStyle = createVariants({
  slots: {
    base: 'relative',
    header: 'flex items-end py-2',
    titleWrapper: 'flex-1',
    title: 'font-semibold text-(base highlighted)',
    description: 'text-sm text-toned',
    actions: 'flex-(~ y-center) h-6 gap-2',
    body: 'bg-item-group flex-(~ col) overflow-hidden',
    item: '',
    footer: 'text-xs text-toned py-2',
  },

  variants: {
    variant: {
      card: {
        body: 'b-(~ default)',
      },
      list: '',
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
  ],

  defaultVariants: {
    variant: 'card',
    size: 'md',
    radius: 'lg',
  },
})

export type ItemGroupStyleSlots = typeof useItemGroupStyle['slots']
export type ItemGroupStyleProps = VariantProps<typeof useItemGroupStyle>
