import type { Rule, WemePresetResolvedOptions } from '../types'
import { getColorNames, getCssVarName, notLastChildSelectorVariant, resolveColor } from '../utils'

export function divideColor(options: WemePresetResolvedOptions): Rule[] {
  return [
    // region Colors
    [
      /^divide-(.+)$/,
      function* (match, ctx) {
        const result = resolveColor('border-color', match[1], getColorNames(options))

        if (result) {
          yield {
            [ctx.symbols.variants]: [notLastChildSelectorVariant(match[0])],
            ...result,
          }
        }
      },
      { autocomplete: 'divide-<color>' },
    ],
    // endregion

    // region Theme tokens
    [
      /^divide-(default|elevated)$/,
      function* (match, ctx) {
        const result = {
          'border-color': `var(${getCssVarName(`border-${match[1]}`, options.variablePrefix)})`,
        }

        if (result) {
          yield {
            [ctx.symbols.variants]: [notLastChildSelectorVariant(match[0])],
            ...result,
          }
        }
      },
      {
        autocomplete: 'divide-(default|elevated)',
      },
    ],
    // endregion
  ]
}
