import type { Preflight, WemePresetOptions } from '../types'
import { preflightCssVars } from './cssvars'
import { preflightReset } from './reset'
import { preflightThemes } from './themes'

export function preflights(options: WemePresetOptions): Preflight[] {
  const preflights: Preflight[] = []

  if (options.reset)
    preflights.push(preflightReset(options.prefix))

  preflights.push(
    // Themes
    ...preflightThemes(options.prefix, options.themes),
  )

  if (Object.keys(options.cssVars).length)
    preflights.push(preflightCssVars(options.prefix, options.cssVars))

  return preflights
}
