import type { UserShortcuts } from '@unocss/core'
import type { Theme } from '../theme'

/**
 * Utility shortcuts
 * This is a shortcut for the utility classes like flex, grid, etc.
 *
 * @category Shortcuts
 */
export const utilityShortcuts: UserShortcuts<Theme>[] = [
  // Positioning
  {
    'abs': 'absolute',
    'abs-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    'abs-x-center': 'left-1/2 -translate-x-1/2',
    'abs-y-center': 'top-1/2 -translate-y-1/2',

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
    'z-highest': 'z-9999',
    'z-higher': 'z-999',
    'z-high': 'z-99',
    'z-medium': 'z-9',
    'z-low': 'z-1',
  },
]
