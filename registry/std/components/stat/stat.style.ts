import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useStatStyle = createVariants({
  slots: {
    root: 'flex-(~ col) text-highlighted',
    label: '',
    value: 'font-bold',
    description: 'text-toned leading-none',
    indicator: 'flex-(~ y-center) gap-2',
    indicatorIcon: '',
    indicatorValue: '',
  },

  variants: {
    trend: {
      none: '',
      up: { indicatorIcon: 'c-success', indicatorValue: 'c-success-11' },
      down: { indicatorIcon: 'c-danger', indicatorValue: 'c-danger-11' },
    },
    size: {
      xs: { root: 'gap-0.5', label: 'text-xs', value: 'text-2xl', description: 'text-xs', indicator: 'text-xs' },
      sm: { root: 'gap-0.75', label: 'text-sm', value: 'text-3xl', description: 'text-xs', indicator: 'text-sm' },
      md: { root: 'gap-1', label: 'text-base', value: 'text-3xl', description: 'text-sm', indicator: 'text-sm' },
      lg: { root: 'gap-1.5', label: 'text-base', value: 'text-4xl', description: 'text-sm', indicator: 'text-sm' },
    },
  },

  defaultVariants: {
    trend: 'none',
    size: 'sm',
  },
})

export type StatStyleSlots = typeof useStatStyle['slots']
export type StatStyleProps = VariantProps<typeof useStatStyle>
