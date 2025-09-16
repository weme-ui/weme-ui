import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAlertStyle = createVariants({
  slots: {
    base: 'group relative flex grow-1 gap-2 p-4 transition text-left',
    icon: 'size-4',
    wrapper: 'space-y-1.5 grow-1',
    title: 'text-4 font-medium tracking-tight leading-none',
    content: 'leading-none',
    close: [
      'abs right-4 text-3 flex-(~ center) c-current hidden',
      'group-hover:flex hover:before:(abs abs-center block content-[""] rounded-full size-5 transform transition-opacity bg-current op-20)',
    ],
  },
  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '', inverse: '' },
    radius: {
      none: '',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    inline: {
      true: { base: 'flex-y-center', content: 'text-4 font-medium tracking-tight', close: 'abs-y-center' },
      false: { content: 'text-sm op-70', close: 'top-4' },
    },
    clickable: {
      true: '',
    },
  },
  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'static',
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      slot: 'base',
      extra: { clickable: false },
    }),

    // Clickable
    ...createColorCompoundVariants({
      type: 'click',
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      slot: 'base',
      extra: { clickable: true },
    }),
  ],
  defaultVariants: {
    color: 'accent',
    variant: 'soft',
    radius: 'lg',
    inline: false,
  },
})

export type AlertStyleSlots = typeof useAlertStyle['slots']
export type AlertStyleProps = VariantProps<typeof useAlertStyle>
