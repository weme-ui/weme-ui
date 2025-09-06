import type { Rule, WemePresetOptions } from '../types'
import { bgGradientColor } from './background'
import { borderColor, strokeColor, textStrokeColor } from './border'
import { accentColor, bgColor, fgColor, fillColor } from './color'
import { textDecorationColor } from './decoration'
import { divideColor } from './divide'
import { outlineColor } from './outline'
import { placeholderColor } from './placeholder'
import { ringColor } from './ring'
import { shadowColor, textShadowColor } from './shadow'

export function rules(options: WemePresetOptions): Rule[] {
  return [
    bgColor(options),
    bgGradientColor(options),
    fgColor(options),
    accentColor(options),
    borderColor(options),
    divideColor(options),
    outlineColor(options),
    ringColor(options),
    shadowColor(options),
    textShadowColor(options),
    fillColor(options),
    strokeColor(options),
    textStrokeColor(options),
    textDecorationColor(options),
    placeholderColor(options),
  ].flat()
}
