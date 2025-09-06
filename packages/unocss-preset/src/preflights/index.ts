import type { Preflight, WemePresetOptions } from '../types'
import { preflightColors } from './colors'
import { preflightCssVars } from './cssvars'
import { preflightProperties } from './properties'
import { preflightThemes } from './themes'

export function preflights(options: WemePresetOptions): Preflight[] {
  return [
    ...preflightThemes(options),
    preflightCssVars(options),
    preflightColors(options),
    preflightProperties(),
  ].filter(Boolean) as Preflight[]
}
