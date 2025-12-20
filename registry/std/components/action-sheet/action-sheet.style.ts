import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useActionSheetStyle = createVariants({
  slots: {
    base: [
      'abs-(~ x-center) bottom-4 flex-(~ y-center) gap-3 p-2.5 z-popup',
      'bg-action-sheet ring-(~ border/70) shadow-[0_-8px_15px_0px_color-mix(in_oklch,var(--neutral-9)_20%,transparent)]',
      'state-open:animate-scale-in state-closed:animate-scale-out',
    ],
    selection: 'flex-(~ center) text-highlighted gap-1.5 h-8 px-3 b-(~ dashed default)',
    actions: 'flex-(~ y-center) gap-2.5',
    separator: 'h-5 w-px b-(l default)',
  },

  variants: {
    radius: {
      none: '',
      xs: { base: 'rounded-xs', content: 'rounded-xs', selection: 'rounded-xs' },
      sm: { base: 'rounded-sm', content: 'rounded-xs', selection: 'rounded-xs' },
      md: { base: 'rounded-md', content: 'rounded-sm', selection: 'rounded-sm' },
      lg: { base: 'rounded-lg', content: 'rounded-md', selection: 'rounded-md' },
      xl: { base: 'rounded-xl', content: 'rounded-lg', selection: 'rounded-lg' },
      full: { base: 'rounded-full', content: 'rounded-full', selection: 'rounded-full' },
    },
  },

  defaultVariants: {
    radius: 'md',
  },
})

export type ActionSheetStyleSlots = typeof useActionSheetStyle['slots']
export type ActionSheetStyleProps = VariantProps<typeof useActionSheetStyle>
