import type { Preflight, WemePresetResolvedOptions } from '../types'
import { colors } from './colors'
import { cssVars } from './cssvars'
import { properties } from './properties'
import { reset } from './reset'
import { themes } from './themes'

export function preflights(options: WemePresetResolvedOptions): Preflight[] {
  return [
    properties(),
    reset(options),
    ...cssVars(options),
    ...colors(options),
    ...themes(options),
  ].filter(Boolean) as Preflight[]
}
