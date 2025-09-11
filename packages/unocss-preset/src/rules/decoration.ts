import type { Rule, WemePresetResolvedOptions } from '../types'
import { getColorNames, resolveColor } from '../utils'

export function textDecorationColor(options: WemePresetResolvedOptions): Rule[] {
  return [
    // region Colors
    [
      /^(?:underline|decoration)-(.+)$/,
      ([, c]) => {
        const result = resolveColor('text-decoration-color', c, getColorNames(options))

        if (result) {
          result['-webkit-text-decoration-color'] = result['text-decoration-color']
          return result
        }
      },
      { autocomplete: '(underline|decoration)-<color>' },
    ],
    // endregion
  ]
}
