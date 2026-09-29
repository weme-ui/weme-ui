import type { Shortcut } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { containerShortcuts } from '../rules/container'

export function shortcuts(_options: ResolvedWemeUIOptions): Shortcut<Theme>[] {
  return [
    containerShortcuts,
  ].flat()
}
