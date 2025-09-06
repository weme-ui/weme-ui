import type { Rule, WemePresetOptions } from '../types'
import { resolveColor, resolveColorNames, resolveCssVarName } from '../utils'

export function placeholderColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^placeholder-(.+)$/,
      ([, c]) => {
        const result = resolveColor('color', c, resolveColorNames(options))

        if (result) {
          result.placeholder = result.color
        }

        return result
      },
      { autocomplete: 'placeholder-<color>' },
    ],
    // endregion

    // region Theme tokens
    [
      /^placeholder-(dimmed|muted|toned|default|highlighted)$/,
      ([, c]) => {
        const color = `var(${resolveCssVarName(`fg-${c}`, options.variablePrefix)})`

        return {
          color,
          placeholder: color,
        }
      },
      {
        autocomplete: [
          'placeholder-(dimmed|muted|toned|default|highlighted)',
        ],
      },
    ],
    // endregion
  ]
}
