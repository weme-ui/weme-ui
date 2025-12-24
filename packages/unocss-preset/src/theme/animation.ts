import type { Theme } from '../types'

export const animation = {
  keyframes: {
    // Collapse
    'collapse-open': '{0%{height:0}100%{height:var(--reka-collapsible-content-height)}}',
    'collapse-close': '{0%{height:var(--reka-collapsible-content-height)}100%{height:0}}',

    // Skeleton
    'skeleton-shine': '{0%{transform:translate(-100%) skew(-15deg)}100%{transform:translate(100%) skew(-15deg)}}',

    // Scale
    'scale-in': '{0%{transform:scale(0.95);opacity:0}100%{transform:scale(1);opacity:1}}',
    'scale-out': '{0%{transform:scale(1);opacity:1}100%{transform:scale(0.95);opacity:0}}',
    'scale-in-big': '{0%{transform:scale(0.1)}100%{transform:scale(1)}}',
    'scale-out-big': '{0%{transform:scale(1)}100%{transform:scale(0.1)}}',

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

    // Marquee
    'marquee-x': '{0%{transform:translateX(0)}100%{transform:translateX(-100%)}}',
    'marquee-y': '{0%{transform:translateY(0)}100%{transform:translateY(-100%)}}',
  },

  durations: {
    // Collapse
    'collapse-open': '0.2s',
    'collapse-close': '0.2s',

    // Skeleton
    'skeleton-shine': '2s',

    // Scale
    'scale-in': '0.1s',
    'scale-out': '0.1s',
    'scale-in-big': '0.15s',
    'scale-out-big': '0.15s',

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

    // Marquee
    'marquee-x': 'var(--marquee-duration)',
    'marquee-y': 'var(--marquee-duration)',
  },

  timingFns: {
    // Collapse
    'collapse-open': 'ease-out',
    'collapse-close': 'ease-out',

    // Skeleton
    'skeleton-shine': 'linear',

    // Scale
    'scale-in': 'ease-out',
    'scale-out': 'ease-in',
    'scale-in-big': 'ease-out',
    'scale-out-big': 'ease-in',

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
    // Skeleton
    'skeleton-shine': 'infinite',

    // Progress
    'progress-stripe': 'infinite',
    'progress-swing': 'infinite',

    // Marquee
    'marquee-x': 'var(--marquee-loop)',
    'marquee-y': 'var(--marquee-loop)',
  },
} satisfies Theme['animation']
