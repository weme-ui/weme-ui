import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useFormFieldStyle = createVariants({
  slots: {
    root: 'flex gap-2',
    header: 'flex flex-col',
    labelWrapper: 'flex gap-1',
    label: 'text-(base highlighted nowrap) font-medium',
    description: 'text-(sm subtle)',
    required: 'text-red align-middle',
    content: 'flex flex-col',
    hint: 'text-(xs muted)',
    help: 'text-(xs muted)',
    errors: 'text-(xs error)',
  },

  variants: {
    orientation: {
      horizontal: {
        description: 'items-center',
      },
      vertical: {
        root: 'flex-col',
      },
    },
    loading: {
      true: {
        root: 'is-loading',
      },
    },
    disabled: {
      true: {
        content: 'is-disabled',
      },
    },
  },

  defaultVariants: {
    orientation: 'vertical',
    loading: false,
    disabled: false,
  },
})

export type FormFieldStyleSlots = typeof useFormFieldStyle['slots']
export type FormFieldStyleProps = VariantProps<typeof useFormFieldStyle>
