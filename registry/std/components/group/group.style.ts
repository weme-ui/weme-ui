import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useGroupStyle = createVariants({
  slots: {
    root: 'flex-(~ y-center)',
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
      xs: { root: 'gap-1' },
      sm: { root: 'gap-2' },
      md: { root: 'gap-3' },
      lg: { root: 'gap-5' },
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
