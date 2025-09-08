import type { Rule, WemePresetOptions } from '../types'
import { getColorNames, getCssVarName, resolveColor } from '../utils'

export function outlineColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^outline-(.+)$/,
      ([, c]) => {
        return resolveColor('outline-color', c, getColorNames(options))
      },
      { autocomplete: 'outline-<color>' },
    ],
    // endregion

    // region Theme tokens
    [
      /^outline-(default|elevated)$/,
      ([, c]) => {
        return {
          'outline-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          'outline-(default|elevated)',
        ],
      },
    ],
    // endregion
  ]
}
