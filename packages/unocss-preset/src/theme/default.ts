import type { Theme, WemePresetResolvedOptions } from '../types'
import { animation } from './animation'
import { breakpoint, container, radius, spacing, verticalBreakpoint } from './misc'
import { font, leading, text } from './typography'

export function theme(options: WemePresetResolvedOptions): Theme {
  return {
    animation,

    font,
    text,
    leading,

    breakpoint,
    verticalBreakpoint,

    container,
    spacing,

    radius: radius(options.variablePrefix),
  }
}
