import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useBannerStyle = createVariants({
  slots: {
    root: 'banner relative w-full flex-(~ y-center) justify-between gap-4 h-10 z-tooltip transition-colors',
    left: 'hidden lg:flex-1 lg:(flex items-center)',
    center: 'flex-(~ y-center) gap-4 min-w-0',
    right: 'lg:flex-1 flex-(~ y-center) justify-end',
    icon: 'size-5 shrink-0',
    title: 'font-medium text-sm truncate',
    actions: 'flex gap-1.5 shrink-0 isolate',
    close: [
      'abs right-4 text-3 flex-(~ center) c-current',
      'hover:before:(abs abs-center block content-[""] rounded-full size-5 transform transition-opacity bg-current op-20)',
    ],
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', inverse: '' },
    closable: { true: '' },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'inverse'],
      extra: { closable: false },
      slot: 'root',
    }),

    ...createColorCompoundVariants({
      type: 'btn',
      variants: ['solid', 'soft', 'inverse'],
      extra: { closable: true },
      slot: 'root',
    }),
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    closable: false,
  },
})

export type BannerStyleSlots = typeof useBannerStyle['slots']
export type BannerStyleProps = VariantProps<typeof useBannerStyle>
