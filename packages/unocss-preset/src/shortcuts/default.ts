import type { Shortcut } from '@unocss/core'
import type { Theme } from '../theme'
import { animateInOutShortcuts } from '../rules/animate'
import { containerShortcuts } from '../rules/container'
import { fancyShortcuts, plainShortcuts } from './surfaces'
import { utilityShortcuts } from './utilities'

export const shortcuts: Shortcut<Theme>[] = [
  animateInOutShortcuts,
  containerShortcuts,
  fancyShortcuts,
  plainShortcuts,
  utilityShortcuts,
].flat().map(shortcut => shortcut as Shortcut<Theme>)
