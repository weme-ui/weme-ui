import type { Shortcut } from '@unocss/core'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { utils } from './utils'
import { boxVariantShortcuts, buttonVariantShortcuts } from './variants'

export function shortcuts(options: WemePresetResolvedOptions): Shortcut<Theme>[] {
  return [
    ...utils,
    ...boxVariantShortcuts(options),
    ...buttonVariantShortcuts(options),
  ].filter(Boolean) as Shortcut<Theme>[]
}
