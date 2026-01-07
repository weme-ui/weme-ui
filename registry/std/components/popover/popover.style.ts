import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const usePopoverStyle = createVariants({
  slots: {
    trigger: '',
    contentWrapper: [
      'pointer-events-auto focus:outline-none',
      'state-open:animate-scale-in state-closed:animate-scale-out origin-$reka-popover-content-transform-origin',
    ],
    content: '',
    arrow: '',
    close: '',
  },

  variants: {
    variant: {
      normal: {
        content: 'shadow-sm',
      },
      outline: {
        content: 'ring-(~ border) shadow-2xl',
        arrow: 'stroke-default',
      },
    },
    size: {
      sm: { content: 'p-2' },
      md: { content: 'p-3' },
      lg: { content: 'p-4' },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '' },
    translucent: {
      true: { content: 'bg-popover/80 backdrop-blur-3xl', arrow: 'fill-popover/80' },
      false: { content: 'bg-popover', arrow: 'fill-popover' },
    },
  },

  compoundVariants: [
    { variant: 'normal', radius: 'xs', class: { contentWrapper: 'rounded-xs', content: 'rounded-xs' } },
    { variant: 'normal', radius: 'sm', class: { contentWrapper: 'rounded-sm', content: 'rounded-xs' } },
    { variant: 'normal', radius: 'md', class: { contentWrapper: 'rounded-md', content: 'rounded-sm' } },
    { variant: 'normal', radius: 'lg', class: { contentWrapper: 'rounded-lg', content: 'rounded-md' } },
    { variant: 'normal', radius: 'xl', class: { contentWrapper: 'rounded-xl', content: 'rounded-lg' } },

    { variant: 'outline', radius: 'xs', class: { content: 'rounded-xs' } },
    { variant: 'outline', radius: 'sm', class: { content: 'rounded-sm' } },
    { variant: 'outline', radius: 'md', class: { content: 'rounded-md' } },
    { variant: 'outline', radius: 'lg', class: { content: 'rounded-lg' } },
    { variant: 'outline', radius: 'xl', class: { content: 'rounded-xl' } },

    { variant: 'normal', size: 'sm', class: { contentWrapper: 'p-1' } },
    { variant: 'normal', size: 'md', class: { contentWrapper: 'p-1.25' } },
    { variant: 'normal', size: 'lg', class: { contentWrapper: 'p-1.5' } },

    { variant: 'normal', translucent: true, class: { contentWrapper: 'bg-muted/80 backdrop-blur-3xl', arrow: 'fill-muted/80 backdrop-blur-3xl' } },
    { variant: 'normal', translucent: false, class: { contentWrapper: 'bg-muted', arrow: 'fill-muted' } },
  ],

  defaultVariants: {
    variant: 'normal',
    size: 'sm',
    radius: 'md',
    translucent: false,
  },
})

export type PopoverStyleSlots = typeof usePopoverStyle['slots']
export type PopoverStyleProps = VariantProps<typeof usePopoverStyle>
