import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAlertStyle = createVariants({
  slots: {
    root: 'group relative flex grow-1 gap-2 p-4 transition text-left',
    icon: 'size-4 shrink-0',
    wrapper: 'grow-1 text-4 space-y-1',
    title: 'font-medium tracking-tight leading-none',
    content: '',
    actions: 'text-4',
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
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
    },
    inline: {
      true: { root: 'flex-y-center', content: 'font-medium tracking-tight', close: 'abs-y-center' },
      false: { content: 'text-sm op-70 leading-none', close: 'top-4' },
    },
    clickable: { true: 'cursor-pointer' },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      slot: 'root',
      extra: { clickable: false },
    }),

    ...createColorCompoundVariants({
      type: 'btn',
      variants: ['solid', 'soft', 'surface', 'outline', 'inverse'],
      slot: 'root',
      extra: { clickable: true },
    }),
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'soft',
    radius: 'md',
    inline: false,
  },
})

export type AlertStyleSlots = typeof useAlertStyle['slots']
export type AlertStyleProps = VariantProps<typeof useAlertStyle>
