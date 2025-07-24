import type { HaloPresetOptions, Theme } from '../types'
import { colors } from './colors'
import { font, text } from './font'
import { radius } from './misc'
import { breakpoint, container, verticalBreakpoint } from './size'

export function theme(options: HaloPresetOptions): Theme {
  return {
    colors: colors(options),
    font,
    text,
    radius,
    breakpoint,
    verticalBreakpoint,
    container,
  }
}
