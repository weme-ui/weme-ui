import type { StaticShortcutMap } from '@unocss/core'

/**
 * Utility shortcuts
 * This is a shortcut for the utility classes like flex, grid, etc.
 *
 * @category Shortcuts
 */
export const utilitiesShortcuts: StaticShortcutMap[] = [
  // Positioning
  {
    'absolute-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'absolute-x-center': 'left-1/2 -translate-x-1/2',
    'absolute-y-center': 'top-1/2 -translate-y-1/2',

    'flex-center': 'items-center justify-center',
    'flex-x-center': 'justify-center',
    'flex-y-center': 'items-center',
  },

  // States
  {
    'is-disabled': 'op-50 select-none pointer-events-none',
    'is-loading': 'select-none pointer-events-none',
  },

  // Z-index
  {
    'z-base': 'z-0',
    'z-raised': 'z-1',
    'z-popover': 'z-100',
    'z-dropdown': 'z-200',
    'z-overlay': 'z-300',
    'z-modal': 'z-400',
    'z-toast': 'z-500',
  },
]
