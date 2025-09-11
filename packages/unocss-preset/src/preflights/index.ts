import type { Preflight, WemePresetResolvedOptions } from '../types'
import { preflightColors } from './colors'
import { preflightCssVars } from './cssvars'
import { preflightProperties } from './properties'
import { preflightReset } from './reset'
import { preflightThemes } from './themes'

export function preflights(options: WemePresetResolvedOptions): Preflight[] {
  return [
    preflightProperties(),
    preflightReset(options.variablePrefix),
    preflightColors(options),
    preflightCssVars(options),
    ...preflightThemes(options),
  ].filter(Boolean) as Preflight[]
}
