import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useModalStyle = createVariants({
  slots: {
    base: 'fixed flex z-popup shadow-lg focus:outline-hidden',
    wrapper: 'relative flex-(~ 1 col) shadow-xs overflow-hidden',
    trigger: '',
    header: 'flex px-5 py-4',
    icon: 'c-highlighted text-5 mt-0.5 mr-3 [&>svg]:size-5',
    title: 'text-(lg highlighted) font-medium',
    description: 'text-(sm toned) leading-none mt-0.5',
    body: 'flex-1 overflow-hidden',
    content: 'h-full px-5 py-4',
    footer: 'flex-(~ y-center) justify-end px-5 py-3',
    close: [
      'abs right-5 top-5 text-3.5 flex-(~ center) [&>svg]:z-1',
      'after:(abs size-6 block content-[""] rounded-full transition-colors)',
      'hover:after:bg-elevated hover:c-highlighted',
    ],
    overlay: 'fixed inset-0 bg-neutral-9/70 z-overlay',
  },

  variants: {
    variant: {
      normal: 'p-1.5 bg-elevated',
      clean: '',
    },
    side: {
      top: 'top-0 right-0 left-0 rounded-t-0 min-h-modal',
      right: 'min-w-modal',
      bottom: 'right-0 bottom-0 left-0 rounded-b-0 min-h-modal',
      left: 'min-w-modal',
      center: 'abs-center min-w-modal',
    },
    radius: {
      none: '',
      sm: { base: 'rounded-sm', wrapper: 'rounded-sm' },
      md: { base: 'rounded-md', wrapper: 'rounded-sm' },
      lg: { base: 'rounded-lg', wrapper: 'rounded-md' },
      xl: { base: 'rounded-xl', wrapper: 'rounded-lg' },
    },
    translucent: {
      true: { wrapper: 'bg-modal/70 backdrop-blur-3xl', overlay: 'backdrop-blur-3xl' },
      false: { wrapper: 'bg-modal' },
    },
    bordered: {
      true: { header: 'b-(b default)', footer: 'b-(t default)' },
    },
  },

  compoundVariants: [
    { variant: 'normal', side: 'left', class: 'top-2 bottom-2 left-2' },
    { variant: 'normal', side: 'right', class: 'top-2 bottom-2 right-2' },

    { variant: 'clean', side: 'left', class: 'top-0 bottom-0 left-0' },
    { variant: 'clean', side: 'right', class: 'top-0 bottom-0 right-0' },

    { variant: 'clean', side: 'right', class: { base: 'rounded-r-0', wrapper: 'rounded-r-0' } },
    { variant: 'clean', side: 'left', class: { base: 'rounded-l-0', wrapper: 'rounded-l-0' } },
    { variant: 'clean', side: 'top', class: { wrapper: 'rounded-t-0' } },
    { variant: 'clean', side: 'bottom', class: { wrapper: 'rounded-b-0' } },
  ],

  defaultVariants: {
    variant: 'normal',
    side: 'center',
    radius: 'lg',
  },
})

export type ModalStyleSlots = typeof useModalStyle['slots']
export type ModalStyleProps = VariantProps<typeof useModalStyle>
