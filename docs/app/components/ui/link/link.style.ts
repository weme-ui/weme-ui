import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useLinkStyle = createVariants({
  base: 'flex-(inline y-center) underline-offset-6 gap-1.5',
  variants: {
    color: createColorVariants({ variant: 'plain', type: 'btn' }),
    disabled: {
      true: 'is-disabled',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
})

export type LinkStyleProps = VariantProps<typeof useLinkStyle>
