import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSeparatorStyle = createVariants({
  slots: {
    base: 'relative shrink-0',
    text: 'abs-(~ center) flex-(~ center) text-(xs toned) select-none bg-white-12',
  },
  variants: {
    variant: {
      solid: 'bg-border',
      dashed: 'bg-transparent b-(t dashed default)',
      dotted: 'bg-transparent b-(t dotted default)',
      gradient: 'bg-linear-to-r from-transparent via-neutral-6 to-transparent',
    },
    orientation: {
      horizontal: {
        base: 'h-px w-full',
        text: 'h-px py-1 px-3',
      },
      vertical: {
        base: 'w-px h-full',
        text: 'w-px py-3 px-1',
      },
    },
  },
  defaultVariants: {
    variant: 'solid',
    orientation: 'horizontal',
  },
})

export type SeparatorStyleSlots = typeof useSeparatorStyle['slots']
export type SeparatorStyleProps = VariantProps<typeof useSeparatorStyle>
