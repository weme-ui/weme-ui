import type { Rule, WemePresetOptions } from '../types'
import { resolveColor, resolveColorNames, resolveCssVarName } from '../utils'

export function outlineColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^outline-(.+)$/,
      ([, c]) => {
        return resolveColor('outline-color', c, resolveColorNames(options))
      },
      { autocomplete: 'outline-<color>' },
    ],
    // endregion

    // region Theme tokens
    [
      /^outline-(default|elevated)$/,
      ([, c]) => {
        return {
          'outline-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})`,
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
