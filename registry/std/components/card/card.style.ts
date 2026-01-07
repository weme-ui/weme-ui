import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useCardStyle = createVariants({
  slots: {
    root: 'relative flex-(~ col)',
    wrapper: 'flex-(~ col) w-full',
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
        root: 'p-1.5',
        wrapper: 'bg-card shadow-xs',
      },
      outline: {
        root: 'b-(~ default)',
      },
    },
    size: {
      sm: { header: 'px-4 pt-3', headerIcon: 'text-4 mt-1', headerTitle: 'text-base', headerDescription: 'text-xs', body: 'p-4 text-sm', footer: 'px-4 pb-3 text-sm' },
      md: { header: 'px-5 pt-4', headerIcon: 'text-5 mt-0.5', headerTitle: 'text-lg', headerDescription: 'text-sm', body: 'p-5 text-base', footer: 'px-5 pb-4 text-base' },
      lg: { header: 'px-6 pt-5', headerIcon: 'text-6', headerTitle: 'text-xl', headerDescription: 'text-base', body: 'p-6', footer: 'px-6 pb-5' },
    },
    radius: {
      none: '',
      xs: { root: 'rounded-xs', wrapper: 'rounded-xs' },
      sm: { root: 'rounded-sm', wrapper: 'rounded-xs' },
      md: { root: 'rounded-md', wrapper: 'rounded-sm' },
      lg: { root: 'rounded-lg', wrapper: 'rounded-md' },
      xl: { root: 'rounded-xl', wrapper: 'rounded-lg' },
    },
    translucent: {
      true: '',
    },
  },

  compoundVariants: [
    { variant: 'outline', translucent: true, class: { root: 'bg-card/70 backdrop-blur-3xl' } },
    { variant: 'outline', translucent: false, class: { root: 'bg-card' } },

    { variant: 'normal', translucent: true, class: { root: 'bg-muted/70 backdrop-blur-3xl' } },
    { variant: 'normal', translucent: false, class: { root: 'bg-muted' } },
  ],

  defaultVariants: {
    variant: 'normal',
    size: 'md',
    radius: 'lg',
    translucent: false,
  },
})

export type CardStyleSlots = typeof useCardStyle['slots']
export type CardStyleProps = VariantProps<typeof useCardStyle>
