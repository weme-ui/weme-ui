import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useAccordionStyle = createVariants({
  slots: {
    base: 'flex-(~ col)',
    item: 'group overflow-hidden',
    header: 'bg-accordion px-4 py-2.5',
    trigger: 'flex w-full',
    icon: 'flex-(~ center) h-6 mr-3',
    title: 'c-highlighted font-normal group-state-open:font-medium',
    description: 'text-(sm toned)',
    arrow: 'flex-(~ center) c-toned h-6 transition-[color,transform] group-state-open:(rotate-180 c-highlighted)',
    content: 'overflow-hidden will-change-height state-open:animate-accordion-open state-closed:animate-accordion-close',
    contentInner: 'px-4 py-5',
  },

  variants: {
    color: {
      accent: { icon: 'c-accent' },
      neutral: { icon: 'c-neutral' },
      info: { icon: 'c-info' },
      success: { icon: 'c-success' },
      warning: { icon: 'c-warning' },
      error: { icon: 'c-error' },
    },
    variant: {
      normal: {
        base: 'bg-elevated p-1',
        item: 'not-last:state-closed:(b-b b-default)',
        header: 'group-state-open:shadow-xs',
      },
      underline: {
        item: 'b-(b default)',
      },
      card: {
        base: 'bg-accordion gap-y-3',
        item: 'ring-(~ default) state-open:shadow-sm hover:shadow-sm',
        header: 'state-open:b-(b default)',
      },
      table: {
        base: 'bg-accordion',
        item: 'ring-(~ default)',
        header: 'state-open:b-(b default)',
      },
    },
    align: {
      start: { trigger: 'items-start' },
      center: { trigger: 'items-center' },
      end: { trigger: 'items-end' },
    },
    radius: { none: '', sm: '', md: '', lg: '', xl: '' },
  },

  compoundVariants: [
    { variant: ['normal', 'table'], radius: 'sm', class: { base: 'rounded-sm', item: 'first:rounded-t-sm last:rounded-b-sm' } },
    { variant: ['normal', 'table'], radius: 'md', class: { base: 'rounded-md', item: 'first:rounded-t-md last:rounded-b-md' } },
    { variant: ['normal', 'table'], radius: 'lg', class: { base: 'rounded-lg', item: 'first:rounded-t-lg last:rounded-b-lg' } },
    { variant: ['normal', 'table'], radius: 'xl', class: { base: 'rounded-xl', item: 'first:rounded-t-xl last:rounded-b-xl' } },

    { variant: 'card', radius: 'sm', class: { item: 'rounded-sm' } },
    { variant: 'card', radius: 'md', class: { item: 'rounded-md' } },
    { variant: 'card', radius: 'lg', class: { item: 'rounded-lg' } },
    { variant: 'card', radius: 'xl', class: { item: 'rounded-xl' } },
  ],

  defaultVariants: {
    color: 'neutral',
    variant: 'normal',
    align: 'start',
    radius: 'md',
  },
})

export type AccordionStyleSlots = typeof useAccordionStyle['slots']
export type AccordionStyleProps = VariantProps<typeof useAccordionStyle>
