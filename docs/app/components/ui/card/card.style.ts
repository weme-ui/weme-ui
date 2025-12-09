import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCardStyle = createVariants({
  slots: {
    base: 'relative',
    wrapper: 'flex-(~ col)',
    header: 'flex gap-x-2 px-6 py-4.5 text-highlighted',
    icon: 'text-5 mt-0.5',
    title: 'text-lg font-semibold',
    description: 'text-(sm toned)',
    content: 'flex-1 p-6',
    footer: 'px-6 py-4.5 text-right',
  },

  variants: {
    variant: {
      normal: {
        base: 'p-1.5 bg-elevated',
        wrapper: 'bg-card shadow-xs',
      },
      clean: 'bg-card',
    },
    radius: {
      none: '',
      sm: { base: 'rounded-sm', wrapper: 'rounded-sm' },
      md: { base: 'rounded-md', wrapper: 'rounded-sm' },
      lg: { base: 'rounded-lg', wrapper: 'rounded-md' },
      xl: { base: 'rounded-xl', wrapper: 'rounded-lg' },
    },
    bordered: {
      true: {
        base: 'b-(~ default)',
        header: 'b-(b default)',
        footer: 'b-(t default)',
      },
      false: {
        header: 'pb-0',
        footer: 'pt-0',
      },
    },
    translucent: {
      true: 'backdrop-blur-3xl',
      false: '',
    },
  },

  compoundVariants: [
    { variant: 'clean', translucent: true, class: { base: 'bg-card/70' } },
    { variant: 'normal', translucent: true, class: { base: 'bg-neutral-4/70' } },

  ],

  defaultVariants: {
    variant: 'clean',
    radius: 'lg',
    bordered: false,
    translucent: false,
  },
})

export type CardStyleSlots = typeof useCardStyle['slots']
export type CardStyleProps = VariantProps<typeof useCardStyle>
