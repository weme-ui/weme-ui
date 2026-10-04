import type { Shortcut, UserShortcuts } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import { containerShortcuts } from '../rules/container'
import { fancyShortcuts, plainShortcuts } from './surfaces'
import { utilityShortcuts } from './utilities'

export function shortcuts(_: ResolvedWemeUIOptions): (Shortcut<Theme> | UserShortcuts<Theme>)[] {
  return [
    containerShortcuts,
    fancyShortcuts,
    plainShortcuts,
    utilityShortcuts,
  ].flat()
}
