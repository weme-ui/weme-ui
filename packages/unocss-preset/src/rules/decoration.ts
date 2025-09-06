import type { Rule, WemePresetOptions } from '../types'
import { resolveColor, resolveColorNames } from '../utils'

export function textDecorationColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^(?:underline|decoration)-(.+)$/,
      ([, c]) => {
        const result = resolveColor('text-decoration-color', c, resolveColorNames(options))

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
