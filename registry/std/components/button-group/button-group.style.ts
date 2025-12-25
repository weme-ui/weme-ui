import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useButtonGroupStyle = createVariants({
  slots: {
    root: 'flex-(~ y-center) data-[disabled]:is-disabled',
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
