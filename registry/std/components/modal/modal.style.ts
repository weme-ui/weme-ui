import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useModalStyle = createVariants({
  slots: {
    base: 'fixed flex-(~ col) z-popup focus:outline-primary',
    wrapper: 'relative flex-(~ 1 col)',
    trigger: '',
    header: 'flex items-start',
    iconWrapper: 'flex-(~ center)',
    icon: 'text-highlighted',
    titleWrapper: 'flex-1',
    title: 'text-highlighted font-medium',
    description: 'text-toned',
    content: 'h-full',
    footer: 'flex-(~ y-center) gap-2 justify-end',
    close: [
      'abs right-5 top-5 text-3.5 flex-(~ center) size-6 rounded-full focus-visible:outline-primary [&>span]:z-1',
      'after:(abs inset-0 block content-[""] rounded-inherit transition-colors)',
      'hover:after:bg-elevated hover:c-highlighted',
    ],
    overlay: 'fixed inset-0 bg-overlay/80 z-overlay',
    loading: 'animate-spin',
  },

  variants: {
    variant: {
      normal: {
        base: 'bg-muted shadow-lg/10 b-(~ default/50)',
        wrapper: 'bg-modal shadow-sm',
      },
      outline: 'bg-modal ring-(~ border) shadow-lg',
    },
    placement: {
      top: 'top-0 right-0 left-0 rounded-t-none min-h-modal',
      right: 'min-w-modal',
      bottom: 'right-0 bottom-0 left-0 rounded-b-none min-h-modal',
      left: 'min-w-modal',
      center: 'abs-center min-w-modal',
    },
    size: {
      sm: { header: 'px-4 pt-3', iconWrapper: 'h-5 mr-1.5', icon: 'size-4', title: 'text-sm', description: 'text-xs', content: 'p-4 text-sm', footer: 'text-sm' },
      md: { header: 'px-5 pt-4', iconWrapper: 'h-6 mr-2', icon: 'size-5', title: 'text-base', description: 'text-sm', content: 'p-5 text-base', footer: 'text-base' },
      lg: { header: 'px-6 pt-5', iconWrapper: 'h-6.5 mr-2.5', icon: 'size-5', title: 'text-lg', description: 'text-base', content: 'p-6 text-base', footer: 'text-base' },
    },
    radius: {
      none: '',
      xs: 'rounded-xs',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      xl: 'rounded-xl',
    },
    translucent: {
      true: { overlay: 'backdrop-blur-sm' },
      false: '',
    },
  },

  compoundVariants: [
    { variant: 'normal', size: 'sm', class: { base: 'p-1', footer: 'pt-1.5 pb-0.5' } },
    { variant: 'normal', size: 'md', class: { base: 'p-1.25', footer: 'pt-2.25 pb-1' } },
    { variant: 'normal', size: 'lg', class: { base: 'p-1.5', footer: 'pt-2.5 pb-1' } },

    { variant: 'outline', size: 'sm', class: { footer: 'px-4 pb-3' } },
    { variant: 'outline', size: 'md', class: { footer: 'px-5 pb-4' } },
    { variant: 'outline', size: 'lg', class: { footer: 'px-6 pb-5' } },

    { variant: 'normal', radius: 'xs', class: { wrapper: 'rounded-xs' } },
    { variant: 'normal', radius: 'sm', class: { wrapper: 'rounded-xs' } },
    { variant: 'normal', radius: 'md', class: { wrapper: 'rounded-sm' } },
    { variant: 'normal', radius: 'lg', class: { wrapper: 'rounded-md' } },
    { variant: 'normal', radius: 'xl', class: { wrapper: 'rounded-lg' } },

    { variant: 'normal', placement: 'left', class: { base: 'top-2 bottom-2 left-2' } },
    { variant: 'normal', placement: 'right', class: { base: 'top-2 bottom-2 right-2' } },

    { variant: 'outline', placement: 'left', class: { base: 'top-0 bottom-0 left-0' } },
    { variant: 'outline', placement: 'right', class: { base: 'top-0 bottom-0 right-0' } },

    { variant: 'outline', placement: 'right', class: { base: 'rounded-r-0', wrapper: 'rounded-r-0' } },
    { variant: 'outline', placement: 'left', class: { base: 'rounded-l-0', wrapper: 'rounded-l-0' } },
    { variant: 'outline', placement: 'top', class: { wrapper: 'rounded-t-0' } },
    { variant: 'outline', placement: 'bottom', class: { wrapper: 'rounded-b-0' } },
  ],

  defaultVariants: {
    variant: 'normal',
    placement: 'center',
    size: 'md',
    radius: 'lg',
    translucent: false,
  },
})

export type ModalStyleSlots = typeof useModalStyle['slots']
export type ModalStyleProps = VariantProps<typeof useModalStyle>
