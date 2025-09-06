import type { Theme, WemePresetOptions } from '../types'
import { animate } from './animate'
import { font, leading, text } from './font'
import { radius, spacing } from './misc'
import { breakpoint, verticalBreakpoint } from './size'

export function theme(options: WemePresetOptions): Theme {
  return {
    font,
    text,
    leading,
    spacing,
    breakpoint,
    verticalBreakpoint,
    animate,

    radius: radius(options.variablePrefix),
  }
}
