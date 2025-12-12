import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useSkeletonStyle = createVariants({
  slots: {
    base: [
      'relative bg-muted overflow-hidden',
      'after:(abs top-0 left-0 right-0 bottom-0 content-[""] transform-gpu animate-marquee will-change-transform)',
      'after:(bg-linear-to-r/oklch from-transparent via-elevated to-transparent)',
    ],
    textWrapper: 'flex-(~ col) gap-2',
  },

  variants: {
    variant: { text: 'h-4', rect: '', circle: 'rounded-full' },
    radius: { none: '', xs: '', sm: '', md: '', lg: '', xl: '', full: '' },
    lineEnd: { true: 'w-[80%]' },
  },

  compoundVariants: [
    { variant: ['text', 'rect'], radius: 'xs', class: 'rounded-xs' },
    { variant: ['text', 'rect'], radius: 'sm', class: 'rounded-sm' },
    { variant: ['text', 'rect'], radius: 'md', class: 'rounded-md' },
    { variant: ['text', 'rect'], radius: 'lg', class: 'rounded-lg' },
    { variant: ['text', 'rect'], radius: 'xl', class: 'rounded-xl' },
    { variant: ['text', 'rect'], radius: 'full', class: 'rounded-full' },
  ],

  defaultVariants: {
    variant: 'rect',
    radius: 'md',
  },
})

export type SkeletonStyleSlots = typeof useSkeletonStyle['slots']
export type SkeletonStyleProps = VariantProps<typeof useSkeletonStyle>
