import type { HaloPresetOptions, Preflight } from '../types'
import { preflightReset } from './reset'
import { preflightThemes } from './themes'

export function preflights(options: HaloPresetOptions): Preflight[] {
  const preflights: Preflight[] = []

  if (options.reset)
    preflights.push(preflightReset())

  preflights.push(
    // Themes
    ...preflightThemes(options.prefix, options.themes),
  )

  return preflights
}
