import type { Rule, WemePresetResolvedOptions } from '../types'
import { getColorNames, getCssVarName, resolveColor } from '../utils'

export function placeholderColor(options: WemePresetResolvedOptions): Rule[] {
  return [
    // region Colors
    [
      /^placeholder-(.+)$/,
      ([, c]) => {
        const result = resolveColor('color', c, getColorNames(options))

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
        const color = `var(${getCssVarName(`fg-${c}`, options.variablePrefix)})`

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
