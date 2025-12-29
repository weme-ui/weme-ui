import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAccordionStyle = createVariants({
  slots: {
    root: 'flex-(~ col) overflow-hidden',
    item: 'group overflow-hidden focus-visible:outline-none',
    header: '',
    trigger: 'flex w-full',
    headerIconWrapper: 'flex-(~ center)',
    headerIcon: '',
    headerTitleWrapper: 'flex-(~ 1 col) items-start',
    headerTitle: 'c-highlighted font-medium group-state-open:font-semibold',
    headerDescription: 'c-toned',
    triggerIndicatorWrapper: 'flex-(~ center)',
    triggerIndicator: 'flex-(~ center) c-toned group-hover:c-highlighted transition-[color,transform] group-state-open:(rotate-180 c-highlighted)',
    content: 'overflow-hidden will-change-height state-open:animate-accordion-open state-closed:animate-accordion-close',
    contentBody: '',
  },

  variants: {
    color: {
      primary: { trigger: 'focus-visible:outline-primary', headerIcon: 'c-primary' },
      secondary: { trigger: 'focus-visible:outline-secondary', headerIcon: 'c-secondary' },
      neutral: { trigger: 'focus-visible:outline-neutral', headerIcon: 'c-neutral' },
      info: { trigger: 'focus-visible:outline-info', headerIcon: 'c-info' },
      success: { trigger: 'focus-visible:outline-success', headerIcon: 'c-success' },
      warning: { trigger: 'focus-visible:outline-warning', headerIcon: 'c-warning' },
      danger: { trigger: 'focus-visible:outline-danger', headerIcon: 'c-danger' },
    },
    variant: {
      normal: {
        item: 'b-(b default)',
      },
      card: {
        item: 'b-(~ default) state-open:shadow-xs',
        header: 'state-open:b-(b default)',
      },
      table: {
        root: 'b-(~ default)',
        item: 'not-last:b-(b default)',
        header: 'state-open:b-(b default)',
      },
    },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '' },
    size: {
      sm: {
        headerIconWrapper: 'size-5',
        headerIcon: 'text-3',
        headerTitle: 'text-sm',
        headerDescription: 'text-xs',
        trigger: 'gap-1',
        triggerIndicatorWrapper: 'size-5',
        triggerIndicator: 'size-3',
        contentBody: 'text-sm',
      },
      md: {
        headerIconWrapper: 'size-6',
        headerIcon: 'text-4',
        headerTitle: 'text-base',
        headerDescription: 'text-sm',
        trigger: 'gap-1.5',
        triggerIndicatorWrapper: 'size-6',
        triggerIndicator: 'size-4',
        contentBody: 'text-base',
      },
      lg: {
        headerIconWrapper: 'size-7',
        headerIcon: 'text-5',
        headerTitle: 'text-lg',
        headerDescription: 'text-base',
        trigger: 'gap-2',
        triggerIndicatorWrapper: 'size-7',
        triggerIndicator: 'size-5',
        contentBody: 'text-lg',
      },
    },
    align: {
      start: { trigger: 'items-start' },
      center: { trigger: 'items-center' },
      end: { trigger: 'items-end' },
    },
    disabled: {
      true: {
        item: 'is-disabled',
      },
    },
  },

  compoundVariants: [
    { variant: 'normal', size: 'sm', class: { header: 'py-2', contentBody: 'px-1 pb-2' } },
    { variant: 'normal', size: 'md', class: { header: 'py-3', contentBody: 'px-1 pb-3' } },
    { variant: 'normal', size: 'lg', class: { header: 'py-4', contentBody: 'px-1.5 pb-4' } },

    { variant: 'card', size: 'sm', class: { root: 'gap-2' } },
    { variant: 'card', size: 'md', class: { root: 'gap-3' } },
    { variant: 'card', size: 'lg', class: { root: 'gap-4' } },

    { variant: ['card', 'table'], size: 'sm', class: { header: 'p-1.5', contentBody: 'p-2.5' } },
    { variant: ['card', 'table'], size: 'md', class: { header: 'p-2', contentBody: 'p-4' } },
    { variant: ['card', 'table'], size: 'lg', class: { header: 'p-3', contentBody: 'p-6' } },

    { variant: 'card', radius: 'none', class: { item: 'rounded-none' } },
    { variant: 'card', radius: 'xs', class: { item: 'rounded-xs' } },
    { variant: 'card', radius: 'sm', class: { item: 'rounded-sm' } },
    { variant: 'card', radius: 'md', class: { item: 'rounded-md' } },
    { variant: 'card', radius: 'lg', class: { item: 'rounded-lg' } },
    { variant: 'card', radius: 'xl', class: { item: 'rounded-xl' } },

    { variant: 'table', radius: 'none', class: { root: 'rounded-none' } },
    { variant: 'table', radius: 'xs', class: { root: 'rounded-xs' } },
    { variant: 'table', radius: 'sm', class: { root: 'rounded-sm' } },
    { variant: 'table', radius: 'md', class: { root: 'rounded-md' } },
    { variant: 'table', radius: 'lg', class: { root: 'rounded-lg' } },
    { variant: 'table', radius: 'xl', class: { root: 'rounded-xl' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'normal',
    size: 'md',
    radius: 'md',
    align: 'start',
  },
})

export type AccordionStyleSlots = typeof useAccordionStyle['slots']
export type AccordionStyleProps = VariantProps<typeof useAccordionStyle>
