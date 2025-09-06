import type { Rule, WemePresetOptions } from '../types'
import { resolveColor, resolveColorNames } from '../utils'

export function shadowColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^shadow-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-shadow-color', c, resolveColorNames(options))
      },
      { autocomplete: 'shadow-<color>' },
    ],

    [
      /^inset-shadow-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-inset-shadow-color', c, resolveColorNames(options))
      },
      { autocomplete: 'inset-shadow-<color>' },
    ],
    // endregion
  ]
}

export function textShadowColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^text-shadow-(.+)$/,
      ([, c]) => {
        return resolveColor('text-shadow', c, resolveColorNames(options))
      },
      { autocomplete: 'text-shadow-<color>' },
    ],
    // endregion
  ]
}
