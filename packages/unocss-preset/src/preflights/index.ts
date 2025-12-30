import type { Preflight } from 'unocss'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { colors } from './colors'
import { cssVars } from './cssvars'
import { properties } from './properties'
import { reset } from './reset'
import { themes } from './themes'

export function preflights(options: WemePresetResolvedOptions): Preflight<Theme>[] {
  return ([
    properties(),
    reset(options),
    ...cssVars(options),
    ...colors(options),
    ...themes(options),
  ].filter(Boolean)) as Preflight<Theme>[]
}
