import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCardStyle = createVariants({
  slots: {
    base: 'relative overflow-hidden',
    wrapper: 'flex-(~ col) overflow-hidden',
    header: 'flex gap-2',
    headerIcon: '',
    headerTitle: 'font-semibold text-highlighted',
    headerDescription: 'text-toned',
    body: 'flex-1',
    footer: '',
  },

  variants: {
    variant: {
      normal: {
        base: 'p-1.5 bg-muted',
        wrapper: 'bg-card shadow-xs',
      },
      outline: {
        base: 'b-(~ default)',
      },
    },
    size: {
      sm: { header: 'px-4 pt-3', headerIcon: 'text-4 mt-1', headerTitle: 'text-base', headerDescription: 'text-xs', body: 'p-4 text-sm', footer: 'px-4 pb-3 text-sm' },
      md: { header: 'px-5 pt-4', headerIcon: 'text-5 mt-0.5', headerTitle: 'text-lg', headerDescription: 'text-sm', body: 'p-5 text-base', footer: 'px-5 pb-4 text-base' },
      lg: { header: 'px-6 pt-5', headerIcon: 'text-6', headerTitle: 'text-xl', headerDescription: 'text-base', body: 'p-6', footer: 'px-6 pb-5' },
    },
    radius: {
      none: '',
      xs: { base: 'rounded-xs', wrapper: 'rounded-xs' },
      sm: { base: 'rounded-sm', wrapper: 'rounded-xs' },
      md: { base: 'rounded-md', wrapper: 'rounded-sm' },
      lg: { base: 'rounded-lg', wrapper: 'rounded-md' },
      xl: { base: 'rounded-xl', wrapper: 'rounded-lg' },
    },
    translucent: {
      true: { wrapper: 'bg-card/70 backdrop-blur-3xl' },
      false: { wrapper: 'bg-card' },
    },
  },

  defaultVariants: {
    variant: 'normal',
    size: 'md',
    radius: 'lg',
    translucent: false,
  },
})

export type CardStyleSlots = typeof useCardStyle['slots']
export type CardStyleProps = VariantProps<typeof useCardStyle>
