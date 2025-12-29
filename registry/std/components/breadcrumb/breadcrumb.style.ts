import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useBreadcrumbStyle = createVariants({
  slots: {
    root: 'relative text-toned',
    list: 'flex',
    item: 'flex-(~ y-center) min-w-0',
    link: 'group relative flex-(~ y-center) min-w-0 focus-visible:outline-primary',
    icon: 'shrink-0',
    label: 'truncate',
    separator: 'flex',
    separatorIcon: 'shrink-0',
  },

  variants: {
    size: {
      sm: { root: 'text-xs', list: 'gap-2', item: 'gap-2', link: 'gap-1.5', icon: 'size-3', separatorIcon: 'size-3' },
      md: { root: 'text-sm', list: 'gap-3', item: 'gap-3', link: 'gap-1.5', icon: 'size-3.5', separatorIcon: 'size-3.5' },
      lg: { root: 'text-base', list: 'gap-4', item: 'gap-4', link: 'gap-2', icon: 'size-4', separatorIcon: 'size-4' },
    },
    active: {
      true: {
        link: 'text-primary font-semibold',
      },
      false: {
        link: 'text-toned font-medium',
      },
    },
    disabled: {
      true: {
        link: 'is-disabled',
      },
    },
    to: {
      true: '',
    },
  },

  compoundVariants: [
    { active: false, disabled: false, to: true, class: { link: 'hover:text-primary transition-colors' } },
  ],

  defaultVariants: {
    size: 'md',
  },
})

export type BreadcrumbStyleSlots = typeof useBreadcrumbStyle['slots']
export type BreadcrumbStyleProps = VariantProps<typeof useBreadcrumbStyle>
