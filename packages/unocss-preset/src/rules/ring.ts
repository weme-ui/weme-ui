import type { Rule, WemePresetOptions } from '../types'
import { resolveColor, resolveColorNames, resolveCssVarName } from '../utils'

export function ringColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^ring-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-ring-color', c, resolveColorNames(options))
      },
      { autocomplete: 'ring-<color>' },
    ],

    [
      /^inset-ring-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-inset-ring-color', c, resolveColorNames(options))
      },
      { autocomplete: 'inset-ring-<color>' },
    ],
    // endregion

    // region Theme tokens
    [
      /^ring-(default)$/,
      ([, c]) => {
        return {
          '--un-ring-color': `var(${resolveCssVarName(`ring-${c}`, options.variablePrefix)})`,
        }
      },
    ],

    [
      /^inset-ring-(default)$/,
      ([, c]) => {
        return {
          '--un-inset-ring-color': `var(${resolveCssVarName(`ring-${c}`, options.variablePrefix)})`,
        }
      },
    ],
    // endregion
  ]
}
