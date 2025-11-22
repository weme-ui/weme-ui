import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePopConfirmStyle = createVariants({
  slots: {
    base: 'flex-(~ col) gap-y-3 min-w-60',
    icon: 'size-4',
    content: 'flex-(~ y-center) gap-2 text-(sm highlighted)',
    ok: '',
    cancel: '',
    arrow: '',
    trigger: '',
  },

  variants: {
    type: {
      info: { icon: 'text-info' },
      success: { icon: 'text-success' },
      warning: { icon: 'text-warning' },
      danger: { icon: 'text-danger' },
    },

    inverse: {
      false: '',
      true: { base: 'bg-primary', content: 'text-primary-1', arrow: 'fill-primary', cancel: 'text-primary-1' },
    },
  },

  compoundVariants: [
    { type: 'info', inverse: true, class: { base: 'bg-info', icon: 'text-info-1', content: 'text-info-1', arrow: 'fill-info', cancel: 'text-info-1' } },
    { type: 'success', inverse: true, class: { base: 'bg-success', icon: 'text-success-1', content: 'text-success-1', arrow: 'fill-success', cancel: 'text-success-1' } },
    { type: 'warning', inverse: true, class: { base: 'bg-warning', icon: 'text-warning-1', content: 'text-warning-1', arrow: 'fill-warning', cancel: 'text-warning-1' } },
    { type: 'danger', inverse: true, class: { base: 'bg-danger', icon: 'text-danger-1', content: 'text-danger-1', arrow: 'fill-danger', cancel: 'text-danger-1' } },
  ],
})

export type PopConfirmStyleSlots = typeof usePopConfirmStyle['slots']
export type PopConfirmStyleProps = VariantProps<typeof usePopConfirmStyle>
