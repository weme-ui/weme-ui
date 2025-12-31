import type { VariantProps } from '~/utils/styles'
import { createVariants } from '~/utils/styles'

export const useMarqueeStyle = createVariants({
  slots: {
    base: 'group relative overflow-hidden',
    viewport: 'relative overflow-hidden flex-(~ y-center) gap-$marquee-spacing',
    content: 'flex-(~ y-center) shrink-0 gap-$marquee-spacing whitespace-nowrap min-w-max',
    edge: 'abs pointer-events-none z-1',
  },

  variants: {
    orientation: {
      horizontal: {
        content: 'w-full animate-marquee-x',
        edge: 'top-0 w-10 h-full',
      },
      vertical: {
        viewport: 'flex-col',
        content: 'h-full flex-col animate-marquee-y',
      },
    },
    side: { start: '', end: '' },
    pauseOnHover: {
      true: { content: 'group-hover:[animation-play-state:paused]' },
    },
    reverse: {
      true: { content: '![animation-direction:reverse]' },
    },
  },

  compoundVariants: [
    { orientation: 'horizontal', side: 'start', class: { edge: 'bg-linear-to-r from-bg to-transparent' } },
    { orientation: 'horizontal', side: 'end', class: { edge: 'right-0 bg-linear-to-l from-bg to-transparent' } },
  ],

  defaultVariants: {
    orientation: 'horizontal',
  },
})

export type MarqueeStyleSlots = typeof useMarqueeStyle['slots']
export type MarqueeStyleProps = VariantProps<typeof useMarqueeStyle>
