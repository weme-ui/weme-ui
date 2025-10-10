import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSelectStyle = createVariants({
  slots: {
    trigger: 'select-none transition-colors outline-0 disabled:is-disabled',
    leading: '',
    leadingIcon: '',
    trailing: '',
    trailingIcon: '',
    value: 'flex-1 text-(highlighted left) truncate',
    placeholder: 'flex-1 text-(toned left nowrap) truncate',
    content: [
      'min-w-$reka-select-trigger-width max-h-60 bg-neutral-1 b-(~ default) shadow-lg py-0.5',
      'state-open:animate-scale-in state-closed:animate-scale-out origin-$reka-select-content-transform-origin',
    ],
    scrollArea: 'flex-(~ col) overflow-y-auto',
    viewport: 'flex-1 divide-(y default)',
    group: 'select-none',
    label: '',
    item: [
      'group relative outline-none text-highlighted transition-colors',
      'data-[disabled]:is-disabled state-checked:font-medium data-[highlighted]:bg-muted',
    ],
    itemIcon: 'c-toned group-state-checked:c-highlighted',
    itemAvatar: '',
    itemChip: '',
    itemText: 'flex-1 truncate',
    itemLeading: '',
    itemTrailing: '',
    indicator: 'c-highlighted',
    separator: 'h-px bg-border my-1',
    empty: 'min-h-40',
  },

  variants: {
    color: { accent: '', neutral: '', info: '', success: '', warning: '', error: '' },
    variant: {
      normal: { trigger: 'bg-elevated hover:not-disabled:bg-neutral-5 state-open:(bg-neutral-1 outline-1 ring-3)' },
      outline: { trigger: 'ring-(1 default) hover:not-disabled:ring-neutral-8 state-open:(bg-neutral-1 outline-1 ring-3)' },
      none: '',
    },
    radius: {
      none: '',
      xs: { trigger: 'rounded-xs', content: 'rounded-xs' },
      sm: { trigger: 'rounded-sm', content: 'rounded-sm' },
      md: { trigger: 'rounded-md', content: 'rounded-md' },
      lg: { trigger: 'rounded-lg', content: 'rounded-lg' },
      xl: { trigger: 'rounded-xl', content: 'rounded-xl' },
    },
    size: { xs: '', sm: '', md: '', lg: '' },
  },

  compoundSlots: [
    { slots: ['leading', 'trailing', 'itemLeading', 'itemTrailing', 'empty'], class: 'relative flex-(~ center)' },
    { slots: ['trigger', 'item', 'label'], class: 'flex-(~ y-center)' },

    { size: 'xs', slots: ['trigger', 'item', 'label'], class: 'text-xs h-5 px-2 gap-x-1' },
    { size: 'sm', slots: ['trigger', 'item', 'label'], class: 'text-sm h-6 px-2 gap-x-1.5' },
    { size: 'md', slots: ['trigger', 'item', 'label'], class: 'text-sm h-8 px-3 gap-x-2' },
    { size: 'lg', slots: ['trigger', 'item', 'label'], class: 'text-base h-10 px-3 gap-x-2' },
  ],

  compoundVariants: [
    { color: 'accent', variant: ['normal', 'outline'], class: { trigger: 'state-open:(outline-accent ring-accent-4)' } },
    { color: 'neutral', variant: ['normal', 'outline'], class: { trigger: 'state-open:(outline-neutral ring-neutral-4)' } },
    { color: 'info', variant: ['normal', 'outline'], class: { trigger: 'state-open:(outline-info ring-info-4)' } },
    { color: 'success', variant: ['normal', 'outline'], class: { trigger: 'state-open:(outline-success ring-success-4)' } },
    { color: 'warning', variant: ['normal', 'outline'], class: { trigger: 'state-open:(outline-warning ring-warning-4)' } },
    { color: 'error', variant: ['normal', 'outline'], class: { trigger: 'state-open:(outline-error ring-error-4)' } },
  ],

  defaultVariants: {
    color: 'accent',
    variant: 'normal',
    radius: 'sm',
    size: 'md',
  },
})

export type SelectStyleSlots = typeof useSelectStyle['slots']
export type SelectStyleProps = VariantProps<typeof useSelectStyle>
