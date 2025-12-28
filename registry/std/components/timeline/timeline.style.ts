import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useTimelineStyle = createVariants({
  slots: {
    root: 'flex-(~ col)',
    item: 'flex',
    connector: 'relative flex-(~ col y-center)',
    separator: 'abs-(~ x-center) inset-y-0',
    indicator: 'relative flex-(~ center) rounded-full z-1',
    avatar: '',
    icon: '',
    content: 'flex-(~ 1 col) gap-1',
    title: 'flex-(~ y-center) gap-1 font-semibold',
    description: 'c-toned',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: {
      solid: '',
      soft: '',
      surface: '',
      outline: {
        indicator: 'bg-default',
      },
    },
    size: {
      sm: { item: 'gap-2', separator: 'w-px', avatar: 'size-4', icon: 'size-2.5', content: 'pb-4', title: 'h-4 text-3', description: 'text-xs' },
      md: { item: 'gap-3', separator: 'w-[2px]', avatar: 'size-5', icon: 'size-3', content: 'pb-5', title: 'h-5 text-4', description: 'text-sm' },
      lg: { item: 'gap-4', separator: 'w-[3px]', avatar: 'size-6', icon: 'size-4', content: 'pb-6', title: 'h-6 text-5', description: 'text-base' },
      xl: { item: 'gap-5', separator: 'w-[4px]', avatar: 'size-8', icon: 'size-5', content: 'pb-8', title: 'h-8 text-6', description: 'text-base' },
    },
    reversed: {
      true: { root: 'flex-col-reverse' },
    },
    hasIcon: {
      true: '',
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

    { color: 'primary', variant: 'outline', hasIcon: false, class: { indicator: 'b-primary' } },
    { color: 'secondary', variant: 'outline', hasIcon: false, class: { indicator: 'b-secondary' } },
    { color: 'neutral', variant: 'outline', hasIcon: false, class: { indicator: 'b-neutral' } },
    { color: 'info', variant: 'outline', hasIcon: false, class: { indicator: 'b-info' } },
    { color: 'success', variant: 'outline', hasIcon: false, class: { indicator: 'b-success' } },
    { color: 'warning', variant: 'outline', hasIcon: false, class: { indicator: 'b-warning' } },
    { color: 'danger', variant: 'outline', hasIcon: false, class: { indicator: 'b-danger' } },

    { variant: 'outline', hasIcon: false, class: { indicator: 'box-border' } },

    { size: 'sm', variant: 'outline', hasIcon: false, class: { indicator: '!b-px' } },
    { size: 'md', variant: 'outline', hasIcon: false, class: { indicator: '!b-[2px]' } },
    { size: 'lg', variant: 'outline', hasIcon: false, class: { indicator: '!b-[3px]' } },
    { size: 'xl', variant: 'outline', hasIcon: false, class: { indicator: '!b-[4px]' } },

    { color: 'primary', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-primary-3' } },
    { color: 'secondary', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-secondary-3' } },
    { color: 'neutral', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-neutral-3' } },
    { color: 'info', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-info-3' } },
    { color: 'success', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-success-3' } },
    { color: 'warning', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-warning-3' } },
    { color: 'danger', variant: ['soft', 'surface', 'outline'], class: { separator: 'bg-danger-3' } },

    { size: 'sm', hasIcon: true, class: { indicator: 'size-4 [&_*]:size-2.5' } },
    { size: 'md', hasIcon: true, class: { indicator: 'size-5 [&_*]:size-3' } },
    { size: 'lg', hasIcon: true, class: { indicator: 'size-6 [&_*]:size-3.5' } },
    { size: 'xl', hasIcon: true, class: { indicator: 'size-8 [&_*]:size-4' } },

    { size: 'sm', hasIcon: false, class: { indicator: 'size-2.5 mt-0.5', separator: 'mt-0.5 -mb-0.5' } },
    { size: 'md', hasIcon: false, class: { indicator: 'size-3 mt-1', separator: 'mt-1 -mb-1' } },
    { size: 'lg', hasIcon: false, class: { indicator: 'size-4 mt-1', separator: 'mt-1 -mb-1' } },
    { size: 'xl', hasIcon: false, class: { indicator: 'size-6 mt-1', separator: 'mt-1 -mb-1' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    size: 'sm',
  },
})

export type TimelineStyleSlots = typeof useTimelineStyle['slots']
export type TimelineStyleProps = VariantProps<typeof useTimelineStyle>
