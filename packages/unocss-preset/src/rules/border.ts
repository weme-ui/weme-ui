import type { Rule, WemePresetOptions } from '../types'
import { resolveColor, resolveColorNames, resolveCssVarName } from '../utils'

export function borderColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^(?:border|b)-(.+)$/,
      ([, c]) => {
        return resolveColor('border-color', c, resolveColorNames(options))
      },
      {
        autocomplete: [
          '(border|b)-<color>',
          '(border|b)-<color>-<scale>',
          '(border|b)-<color>-<scale>/<percent>',
        ],
      },
    ],

    [
      /^(?:border|b)-([xy])-(.+)$/,
      ([, d, c]) => {
        switch (d) {
          case 'x': return resolveColor('border-inline-color', c, resolveColorNames(options))
          case 'y': return resolveColor('border-block-color', c, resolveColorNames(options))
        }
      },
    ],

    [
      /^(?:border|b)-([rltbse])-(.+)$/,
      ([, d, c]) => {
        switch (d) {
          case 'r': return resolveColor('border-right-color', c, resolveColorNames(options))
          case 'l': return resolveColor('border-left-color', c, resolveColorNames(options))
          case 't': return resolveColor('border-top-color', c, resolveColorNames(options))
          case 'b': return resolveColor('border-bottom-color', c, resolveColorNames(options))
          case 's': return resolveColor('border-inline-start-color', c, resolveColorNames(options))
          case 'e': return resolveColor('border-inline-end-color', c, resolveColorNames(options))
        }
      },
    ],

    [
      /^(?:border|b)-(block|inline)-(.+)$/,
      ([, d, c]) => {
        return resolveColor(`border-${d}-color`, c, resolveColorNames(options))
      },
    ],
    // endregion

    // region Theme tokens
    [
      /^(?:border|b)-(default|elevated)$/,
      ([, c]) => {
        return {
          'border-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          '(border|b)-(default|elevated)',
        ],
      },
    ],

    [
      /^(?:border|b)-([xy])-(default|elevated)$/,
      ([, d, c]) => {
        switch (d) {
          case 'x': return { 'border-inline-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 'y': return { 'border-block-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})` }
        }
      },
    ],

    [
      /^(?:border|b)-([rltbse])-(default|elevated)$/,
      ([, d, c]) => {
        switch (d) {
          case 'r': return { 'border-right-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 'l': return { 'border-left-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 't': return { 'border-top-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 'b': return { 'border-bottom-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 's': return { 'border-inline-start-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 'e': return { 'border-inline-end-color': `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})` }
        }
      },
    ],

    [
      /^(?:border|b)-(block|inline)-(default|elevated)$/,
      ([, d, c]) => {
        return {
          [`border-${d}-color`]: `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})`,
        }
      },
    ],
    // endregion
  ]
}

export function strokeColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^stroke-(.+)$/,
      ([, c]) => {
        return resolveColor('stroke', c, resolveColorNames(options))
      },
      { autocomplete: 'stroke-<color>' },
    ],
    // endregion

    // region Theme tokens
    [
      /^stroke-(default|elevated)$/,
      ([, c]) => {
        return {
          stroke: `var(${resolveCssVarName(`border-${c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          'stroke-(default|elevated)',
        ],
      },
    ],
    // endregion
  ]
}

export function textStrokeColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^text-stroke-(.+)$/,
      ([, c]) => {
        const result = resolveColor('text-stroke-color', c, resolveColorNames(options))

        if (result) {
          result['-webkit-text-stroke-color'] = result['text-stroke-color']
        }

        return result
      },
      { autocomplete: 'text-stroke-<color>' },
    ],
    // endregion
  ]
}
