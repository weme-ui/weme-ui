import type { Theme } from '../types'

export const animation = {
  keyframes: {
    // Collapse
    'collapse-open': '{0%{height:0}100%{height:var(--reka-collapsible-content-height)}}',
    'collapse-close': '{0%{height:var(--reka-collapsible-content-height)}100%{height:0}}',

    // Marquee
    'marquee': '{0%{transform:translate(-100%) skew(-15deg)}100%{transform:translate(100%) skew(-15deg)}}',

    // Popup
    'popup-top': '{from{opacity:0;transform:translate3d(0,5%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
    'popup-bottom': '{from{opacity:0;transform:translate3d(0,-5%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
    'popup-left': '{from{opacity:0;transform:translate3d(-5%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
    'popup-right': '{from{opacity:0;transform:translate3d(5%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
    'popup-out-top': '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(0,-2%,0)}}',
    'popup-out-bottom': '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(0,2%,0)}}',
    'popup-out-left': '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-2%,0,0)}}',
    'popup-out-right': '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(2%,0,0)}}',
  },

  durations: {
    // Collapse
    'collapse-open': '0.2s',
    'collapse-close': '0.2s',

    // Marquee
    'marquee': '2s',

    // Popup
    'popup-top': '0.15s',
    'popup-bottom': '0.15s',
    'popup-left': '0.15s',
    'popup-right': '0.15s',
    'popup-out-top': '0.1s',
    'popup-out-bottom': '0.1s',
    'popup-out-left': '0.1s',
    'popup-out-right': '0.1s',
  },

  timingFns: {
    // Collapse
    'collapse-open': 'ease-out',
    'collapse-close': 'ease-out',

    // Marquee
    'marquee': 'linear',

    // Popup
    'popup-top': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'popup-bottom': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'popup-left': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'popup-right': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'popup-out-top': 'ease-out',
    'popup-out-bottom': 'ease-out',
    'popup-out-left': 'ease-out',
    'popup-out-right': 'ease-out',
  },

  counts: {
    // Marquee
    marquee: 'infinite',
  },
} satisfies Theme['animation']
