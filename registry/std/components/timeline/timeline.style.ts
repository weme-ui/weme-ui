import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTimelineStyle = createVariants({
  slots: {
    base: 'flex',
    item: 'flex',
    wrapper: 'flex-(~ y-center)',
    indicator: '',
    icon: '',
    separator: '',
    content: '',
    date: 'flex-(~ y-center) text-muted',
    title: 'text-highlighted font-medium',
    description: 'text-toned',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    orientation: {
      vertical: {
        base: 'flex-col',
        item: 'gap-x-4',
        wrapper: 'flex-col',
        separator: 'h-auto flex-1',
      },
      horizontal: {
        base: 'flex-row',
        item: 'flex-1 flex-col gap-x-4',

        separator: 'w-auto flex-1',
      },
    },
    reverse: {
      true: '',
    },
    size: {
      xs: { content: 'text-xs pb-3', date: 'h-6' },
      sm: { content: 'text-sm pb-4', date: 'h-6 text-xs', description: 'text-xs' },
      md: { content: 'text-base pb-6', date: 'h-8 text-sm', description: 'text-sm' },
      lg: { content: 'text-lg pb-8', date: 'h-10 text-base', description: 'text-base' },
      xl: { content: 'text-xl pb-10', date: 'h-16 text-lg', description: 'text-lg' },
    },
  },

  compoundVariants: [
    { orientation: 'vertical', reverse: true, class: { base: 'flex-col-reverse' } },
    { orientation: 'horizontal', reverse: true, class: { base: 'flex-row-reverse' } },
  ],

  defaultVariants: {
    color: 'accent',
    orientation: 'vertical',
    size: 'md',
  },
})

export type TimelineStyleSlots = typeof useTimelineStyle['slots']
export type TimelineStyleProps = VariantProps<typeof useTimelineStyle>
