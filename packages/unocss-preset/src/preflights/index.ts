import type { Preflight, WemePresetOptions } from '../types'
import { preflightColors } from './colors'
import { preflightCssVars } from './cssvars'
import { preflightProperties } from './properties'
import { preflightReset } from './reset'
import { preflightThemes } from './themes'

export function preflights(options: WemePresetOptions): Preflight[] {
  return [
    ...preflightThemes(options),
    preflightCssVars(options),
    preflightColors(options),
    preflightProperties(),
    preflightReset(options.variablePrefix),
  ].filter(Boolean) as Preflight[]
}
