import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useFloatStyle = createVariants({
  slots: {
    base: 'flex-(inline center) abs',
  },

  variants: {
    placement: {
      'top-start': '',
      'top-center': '',
      'top-end': '',
      'bottom-start': '',
      'bottom-center': '',
      'bottom-end': '',
      'middle-start': '',
      'middle-center': '',
      'middle-end': '',
    },
  },

  compoundVariants: [
    { placement: ['top-start', 'top-center', 'top-end'], class: 'inset-bs-$offset-y inset-be-auto -translate-y-[50%]' },
    { placement: ['middle-start', 'middle-center', 'middle-end'], class: 'inset-block-[50%] -translate-y-[50%]' },
    { placement: ['bottom-start', 'bottom-center', 'bottom-end'], class: 'inset-bs-auto inset-be-$offset-y translate-y-[50%]' },

    { placement: ['top-start', 'middle-start', 'bottom-start'], class: 'inset-s-$offset-x inset-e-auto -translate-x-[50%]' },
    { placement: ['top-center', 'middle-center', 'bottom-center'], class: 'inset-inline-[50%] -translate-x-[50%]' },
    { placement: ['top-end', 'middle-end', 'bottom-end'], class: 'inset-s-auto inset-e-$offset-x translate-x-[50%]' },
  ],

  defaultVariants: {
    placement: 'top-end',
  },
})

export type FloatStyleSlots = typeof useFloatStyle['slots']
export type FloatStyleProps = VariantProps<typeof useFloatStyle>
