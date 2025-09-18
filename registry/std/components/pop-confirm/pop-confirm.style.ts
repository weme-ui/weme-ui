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
      info: { icon: 'c-info' },
      success: { icon: 'c-success' },
      warning: { icon: 'c-warning' },
      error: { icon: 'c-error' },
    },

    inverse: {
      false: '',
      true: { base: 'bg-accent', content: 'text-accent-1', arrow: 'fill-accent', cancel: 'text-accent-1' },
    },
  },

  compoundVariants: [
    { type: 'info', inverse: true, class: { base: 'bg-info', icon: 'text-info-1', content: 'text-info-1', arrow: 'fill-info', cancel: 'text-info-1' } },
    { type: 'success', inverse: true, class: { base: 'bg-success', icon: 'text-success-1', content: 'text-success-1', arrow: 'fill-success', cancel: 'text-success-1' } },
    { type: 'warning', inverse: true, class: { base: 'bg-warning', icon: 'text-warning-1', content: 'text-warning-1', arrow: 'fill-warning', cancel: 'text-warning-1' } },
    { type: 'error', inverse: true, class: { base: 'bg-error', icon: 'text-error-1', content: 'text-error-1', arrow: 'fill-error', cancel: 'text-error-1' } },
  ],
})

export type PopConfirmStyleSlots = typeof usePopConfirmStyle['slots']
export type PopConfirmStyleProps = VariantProps<typeof usePopConfirmStyle>
