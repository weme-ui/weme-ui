import type { Shortcuts } from '../types'

export const staticShortcuts = [
  // Utils
  {
    'abs': 'absolute',
    'abs-center': 'left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2',
    'abs-x-center': 'left-1/2 -translate-x-1/2',
    'abs-y-center': 'top-1/2 -translate-y-1/2',

    'flex-center': 'items-center justify-center',
    'flex-x-center': 'justify-center',
    'flex-y-center': 'items-center',
  },

  // States
  {
    'is-disabled': 'op-45 select-none pointer-events-none',
    'is-loading': 'select-none pointer-events-none',
  },

  // Z-Index
  {
    'z-tooltip': 'z-40',
    'z-popup': 'z-30',
    'z-overlay': 'z-20',
    'z-affix': 'z-10',
  },
] satisfies Shortcuts
