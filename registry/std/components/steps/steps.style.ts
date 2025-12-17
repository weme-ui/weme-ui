import type { VariantProps } from '~/utils/styles'
import { createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useStepsStyle = createVariants({
  slots: {
    base: 'flex w-full',
    item: 'flex items-start',
    trigger: 'font-medium state-active:font-bold',
    indicator: 'flex-(~ center) rounded-full transition-colors',
    indicatorIcon: 'shrink-0',
    wrapper: 'flex-(~ 1 col) items-start',
    title: 'flex-(~ y-center) transition-colors state-active:(font-bold text-highlighted)',
    description: 'text-toned transition-colors state-active:(font-medium text-highlighted)',
    separator: 'abs bg-border box-border transition-colors',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: { solid: '', soft: '' },
    orientation: {
      horizontal: {
        base: 'flex-row justify-end',
        item: 'flex-row',
        wrapper: 'overflow-hidden',
        title: 'relative',
        separator: '',
      },
      vertical: {
        base: 'flex-col',
        item: 'pb-8 overflow-hidden',
        trigger: 'relative',
      },
    },
    size: {
      sm: { base: 'gap-3', item: 'gap-3', indicator: 'size-6 text-sm', indicatorIcon: 'size-3', title: 'h-6 text-sm', description: 'text-xs' },
      md: { base: 'gap-4', item: 'gap-4', indicator: 'size-8 text-base', indicatorIcon: 'size-4', title: 'h-8 text-base', description: 'text-sm' },
      lg: { base: 'gap-5', item: 'gap-5', indicator: 'size-10 text-lg', indicatorIcon: 'size-5', title: 'h-10 text-lg', description: 'text-base' },
    },
    isLatest: {
      true: {},
      false: {
        item: 'flex-1',
      },
    },
  },

  compoundVariants: [
    { color: 'primary', variant: ['solid', 'soft'], class: { indicator: 'box-primary-soft state-active:box-primary', separator: 'bg-primary-3 state-completed:bg-primary' } },
    { color: 'secondary', variant: ['solid', 'soft'], class: { indicator: 'box-secondary-soft state-active:box-secondary', separator: 'bg-secondary-3 state-completed:bg-secondary' } },
    { color: 'neutral', variant: ['solid', 'soft'], class: { indicator: 'box-neutral-soft state-active:box-neutral', separator: 'bg-neutral-3 state-completed:bg-neutral' } },
    { color: 'info', variant: ['solid', 'soft'], class: { indicator: 'box-info-soft state-active:box-info', separator: 'bg-info-3 state-completed:bg-info' } },
    { color: 'success', variant: ['solid', 'soft'], class: { indicator: 'box-success-soft state-active:box-success', separator: 'bg-success-3 state-completed:bg-success' } },
    { color: 'warning', variant: ['solid', 'soft'], class: { indicator: 'box-warning-soft state-active:box-warning', separator: 'bg-warning-3 state-completed:bg-warning' } },
    { color: 'danger', variant: ['solid', 'soft'], class: { indicator: 'box-danger-soft state-active:box-danger', separator: 'bg-danger-3 state-completed:bg-danger' } },

    { color: 'primary', variant: 'solid', class: { indicator: 'state-completed:box-primary' } },
    { color: 'primary', variant: 'soft', class: { indicator: 'state-completed:box-primary-soft' } },
    { color: 'secondary', variant: 'solid', class: { indicator: 'state-completed:box-secondary' } },
    { color: 'secondary', variant: 'soft', class: { indicator: 'state-completed:box-secondary-soft' } },
    { color: 'neutral', variant: 'solid', class: { indicator: 'state-completed:box-neutral' } },
    { color: 'neutral', variant: 'soft', class: { indicator: 'state-completed:box-neutral-soft' } },
    { color: 'info', variant: 'solid', class: { indicator: 'state-completed:box-info' } },
    { color: 'info', variant: 'soft', class: { indicator: 'state-completed:box-info-soft' } },
    { color: 'success', variant: 'solid', class: { indicator: 'state-completed:box-success' } },
    { color: 'success', variant: 'soft', class: { indicator: 'state-completed:box-success-soft' } },
    { color: 'warning', variant: 'solid', class: { indicator: 'state-completed:box-warning' } },
    { color: 'warning', variant: 'soft', class: { indicator: 'state-completed:box-warning-soft' } },
    { color: 'danger', variant: 'solid', class: { indicator: 'state-completed:box-danger' } },
    { color: 'danger', variant: 'soft', class: { indicator: 'state-completed:box-danger-soft' } },

    { orientation: 'horizontal', size: 'sm', class: { title: 'pr-3', separator: 'h-px w-xl left-full top-3' } },
    { orientation: 'horizontal', size: 'md', class: { title: 'pr-4', separator: 'h-2px w-xl left-full top-4' } },
    { orientation: 'horizontal', size: 'lg', class: { title: 'pr-5', separator: 'h-3px w-xl left-full top-5' } },

    { orientation: 'vertical', size: 'sm', class: { trigger: 'pb-3', separator: 'w-px h-xl top-full left-3' } },
    { orientation: 'vertical', size: 'md', class: { trigger: 'pb-4', separator: 'w-2px h-xl top-full left-4' } },
    { orientation: 'vertical', size: 'lg', class: { trigger: 'pb-5', separator: 'w-3px h-xl top-full left-5' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    orientation: 'horizontal',
    size: 'md',
    isLatest: false,
  },
})

export type StepsStyleSlots = typeof useStepsStyle['slots']
export type StepsStyleProps = VariantProps<typeof useStepsStyle>
