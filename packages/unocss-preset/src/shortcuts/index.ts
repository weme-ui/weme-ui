import type { Shortcuts, WemePresetOptions } from '../types'
import { getColors } from './colors'
import { utils } from './utils'

export function shortcuts(options: WemePresetOptions): Shortcuts {
  const colors = getColors(options)

  const shortcuts = [
    ...colors,
    ...utils,
  ].filter(Boolean) as Shortcuts

  return shortcuts
}
