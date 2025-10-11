import type { Theme } from '../types'

export const animation = {
  keyframes: {
    // Collapse
    'collapse-open': '{0%{height:0}100%{height:var(--reka-collapsible-content-height)}}',
    'collapse-close': '{0%{height:var(--reka-collapsible-content-height)}100%{height:0}}',

    // Marquee
    'marquee': '{0%{transform:translate(-100%) skew(-15deg)}100%{transform:translate(100%) skew(-15deg)}}',

    // Scale
    'scale-in': '{0%{transform:scale(0.95);opacity:0}100%{transform:scale(1);opacity:1}}',
    'scale-out': '{0%{transform:scale(1);opacity:1}100%{transform:scale(0.95);opacity:0}}',
    'scale-in-big': '{0%{transform:scale(0.1)}100%{transform:scale(1)}}',
    'scale-out-big': '{0%{transform:scale(1)}100%{transform:scale(0.1)}}',

    // Popup
    'popup-top': '{from{opacity:0;transform:translate3d(0,5%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
    'popup-bottom': '{from{opacity:0;transform:translate3d(0,-5%,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
    'popup-left': '{from{opacity:0;transform:translate3d(-5%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
    'popup-right': '{from{opacity:0;transform:translate3d(5%,0,0)}to{opacity:1;transform:translate3d(0,0,0)}}',
    'popup-out-top': '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(0,-2%,0)}}',
    'popup-out-bottom': '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(0,2%,0)}}',
    'popup-out-left': '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(-2%,0,0)}}',
    'popup-out-right': '{from{opacity:1;transform:translate3d(0,0,0)}to{opacity:0;transform:translate3d(2%,0,0)}}',

    // Toast
    'toast-close': '{0%{transform:var(--transform)}100%{transform:translateY(calc((var(--offset)-var(--height))*var(--translate-factor)))}}',
    'toast-collapse': '{0%{transform:var(--transform)}100%{transform:translateY(calc((var(--before)-var(--height))*var(--gap))) scale(var(--scale))}}',
    'toast-left': '{0%{transform:translateX(0) translateY(var(--translate))}100%{transform:translateX(-100%) translateY(var(--translate))}}',
    'toast-right': '{0%{transform:translateX(0) translateY(var(--translate))}100%{transform:translateX(100%) translateY(var(--translate))}}',
    'toast-up': '{0%{transform:translateX(var(--translate)) translateY(0)}100% {transform:translateX(var(--translate)) translateY(-100%)}}',
    'toast-down': '{0%{transform:translateX(var(--translate)) translateY(0)}100%{transform:translateX(var(--translate)) translateY(100%)}}',

    // Accordion
    'accordion-open': '{0%{height:0}100%{height:var(--reka-accordion-content-height)}}',
    'accordion-close': '{0%{height:var(--reka-accordion-content-height)}100%{height:0}}',

    // Progress
    'progress-stripe': '{0%{background-position:0 0}100%{background-position:30px 30px}}',
    'progress-swing': '{0%,100%{width:50%;transform:translate(-25%)}50%{transform:translate(125%)}}',
  },

  durations: {
    // Collapse
    'collapse-open': '0.2s',
    'collapse-close': '0.2s',

    // Marquee
    'marquee': '2s',

    // Scale
    'scale-in': '0.1s',
    'scale-out': '0.1s',
    'scale-in-big': '0.15s',
    'scale-out-big': '0.15s',

    // Popup
    'popup-top': '0.15s',
    'popup-bottom': '0.15s',
    'popup-left': '0.15s',
    'popup-right': '0.15s',
    'popup-out-top': '0.1s',
    'popup-out-bottom': '0.1s',
    'popup-out-left': '0.1s',
    'popup-out-right': '0.1s',

    // Toast
    'toast-close': '0.2s',
    'toast-collapse': '0.2s',
    'toast-left': '0.2s',
    'toast-right': '0.2s',
    'toast-up': '0.2s',
    'toast-down': '0.2s',

    // Accordion
    'accordion-open': '0.2s',
    'accordion-close': '0.2s',

    // Progress
    'progress-stripe': '2s',
    'progress-swing': '3s',
  },

  timingFns: {
    // Collapse
    'collapse-open': 'ease-out',
    'collapse-close': 'ease-out',

    // Marquee
    'marquee': 'linear',

    // Scale
    'scale-in': 'ease-out',
    'scale-out': 'ease-in',
    'scale-in-big': 'ease-out',
    'scale-out-big': 'ease-in',

    // Popup
    'popup-top': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'popup-bottom': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'popup-left': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'popup-right': 'cubic-bezier(0.16, 1, 0.3, 1)',
    'popup-out-top': 'ease-out',
    'popup-out-bottom': 'ease-out',
    'popup-out-left': 'ease-out',
    'popup-out-right': 'ease-out',

    // Toast
    'toast-close': 'ease-in-out',
    'toast-collapse': 'ease-in-out',
    'toast-left': 'ease-out',
    'toast-right': 'ease-out',
    'toast-up': 'ease-out',
    'toast-down': 'ease-out',

    // Accordion
    'accordion-open': 'ease-out',
    'accordion-close': 'ease-out',

    // Progress
    'progress-stripe': 'linear',
    'progress-swing': 'ease-in-out',
  },

  counts: {
    // Marquee
    'marquee': 'infinite',

    // Progress
    'progress-stripe': 'infinite',
    'progress-swing': 'infinite',
  },
} satisfies Theme['animation']
