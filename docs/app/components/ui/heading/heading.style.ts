import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useHeadingStyle = createVariants({
  base: '',
  variants: {
    color: createColorVariants({ variant: 'link', type: 'click' }),
    size: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-base',
    },
    weight: {
      light: 'font-light',
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'h2',
    color: 'accent',
    weight: 'bold',
  },
})

export type HeadingStyleProps = VariantProps<typeof useHeadingStyle>
