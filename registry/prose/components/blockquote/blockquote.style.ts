import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useBlockquoteStyle = createVariants({
  slots: {
    base: 'relative flex-(~ col) gap-2 px-6',
    icon: 'abs left-0 top-0 flex-(inline center) text-6 leading-none',
    content: '',
    caption: 'text-(toned sm)',
  },

  variants: {
    color: {
      primary: { base: 'selection:bg-primary/20', icon: 'c-primary' },
      secondary: { base: 'selection:bg-secondary/20', icon: 'c-secondary' },
      neutral: { base: 'selection:bg-neutral/20', icon: 'c-neutral' },
      info: { base: 'selection:bg-info/20', icon: 'c-info' },
      success: { base: 'selection:bg-success/20', icon: 'c-success' },
      warning: { base: 'selection:bg-warning/20', icon: 'c-warning' },
      danger: { base: 'selection:bg-danger/20', icon: 'c-danger' },
    },
    variant: { solid: '', soft: '', none: '' },
    align: {
      start: { base: 'items-start text-start' },
      center: { base: 'items-center text-center' },
      end: { base: 'items-end text-end' },
    },
    icon: {
      true: { base: 'pl-10' },
    },
  },

  compoundVariants: [
    { variant: ['solid', 'soft'], class: { base: 'b-(is-4)' } },

    { variant: 'solid', color: 'primary', class: { base: 'b-primary' } },
    { variant: 'solid', color: 'secondary', class: { base: 'b-secondary' } },
    { variant: 'solid', color: 'neutral', class: { base: 'b-neutral' } },
    { variant: 'solid', color: 'info', class: { base: 'b-info' } },
    { variant: 'solid', color: 'success', class: { base: 'b-success' } },
    { variant: 'solid', color: 'warning', class: { base: 'b-warning' } },
    { variant: 'solid', color: 'danger', class: { base: 'b-danger' } },

    { variant: 'soft', color: 'primary', class: { base: 'b-primary-4' } },
    { variant: 'soft', color: 'secondary', class: { base: 'b-secondary-4' } },
    { variant: 'soft', color: 'neutral', class: { base: 'b-neutral-4' } },
    { variant: 'soft', color: 'info', class: { base: 'b-info-4' } },
    { variant: 'soft', color: 'success', class: { base: 'b-success-4' } },
    { variant: 'soft', color: 'warning', class: { base: 'b-warning-4' } },
    { variant: 'soft', color: 'danger', class: { base: 'b-danger-4' } },
  ],

  defaultVariants: {
    color: 'primary',
    variant: 'solid',
    align: 'start',
    icon: false,
  },
})

export type BlockquoteStyleSlots = typeof useBlockquoteStyle['slots']
export type BlockquoteStyleProps = VariantProps<typeof useBlockquoteStyle>
