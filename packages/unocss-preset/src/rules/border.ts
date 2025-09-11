/* eslint-disable regexp/no-empty-group */
/* eslint-disable regexp/no-empty-capturing-group */
import type { Rule, WemePresetResolvedOptions } from '../types'
import { getColorNames, getCssVarName, resolveColor, resolveCssVar } from '../utils'

export function borderColor(options: WemePresetResolvedOptions): Rule[] {
  return [
    // region Colors
    [
      /^(?:border|b)-(.+)$/,
      ([, c]) => {
        return resolveColor('border-color', c, getColorNames(options))
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
          case 'x': return resolveColor('border-inline-color', c, getColorNames(options))
          case 'y': return resolveColor('border-block-color', c, getColorNames(options))
        }
      },
    ],

    [
      /^(?:border|b)-([rltbse])-(.+)$/,
      ([, d, c]) => {
        switch (d) {
          case 'r': return resolveColor('border-right-color', c, getColorNames(options))
          case 'l': return resolveColor('border-left-color', c, getColorNames(options))
          case 't': return resolveColor('border-top-color', c, getColorNames(options))
          case 'b': return resolveColor('border-bottom-color', c, getColorNames(options))
          case 's': return resolveColor('border-inline-start-color', c, getColorNames(options))
          case 'e': return resolveColor('border-inline-end-color', c, getColorNames(options))
        }
      },
    ],

    [
      /^(?:border|b)-(block|inline)-(.+)$/,
      ([, d, c]) => {
        return resolveColor(`border-${d}-color`, c, getColorNames(options))
      },
    ],
    // endregion

    // region Theme tokens
    [
      /^(?:border|b)-(default|elevated)$/,
      ([, c]) => {
        return {
          'border-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})`,
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
          case 'x': return { 'border-inline-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 'y': return { 'border-block-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})` }
        }
      },
    ],

    [
      /^(?:border|b)-([rltbse])-(default|elevated)$/,
      ([, d, c]) => {
        switch (d) {
          case 'r': return { 'border-right-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 'l': return { 'border-left-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 't': return { 'border-top-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 'b': return { 'border-bottom-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 's': return { 'border-inline-start-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})` }
          case 'e': return { 'border-inline-end-color': `var(${getCssVarName(`border-${c}`, options.variablePrefix)})` }
        }
      },
    ],

    [
      /^(?:border|b)-(block|inline)-(default|elevated)$/,
      ([, d, c]) => {
        return {
          [`border-${d}-color`]: `var(${getCssVarName(`border-${c}`, options.variablePrefix)})`,
        }
      },
    ],
    // endregion
  ]
}

export function strokeColor(options: WemePresetResolvedOptions): Rule[] {
  return [
    // region Colors
    [
      /^stroke-(.+)$/,
      ([, c]) => {
        return resolveColor('stroke', c, getColorNames(options))
      },
      { autocomplete: 'stroke-<color>' },
    ],
    // endregion

    // region Theme tokens
    [
      /^stroke-(default|elevated)$/,
      ([, c]) => {
        return {
          stroke: `var(${getCssVarName(`border-${c}`, options.variablePrefix)})`,
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

export function textStrokeColor(options: WemePresetResolvedOptions): Rule[] {
  return [
    // region Colors
    [
      /^text-stroke-(.+)$/,
      ([, c]) => {
        const result = resolveColor('text-stroke-color', c, getColorNames(options))

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

export function borderSize(options: WemePresetResolvedOptions): Rule[] {
  return [
    // region Css Variables
    [
      /^(?:border|b)-()(?:width|size)-(.+)$/,
      ([, c]) => {
        return resolveCssVar('border-width', c, options)
      },
    ],

    [
      /^(?:border|b)-([xy])-(?:width|size)-(.+)$/,
      ([, d, c]) => {
        const width = resolveCssVar('border-width', c, options)

        if (width) {
          switch (d) {
            case 'x': return { 'border-inline-width': width['border-width'] }
            case 'y': return { 'border-block-width': width['border-width'] }
          }
        }
      },
    ],

    [
      /^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/,
      ([, d, c]) => {
        const width = resolveCssVar('border-width', c, options)

        if (width) {
          switch (d) {
            case 'r': return { 'border-right-color': width['border-width'] }
            case 'l': return { 'border-left-color': width['border-width'] }
            case 't': return { 'border-top-color': width['border-width'] }
            case 'b': return { 'border-bottom-color': width['border-width'] }
            case 's': return { 'border-inline-start-color': width['border-width'] }
            case 'e': return { 'border-inline-end-color': width['border-width'] }
          }
        }
      },
    ],

    [
      /^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/,
      ([, d, c]) => {
        const width = resolveCssVar('border-width', c, options)

        if (width) {
          return {
            [`border-${d}-color`]: width['border-width'],
          }
        }
      },
    ],
    // endregion
  ]
}
