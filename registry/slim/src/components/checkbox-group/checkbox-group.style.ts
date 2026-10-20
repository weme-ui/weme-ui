import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCheckboxGroupStyle = createVariants({
  slots: {
    root: 'flex',
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
    size: {
      sm: { root: 'py-xs gap-sm' },
      md: { root: 'py-sm gap-md' },
      lg: { root: 'py-md gap-lg' },
    },
    radius: { none: {}, xs: {}, sm: {}, md: {}, lg: {}, xl: {}, full: {} },
    orientation: {
      horizontal: {},
      vertical: { root: 'flex-col' },
    },
    align: { start: {}, center: {}, end: {} },
    disabled: {
      true: { root: 'is-disabled' },
    },
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
