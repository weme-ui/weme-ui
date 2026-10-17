import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCheckboxStyle = createVariants({
  slots: {
    root: 'flex focus-visible:outline-none',
    indicator: 'flex flex-center',
    checkedIcon: '',
    indeterminateIcon: '',
    content: 'text-left flex flex-1 flex-col select-none items-start',
    label: 'font-medium text-nowrap',
    description: '',
  },

  variants: {
    variant: {
      soft: {},
      outline: {},
      card: {},
    },
    size: {
      sm: { root: 'gap-sm', indicator: 'size-4', content: 'text-xs gap-0.5' },
      md: { root: 'gap-md', indicator: 'size-5', content: 'text-sm gap-1', description: 'text-xs' },
      lg: { root: 'gap-lg', indicator: 'size-6', content: 'text-base gap-1.5', description: 'text-sm' },
    },
    radius: {
      none: { indicator: 'rounded-none' },
      xs: { indicator: 'rounded-xs' },
      sm: { indicator: 'rounded-sm' },
      md: { indicator: 'rounded-md' },
      lg: { indicator: 'rounded-lg' },
      xl: { indicator: 'rounded-xl' },
      full: { indicator: 'rounded-full' },
    },
    align: {
      start: { root: 'items-start' },
      center: { root: 'items-center' },
      end: { root: 'items-end' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    unstyled: {
      false: {
        content: 'text-foreground data-[state=checked]:text-highlighted',
        description: 'text-subtle',
      },
    },
    inverted: { true: {} },
  },

  compoundSlots: [
    { slots: ['root', 'indicator', 'checkedIcon', 'indeterminateIcon', 'label'], unstyled: false, class: 'transition-colors duration-200' },

    { slots: ['checkedIcon', 'indeterminateIcon'], class: 'shrink-0' },

    { slots: ['checkedIcon', 'indeterminateIcon'], size: 'sm', class: 'size-3' },
    { slots: ['checkedIcon', 'indeterminateIcon'], size: 'md', class: 'size-4' },
    { slots: ['checkedIcon', 'indeterminateIcon'], size: 'lg', class: 'size-5' },
  ],

  compoundVariants: [
    { variant: ['soft', 'outline'], unstyled: false, class: { indicator: 'data-[state=checked]:bg-accent' } },

    { variant: ['soft', 'outline'], unstyled: false, inverted: false, class: { indicator: 'text-highlighted' } },
    { variant: ['soft', 'outline'], unstyled: false, inverted: true, class: { indicator: 'text-inverted' } },

    { variant: 'soft', unstyled: false, class: { indicator: 'bg-muted hover:data-[state=unchecked]:bg-elevated' } },
    { variant: 'outline', unstyled: false, class: { indicator: 'b b-base bg-base data-[state=checked]:b-accent hover:data-[state=unchecked]:b-elevated' } },

    {
      variant: 'card',
      unstyled: false,
      class: {
        root: 'b b-base bg-base data-[state=checked]:b-accent data-[state=checked]:outline-2 data-[state=checked]:outline-accent-4 hover:data-[state=unchecked]:b-elevated',
        indicator: 'text-accent',
      },
    },

    { variant: 'card', size: 'sm', unstyled: false, class: { root: 'px-sm py-xs' } },
    { variant: 'card', size: 'md', unstyled: false, class: { root: 'px-lg py-md' } },
    { variant: 'card', size: 'lg', unstyled: false, class: { root: 'px-xl py-lg' } },

    { variant: 'card', radius: 'none', unstyled: false, class: { root: 'rounded-none' } },
    { variant: 'card', radius: 'xs', unstyled: false, class: { root: 'rounded-xs' } },
    { variant: 'card', radius: 'sm', unstyled: false, class: { root: 'rounded-sm' } },
    { variant: 'card', radius: 'md', unstyled: false, class: { root: 'rounded-md' } },
    { variant: 'card', radius: 'lg', unstyled: false, class: { root: 'rounded-lg' } },
    { variant: 'card', radius: 'xl', unstyled: false, class: { root: 'rounded-xl' } },
    { variant: 'card', radius: 'full', unstyled: false, class: { root: 'rounded-full' } },
  ],

  defaultVariants: {
    variant: 'soft',
    size: 'md',
    radius: 'md',
  },
})

export type CheckboxStyleSlots = typeof useCheckboxStyle['slots']
export type CheckboxStyleProps = VariantProps<typeof useCheckboxStyle>
