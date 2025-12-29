import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useBlockquoteStyle = createVariants({
  slots: {
    root: 'relative flex-(~ col) gap-2 px-6',
    icon: 'abs left-0 top-0 flex-(inline center) text-6 leading-none',
    content: '',
    caption: 'text-(toned sm)',
  },

  variants: {
    color: {
      primary: { root: 'selection:bg-primary/20', icon: 'c-primary' },
      secondary: { root: 'selection:bg-secondary/20', icon: 'c-secondary' },
      neutral: { root: 'selection:bg-neutral/20', icon: 'c-neutral' },
      info: { root: 'selection:bg-info/20', icon: 'c-info' },
      success: { root: 'selection:bg-success/20', icon: 'c-success' },
      warning: { root: 'selection:bg-warning/20', icon: 'c-warning' },
      danger: { root: 'selection:bg-danger/20', icon: 'c-danger' },
    },
    variant: { solid: '', soft: '', none: '' },
    align: {
      start: { root: 'items-start text-start' },
      center: { root: 'items-center text-center' },
      end: { root: 'items-end text-end' },
    },
    icon: {
      true: { root: 'pl-10' },
    },
  },

  compoundVariants: [
    { variant: ['solid', 'soft'], class: { root: 'b-(is-4)' } },

    { variant: 'solid', color: 'primary', class: { root: 'b-primary' } },
    { variant: 'solid', color: 'secondary', class: { root: 'b-secondary' } },
    { variant: 'solid', color: 'neutral', class: { root: 'b-neutral' } },
    { variant: 'solid', color: 'info', class: { root: 'b-info' } },
    { variant: 'solid', color: 'success', class: { root: 'b-success' } },
    { variant: 'solid', color: 'warning', class: { root: 'b-warning' } },
    { variant: 'solid', color: 'danger', class: { root: 'b-danger' } },

    { variant: 'soft', color: 'primary', class: { root: 'b-primary-4' } },
    { variant: 'soft', color: 'secondary', class: { root: 'b-secondary-4' } },
    { variant: 'soft', color: 'neutral', class: { root: 'b-neutral-4' } },
    { variant: 'soft', color: 'info', class: { root: 'b-info-4' } },
    { variant: 'soft', color: 'success', class: { root: 'b-success-4' } },
    { variant: 'soft', color: 'warning', class: { root: 'b-warning-4' } },
    { variant: 'soft', color: 'danger', class: { root: 'b-danger-4' } },
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
