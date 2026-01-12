import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useFormFieldStyle = createVariants({
  slots: {
    root: 'flex',
    wrapper: 'flex',
    labelWrapper: 'flex',
    label: 'flex-(inline 1 y-center) gap-1 font-medium text-highlighted',
    hint: '',
    description: '',
    control: 'relative flex-(~ col)',
    help: '',
    errors: '',
    required: '',
  },

  variants: {
    orientation: {
      vertical: {
        root: 'flex-col',
        wrapper: 'flex-col',
        labelWrapper: 'flex-y-center',
      },
      horizontal: {
        root: 'flex-row place-items-baseline justify-between',
        wrapper: 'items-start',
        labelWrapper: 'flex-col',
        label: 'flex-row-reverse',
        control: 'items-end',
      },
    },
    size: {
      xs: { root: 'text-xs' },
      sm: { root: 'text-xs' },
      md: { root: 'text-xs', label: 'text-sm' },
      lg: { root: 'text-sm', label: 'text-base' },
      xl: { root: 'text-sm', label: 'text-lg' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
  },

  compoundSlots: [
    { slots: ['hint', 'description', 'help'], class: 'text-toned' },
    { slots: ['errors', 'required'], class: 'text-danger' },
  ],

  compoundVariants: [
    { size: 'xs', orientation: 'vertical', class: { root: 'gap-1.5', wrapper: 'gap-0.5', control: 'gap-0.5' } },
    { size: 'sm', orientation: 'vertical', class: { root: 'gap-2', wrapper: 'gap-1', control: 'gap-1' } },
    { size: 'md', orientation: 'vertical', class: { root: 'gap-3', wrapper: 'gap-1', control: 'gap-1' } },
    { size: 'lg', orientation: 'vertical', class: { root: 'gap-3.5', wrapper: 'gap-1', control: 'gap-1' } },
    { size: 'xl', orientation: 'vertical', class: { root: 'gap-3.5', wrapper: 'gap-1', control: 'gap-1' } },

    { size: 'xs', orientation: 'horizontal', class: { root: 'gap-2', wrapper: 'gap-1', labelWrapper: 'gap-1.5', control: 'gap-1.5' } },
    { size: 'sm', orientation: 'horizontal', class: { root: 'gap-3', wrapper: 'gap-1', labelWrapper: 'gap-1.5', control: 'gap-1.5' } },
    { size: 'md', orientation: 'horizontal', class: { root: 'gap-4', wrapper: 'gap-1', labelWrapper: 'gap-1.5', control: 'gap-1.5' } },
    { size: 'lg', orientation: 'horizontal', class: { root: 'gap-5', wrapper: 'gap-1', labelWrapper: 'gap-1.5', control: 'gap-1.5' } },
    { size: 'xl', orientation: 'horizontal', class: { root: 'gap-6', wrapper: 'gap-1', labelWrapper: 'gap-1.5', control: 'gap-1.5' } },
  ],

  defaultVariants: {
    orientation: 'vertical',
    size: 'md',
    radius: 'sm',
  },
})

export type FormFieldStyleSlots = typeof useFormFieldStyle['slots']
export type FormFieldStyleProps = VariantProps<typeof useFormFieldStyle>
