import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useMarqueeStyle = createVariants({
  slots: {
    base: 'group relative overflow-hidden',
    viewport: 'flex-(~ y-center) gap-$marquee-spacing',
    content: 'flex-(~ y-center) shrink-0 gap-$marquee-spacing whitespace-nowrap min-w-max',
    edge: 'abs top-0 h-full pointer-events-none z-1 w-1/5',
  },

  variants: {
    orientation: {
      horizontal: { content: 'w-full animate-marquee-x' },
      vertical: { viewport: 'flex-col', content: 'h-full flex-col animate-marquee-y' },
    },
    side: {
      start: { edge: 'bg-linear-to-r from-bg to-transparent' },
      end: { edge: 'right-0 bg-linear-to-l from-bg to-transparent' },
    },
    pauseOnHover: {
      true: { content: 'group-hover:[animation-play-state:paused]' },
    },
    reverse: {
      true: { content: '![animation-direction:reverse]' },
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type MarqueeStyleSlots = typeof useMarqueeStyle['slots']
export type MarqueeStyleProps = VariantProps<typeof useMarqueeStyle>
