import type { Rule, WemePresetOptions } from '../types'
import { notLastChildSelectorVariant, resolveColor, resolveColorNames, resolveCssVarName } from '../utils'

export function divideColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^divide-(.+)$/,
      function* (match, ctx) {
        const result = resolveColor('border-color', match[1], resolveColorNames(options))

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
          'border-color': `var(${resolveCssVarName(`border-${match[1]}`, options.variablePrefix)})`,
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
