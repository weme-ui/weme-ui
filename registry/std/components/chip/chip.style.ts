import type { VariantProps } from '~/utils/styles'
import { createColorCompoundVariants, createColorVariants } from '#weme/utils/styles'
import { createVariants } from '~/utils/styles'

export const useChipStyle = createVariants({
  slots: {
    base: 'flex-(inline center) relative shrink-0',
    chip: 'flex-(~ center) ring-(1 neutral-1) rounded-full leading-none select-none text-[11px] font-medium whitespace-nowrap z-popup',
  },

  variants: {
    color: createColorVariants({ defaults: '' }),
    variant: {
      normal: { chip: 'p-1' },
      icon: { chip: 'ring-0' },
      dotted: { chip: 'size-2' },
    },
    position: {
      tr: { chip: 'top-0 right-0' },
      tl: { chip: 'top-0 left-0' },
      br: { chip: 'bottom-0 right-0' },
      bl: { chip: 'bottom-0 left-0' },
    },
    standalone: {
      true: { chip: 'mr-1.5' },
      false: { chip: 'abs' },
    },
    inset: {
      false: '',
    },
  },

  compoundVariants: [
    ...createColorCompoundVariants({
      type: 'box',
      variants: { normal: 'solid', icon: 'plain', dotted: 'solid' },
      slot: 'chip',
    }),

    { variant: ['normal', 'icon'], class: { chip: 'min-w-4 h-4' } },

    { inset: false, standalone: false, position: 'tr', class: { chip: '-translate-y-1/2 translate-x-1/2' } },
    { inset: false, standalone: false, position: 'tl', class: { chip: '-translate-y-1/2 -translate-x-1/2' } },
    { inset: false, standalone: false, position: 'br', class: { chip: 'translate-y-1/2 translate-x-1/2' } },
    { inset: false, standalone: false, position: 'bl', class: { chip: 'translate-y-1/2 -translate-x-1/2' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'normal',
    position: 'tr',
    standalone: false,
    inset: false,
  },
})

export type ChipStyleSlots = typeof useChipStyle['slots']
export type ChipStyleProps = VariantProps<typeof useChipStyle>
