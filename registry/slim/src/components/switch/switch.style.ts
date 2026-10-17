import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSwitchStyle = createVariants({
  slots: {
    root: 'group/switch outline-none flex flex-y-center relative',
    thumb: 'my-auto will-change-transform rounded-inherit flex translate-x-1 flex-center',
    indicator: 'shrink-0',
    checkedIcon: '',
    uncheckedIcon: '',
  },

  variants: {
    variant: {
      soft: {},
      outline: {},
    },
    radius: {
      none: { root: 'rounded-none' },
      xs: { root: 'rounded-xs' },
      sm: { root: 'rounded-sm' },
      md: { root: 'rounded-md' },
      lg: { root: 'rounded-lg' },
      xl: { root: 'rounded-xl' },
      full: { root: 'rounded-full' },
    },
    size: {
      sm: { root: 'h-5 w-9', thumb: 'size-3.5 data-[state=checked]:translate-x-4.5', indicator: 'size-2.5' },
      md: { root: 'h-6 w-11', thumb: 'size-4.5 data-[state=checked]:translate-x-5.5', indicator: 'size-3' },
      lg: { root: 'h-7 w-13', thumb: 'size-5.5 data-[state=checked]:translate-x-6.5', indicator: 'size-4' },
    },
    disabled: {
      true: { root: 'is-disabled' },
    },
    loading: {
      true: { root: 'is-loading', indicator: 'animate-spin' },
    },
    inverted: { true: {} },
    unstyled: {
      false: {
        root: 'bg-muted transition-colors duration-200 data-[state=checked]:bg-accent hover:data-[state=unchecked]:bg-elevated',
        thumb: 'shadow-xs transition-transform duration-200 ease-out group-aria-[pressed=true]/switch:scale-90',
      },
    },
  },

  compoundVariants: [
    { inverted: true, unstyled: false, class: { thumb: 'bg-inverted' } },
    { inverted: false, unstyled: false, class: { thumb: 'bg-base' } },

    { variant: 'outline', unstyled: false, class: { root: 'b-transparent data-[state=unchecked]:b data-[state=unchecked]:b-base hover:data-[state=unchecked]:b-elevated' } },
  ],

  defaultVariants: {
    variant: 'soft',
    radius: 'full',
    size: 'md',
    inverted: false,
  },
})

export type SwitchStyleSlots = typeof useSwitchStyle['slots']
export type SwitchStyleProps = VariantProps<typeof useSwitchStyle>
