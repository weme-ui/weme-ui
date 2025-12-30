import type { UserShortcuts } from 'unocss'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { utils } from './utils'
import { boxVariantShortcuts, buttonVariantShortcuts } from './variants'

export function shortcuts(options: WemePresetResolvedOptions): UserShortcuts<Theme> {
  return [
    ...utils,
    ...boxVariantShortcuts(options),
    ...buttonVariantShortcuts(options),
  ].filter(Boolean) as UserShortcuts<Theme>
}
