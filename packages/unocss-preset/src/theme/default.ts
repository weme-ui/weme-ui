import type { Theme, WemePresetResolvedOptions } from '../types'
import { animation } from './animation'
import { font, leading, text } from './font'
import { radius, spacing } from './misc'
import { breakpoint, container, verticalBreakpoint } from './size'

export function theme(options: WemePresetResolvedOptions): Theme {
  return {
    font,
    text,
    leading,
    spacing,
    breakpoint,
    verticalBreakpoint,
    animation,
    container,

    radius: radius(options.variablePrefix),
  }
}
