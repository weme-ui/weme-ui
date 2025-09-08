import type { Rule, WemePresetOptions } from '../types'
import { getColorNames, getCssVarName, resolveColor } from '../utils'

export function ringColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^ring-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-ring-color', c, getColorNames(options))
      },
      { autocomplete: 'ring-<color>' },
    ],

    [
      /^inset-ring-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-inset-ring-color', c, getColorNames(options))
      },
      { autocomplete: 'inset-ring-<color>' },
    ],
    // endregion

    // region Theme tokens
    [
      /^ring-(default)$/,
      ([, c]) => {
        return {
          '--un-ring-color': `var(${getCssVarName(`ring-${c}`, options.variablePrefix)})`,
        }
      },
    ],

    [
      /^inset-ring-(default)$/,
      ([, c]) => {
        return {
          '--un-inset-ring-color': `var(${getCssVarName(`ring-${c}`, options.variablePrefix)})`,
        }
      },
    ],
    // endregion
  ]
}
