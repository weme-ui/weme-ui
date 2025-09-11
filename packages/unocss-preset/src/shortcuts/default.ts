import type { Shortcuts, WemePresetResolvedOptions } from '../types'
import { utilsShortcuts } from './utils'
import { clickableShortcuts, staticShortcuts } from './variants'

export function shortcuts(options: WemePresetResolvedOptions): Shortcuts {
  return [
    ...utilsShortcuts,

    // Variants
    ...staticShortcuts(options),
    ...clickableShortcuts(options),
  ].filter(Boolean) as Shortcuts
}
