import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCheckboxGroupStyle = createVariants({
  slots: {
    root: '',
    item: '',
    indicator: '',
    checkedIcon: '',
    indeterminateIcon: '',
    content: '',
    label: '',
    description: '',
  },

  variants: {
    variant: { soft: {}, outline: {}, card: {} },
    size: { sm: {}, md: {}, lg: {} },
    radius: { none: {}, xs: {}, sm: {}, md: {}, lg: {}, xl: {}, full: {} },
    orientation: { horizontal: {}, vertical: {} },
    align: { start: {}, center: {}, end: {} },
    disabled: { true: {} },
    inverted: { true: {} },
    unstyled: { false: {} },
  },

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'md',
    orientation: 'vertical',
    align: 'start',
  },
})

export type CheckboxGroupStyleSlots = typeof useCheckboxGroupStyle['slots']
export type CheckboxGroupStyleProps = VariantProps<typeof useCheckboxGroupStyle>
