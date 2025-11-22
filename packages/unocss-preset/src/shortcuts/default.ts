import type { Shortcuts, WemePresetResolvedOptions } from '../types'
import { utils } from './utils'
import { boxVariantShortcuts, buttonVariantShortcuts } from './variants'

export function shortcuts(options: WemePresetResolvedOptions): Shortcuts {
  return [
    ...utils,
    ...boxVariantShortcuts(options),
    ...buttonVariantShortcuts(options),
  ].filter(Boolean) as Shortcuts
}
