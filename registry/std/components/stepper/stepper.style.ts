import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useStepperStyle = createVariants({
  slots: {
    base: 'flex',
    item: 'group relative flex gap-3 overflow-hidden',
    trigger: 'flex-(~ center) relative size-8 rounded-full bg-elevated transition-colors cursor-pointer',
    indicator: '',
    icon: 'text-4 shrink-0',
    content: '',
    title: 'relative inline-block pt-1 pr-3 transition-colors group-state-active:(text-highlighted font-semibold) group-state-completed:text-highlighted',
    description: 'text-(sm toned)',
  },

  variants: {
    color: {
      accent: {
        trigger: 'state-active:(bg-accent c-accent-1) state-completed:(bg-accent-3 c-accent-9)',
      },
      neutral: {
        trigger: 'state-active:(bg-neutral c-neutral-1) state-completed:(bg-neutral-3 c-neutral-9)',
      },
      info: {
        trigger: 'state-active:(bg-info c-info-1) state-completed:(bg-info-3 c-info-9)',
      },
      success: {
        trigger: 'state-active:(bg-success c-success-1) state-completed:(bg-success-3 c-success-9)',
      },
      warning: {
        trigger: 'state-active:(bg-warning c-warning-1) state-completed:(bg-warning-3 c-warning-9)',
      },
      error: {
        trigger: 'state-active:(bg-error c-error-1) state-completed:(bg-error-3 c-error-9)',
      },
    },
    orientation: {
      horizontal: {
        base: 'flex-row justify-end gap-3',
        item: 'items-start',
        content: '',
      },
      vertical: {
        base: 'flex-col gap-2',
        item: 'pb-8',
      },
    },
    isLatest: { false: { item: 'flex-1' } },
    linear: { true: '' },
  },

  compoundVariants: [
    { linear: true, orientation: 'horizontal', isLatest: false, class: { title: 'after:(abs block content-[""] box-border h-px w-xl left-full top-4 transition-colors bg-border)' } },
    { linear: true, orientation: 'vertical', isLatest: false, class: { trigger: 'after:(abs block content-[""] box-border w-px h-xl left-4 top-10 transition-colors bg-border)' } },

    { color: 'accent', linear: true, orientation: 'horizontal', isLatest: false, class: { title: 'group-state-completed:after:bg-accent' } },
    { color: 'accent', linear: true, orientation: 'vertical', isLatest: false, class: { trigger: 'state-completed:after:bg-accent' } },
    { color: 'neutral', linear: true, orientation: 'horizontal', isLatest: false, class: { title: 'group-state-completed:after:bg-neutral' } },
    { color: 'neutral', linear: true, orientation: 'vertical', isLatest: false, class: { trigger: 'state-completed:after:bg-neutral' } },
    { color: 'info', linear: true, orientation: 'horizontal', isLatest: false, class: { title: 'group-state-completed:after:bg-info' } },
    { color: 'info', linear: true, orientation: 'vertical', isLatest: false, class: { trigger: 'state-completed:after:bg-info' } },
    { color: 'success', linear: true, orientation: 'horizontal', isLatest: false, class: { title: 'group-state-completed:after:bg-success' } },
    { color: 'success', linear: true, orientation: 'vertical', isLatest: false, class: { trigger: 'state-completed:after:bg-success' } },
    { color: 'warning', linear: true, orientation: 'horizontal', isLatest: false, class: { title: 'group-state-completed:after:bg-warning' } },
    { color: 'warning', linear: true, orientation: 'vertical', isLatest: false, class: { trigger: 'state-completed:after:bg-warning' } },
    { color: 'error', linear: true, orientation: 'horizontal', isLatest: false, class: { title: 'group-state-completed:after:bg-error' } },
    { color: 'error', linear: true, orientation: 'vertical', isLatest: false, class: { trigger: 'state-completed:after:bg-error' } },

    { orientation: 'vertical', isLatest: true, class: { item: 'pb-0' } },
  ],

  defaultVariants: {
    color: 'accent',
    orientation: 'horizontal',
    linear: true,
  },
})

export type StepperStyleSlots = typeof useStepperStyle['slots']
export type StepperStyleProps = VariantProps<typeof useStepperStyle>
