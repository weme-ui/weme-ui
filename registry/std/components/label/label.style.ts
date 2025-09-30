import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useLabelStyle = createVariants({
  slots: {
    base: 'flex-(~ y-center) gap-1 font-medium peer-disabled:is-disabled',
    hint: 'text-muted font-normal',
  },
})

export type LabelStyleSlots = typeof useLabelStyle['slots']
export type LabelStyleProps = VariantProps<typeof useLabelStyle>
