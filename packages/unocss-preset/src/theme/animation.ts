import type { Theme } from '../types'

export const animation = {
  keyframes: {
    // Collapse
    'collapse-open': '{0%{height:0}100%{height:var(--reka-collapsible-content-height)}}',
    'collapse-close': '{0%{height:var(--reka-collapsible-content-height)}100%{height:0}}',

    // Marquee
    'marquee': '{0%{transform:translate(-100%) skew(-15deg)}100%{transform:translate(100%) skew(-15deg)}}',
  },

  durations: {
    // Collapse
    'collapse-open': '0.2s',
    'collapse-close': '0.2s',

    // Marquee
    'marquee': '2s',
  },

  timingFns: {
    // Collapse
    'collapse-open': 'ease-out',
    'collapse-close': 'ease-out',

    // Marquee
    'marquee': 'linear',
  },

  counts: {
    // Marquee
    marquee: 'infinite',
  },
} satisfies Theme['animation']
