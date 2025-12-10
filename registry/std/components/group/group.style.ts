import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useGroupStyle = createVariants({
  slots: {
    base: 'flex-(~ y-center)',
    item: '',
  },

  variants: {
    gap: {
      none: {
        item: [
          'data-[order=first]:(rounded-r-0 -me-px)',
          'data-[order=middle]:(rounded-0 -me-px)',
          'data-[order=last]:rounded-l-0',
        ],
      },
      xs: { base: 'gap-1' },
      sm: { base: 'gap-2' },
      md: { base: 'gap-3' },
      lg: { base: 'gap-5' },
    },
    grow: {
      true: {
        item: 'flex-1',
      },
    },
  },

  defaultVariants: {
    gap: 'sm',
    grow: false,
  },
})

export type GroupStyleSlots = typeof useGroupStyle['slots']
export type GroupStyleProps = VariantProps<typeof useGroupStyle>
