import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useButtonGroupStyle = createVariants({
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
    radius: {
      none: '',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
      full: 'rounded-full',
    },
  },

  defaultVariants: {
    gap: 'sm',
    radius: 'sm',
  },
})

export type ButtonGroupStyleSlots = typeof useButtonGroupStyle['slots']
export type ButtonGroupStyleProps = VariantProps<typeof useButtonGroupStyle>
