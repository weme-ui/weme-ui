import type { Shortcut } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { containerShortcuts } from '../rules/container'
import { fancyShortcuts, plainShortcuts } from './surfaces'

export function shortcuts(_options: ResolvedWemeUIOptions): Shortcut<Theme>[] {
  return [
    containerShortcuts,
    fancyShortcuts,
    plainShortcuts,
  ].flat()
}
