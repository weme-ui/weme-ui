import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useBreadcrumbStyle = createVariants({
  slots: {
    base: 'flex-(~ y-center)',
    item: 'flex-(~ center)',
    icon: 'c-toned mr-1',
    label: 'text-sm',
    separator: 'flex-(~ center) px-2.5 c-toned',
  },
  variants: {
    latest: {
      true: { label: 'font-medium text-highlighted' },
      false: { label: 'hover:text-highlighted' },
    },
  },
})

export type BreadcrumbStyleSlots = typeof useBreadcrumbStyle['slots']
export type BreadcrumbStyleProps = VariantProps<typeof useBreadcrumbStyle>
