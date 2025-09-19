import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useResultStyle = createVariants({
  slots: {
    base: 'flex-(~ col center) gap-y-4',
    icon: '',
    title: 'text-highlighted font-medium',
    description: 'text-(sm toned) leading-none',
    action: 'flex-(~ y-center) gap-x-2',
    extra: 'px-6 py-4 rounded-md bg-elevated',
  },

  variants: {},

  compoundVariants: [],

  defaultVariants: {},
})

export type ResultStyleSlots = typeof useResultStyle['slots']
export type ResultStyleProps = VariantProps<typeof useResultStyle>
