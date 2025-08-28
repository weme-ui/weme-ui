import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTypographyStyle = createVariants({
  base: '',
  variants: {
    as: {
      // Heading
      h1: 'text-4xl font-extrabold',
      h2: 'text-3xl font-bold',
      h3: 'text-2xl font-semibold',
      h4: 'text-xl font-semibold',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
      // Paragraph
      p: 'text-base font-normal leading-relaxed',
      // Blockquote
      blockquote: 'pl-6 b-(l-4 default) italic font-normal leading-relaxed',
      // Small
      small: 'text-sm font-medium leading-none',
    },
    color: {
      highlighted: 'text-highlighted',
      default: 'text-default',
      toned: 'text-toned',
      muted: 'text-muted',
      dimmed: 'text-dimmed',
    },
  },
  compoundVariants: [
    { as: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], class: 'scroll-m-20 tracking-tight text-highlighted' },
  ],
  defaultVariants: {
    as: 'p',
    color: 'default',
  },
})

export type TypographyStyleProps = VariantProps<typeof useTypographyStyle>
