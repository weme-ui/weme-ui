import type { Rule, WemePresetResolvedOptions } from '../types'
import { borderColors, borderSizes, divideColor } from './border'
import { accentColors, bgColors, caretColors, decorationColors, fgColors, placeholderColors } from './color'
import { gradientColors } from './gradient'
import { outlineColors } from './outline'
import { ringColors } from './ring'
import { shadowColors, textShadowColors } from './shadow'
import { boxSizes } from './size'
import { fillColor, strokeColor } from './svg'

export function rules(options: WemePresetResolvedOptions): Rule[] {
  return [
    // region Colors
    bgColors(options),
    fgColors(options),
    decorationColors(options),
    accentColors(options),
    caretColors(options),
    placeholderColors(options),
    // endregion

    // region Gradient
    gradientColors(options),
    // endregion

    // region Border
    borderColors(options),
    borderSizes(options),
    divideColor(options),
    // endregion

    // region Outline
    outlineColors(options),
    // endregion

    // region Ring
    ringColors(options),
    // endregion

    // region Shadow
    shadowColors(options),
    textShadowColors(options),
    // endregion

    // region SVG
    fillColor(options),
    strokeColor(options),
    // endregion

    // region Size
    boxSizes(options),
    // endregion
  ].flat()
}
