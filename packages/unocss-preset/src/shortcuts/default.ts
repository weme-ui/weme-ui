import type { Shortcuts, WemePresetOptions } from '../types'
import { staticShortcuts } from './static'
import { badgeShortcuts, buttonShortcuts } from './variants'

export function shortcuts(options: WemePresetOptions): Shortcuts {
  return [
    ...staticShortcuts,

    // Variants
    ...badgeShortcuts(options),
    ...buttonShortcuts(options),
  ].filter(Boolean) as Shortcuts
}
