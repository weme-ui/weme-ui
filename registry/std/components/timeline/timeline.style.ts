import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTimelineStyle = createVariants({
  slots: {
    base: 'flex-(~ col)',
    item: 'flex',
    connector: 'flex-(~ col y-center)',
    separator: 'flex-1',
    indicator: 'flex-(~ center) rounded-full',
    avatar: '',
    icon: '',
    content: 'flex-(~ 1 col) gap-1',
    title: 'flex-(~ y-center) gap-1 font-semibold',
    description: 'c-toned',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '', surface: '', outline: '' },
    size: {
      sm: { item: 'gap-2', separator: 'w-px', indicator: 'size-4 [&_*]:size-2.5', avatar: 'size-4', icon: 'size-2.5', content: 'pb-4', title: 'h-4 text-3', description: 'text-xs' },
      md: { item: 'gap-3', separator: 'w-[2px]', indicator: 'size-5 [&_*]:size-3', avatar: 'size-5', icon: 'size-3', content: 'pb-5', title: 'h-5 text-4', description: 'text-sm' },
      lg: { item: 'gap-4', separator: 'w-[3px]', indicator: 'size-6 [&_*]:size-3.5', avatar: 'size-6', icon: 'size-4', content: 'pb-6', title: 'h-6 text-5', description: 'text-base' },
      xl: { item: 'gap-5', separator: 'w-[4px]', indicator: 'size-8 [&_*]:size-4', avatar: 'size-8', icon: 'size-5', content: 'pb-8', title: 'h-8 text-6', description: 'text-base' },
    },
    reversed: {
      true: { base: 'flex-col-reverse' },
    },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: ['solid', 'soft', 'surface', 'outline'],
      slot: 'indicator',
    }),

    { color: 'primary', variant: 'solid', class: { separator: 'bg-primary' } },
    { color: 'secondary', variant: 'solid', class: { separator: 'bg-secondary' } },
    { color: 'neutral', variant: 'solid', class: { separator: 'bg-neutral' } },
    { color: 'info', variant: 'solid', class: { separator: 'bg-info' } },
    { color: 'success', variant: 'solid', class: { separator: 'bg-success' } },
    { color: 'warning', variant: 'solid', class: { separator: 'bg-warning' } },
    { color: 'danger', variant: 'solid', class: { separator: 'bg-danger' } },

    { color: 'primary', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-primary-3' } },
    { color: 'secondary', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-secondary-3' } },
    { color: 'neutral', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-neutral-3' } },
    { color: 'info', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-info-3' } },
    { color: 'success', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-success-3' } },
    { color: 'warning', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-warning-3' } },
    { color: 'danger', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-danger-3' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'md',
  },
})

export type TimelineStyleSlots = typeof useTimelineStyle['slots']
export type TimelineStyleProps = VariantProps<typeof useTimelineStyle>
