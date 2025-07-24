import type { Shortcuts } from '../types'

export const utils = [
  {
    'is-disabled': 'op-45 select-none pointer-events-none',
    'is-loading': 'select-none pointer-events-none',
  },

  {
    'abs': 'absolute',
    'abs-center': 'left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2',
    'abs-x-center': 'left-1/2 -translate-x-1/2',
    'abs-y-center': 'top-1/2 -translate-y-1/2',

    'flex-center': 'items-center justify-center',
    'flex-x-center': 'justify-center',
    'flex-y-center': 'items-center',
  },

  {
    'z-tooltip': 'z-400',
    'z-popup': 'z-300',
    'z-modal': 'z-300',
    'z-overlay': 'z-200',
    'z-panel': 'z-100',
  },

  {
    'leading-none': 'leading-[1]',
  },
] satisfies Shortcuts
