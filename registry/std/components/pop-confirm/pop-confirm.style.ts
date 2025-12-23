import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePopConfirmStyle = createVariants({
  slots: {
    base: 'flex-(~ col) gap-3.5',
    content: 'flex-(~ y-center) select-none gap-2 text-(sm highlighted)',
    indicator: 'size-4',
    actions: 'flex-(~ y-center) gap-2 justify-end',
  },

  variants: {
    type: {
      info: { indicator: 'text-info' },
      success: { indicator: 'text-success' },
      warning: { indicator: 'text-warning' },
      danger: { indicator: 'text-danger' },
    },
  },
})

export type PopConfirmStyleSlots = typeof usePopConfirmStyle['slots']
export type PopConfirmStyleProps = VariantProps<typeof usePopConfirmStyle>
