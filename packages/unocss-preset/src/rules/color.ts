import type { Rule, WemePresetOptions } from '../types'
import { getColorNames, getCssVarName, resolveColor, resolveCssVar } from '../utils'

export function bgColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^bg-(.+)$/,
      ([, c]) => {
        return resolveColor('background-color', c, getColorNames(options))
      },
      {
        autocomplete: [
          `bg-<color>`,
          `bg-<color>-<scale>`,
          `bg-<color>-<scale>/<percent>`,
        ],
      },
    ],
    // endregion

    // region Theme tokens
    [
      /^bg-(default|dimmed|muted|elevated)$/,
      ([, c]) => {
        return {
          'background-color': `var(${getCssVarName(`bg-${c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          'bg-(default|dimmed|muted|elevated)',
        ],
      },
    ],

    [
      /^bg-(border|border-elevated)$/,
      ([, c]) => {
        return {
          'background-color': `var(${getCssVarName(`border-${c === 'border' ? 'default' : c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          'bg-(border|border-elevated)',
        ],
      },
    ],
    // endregion

    // region Css Variables
    [
      /^bg-(.+)$/,
      ([, c]) => {
        return resolveCssVar('background-color', c, options)
      },
    ],
    // endregion
  ]
}

export function fgColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^(?:text|color|c)-(.+)$/,
      ([, c]) => {
        return resolveColor('color', c, getColorNames(options))
      },
      {
        autocomplete: [
          `(text|color|c)-<color>`,
          `(text|color|c)-<color>-<scale>`,
          `(text|color|c)-<color>-<scale>/<percent>`,
        ],
      },
    ],
    // endregion

    // region Theme tokens
    [
      /^(?:text|color|c)-(dimmed|muted|toned|default|highlighted)$/,
      ([, c]) => {
        return {
          color: `var(${getCssVarName(`fg-${c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          '(text|color|c)-(dimmed|muted|toned|default|highlighted)',
        ],
      },
    ],
    // endregion

    // region Css Variables
    [
      /^(?:text|color|c)-(.+)$/,
      ([, c]) => {
        return resolveCssVar('color', c, options)
      },
    ],
    // endregion
  ]
}

export function fillColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^fill-(.+)$/,
      ([, c]) => {
        return resolveColor('fill', c, getColorNames(options))
      },
      {
        autocomplete: [
          'fill-<color>',
          'fill-<color>-<scale>',
          'fill-<color>-<scale>/<percent>',
        ],
      },
    ],
    // endregion

    // region Theme tokens
    [
      /^fill-(default|dimmed|muted|elevated)$/,
      ([, c]) => {
        return {
          fill: `var(${getCssVarName(`bg-${c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          'fill-(default|dimmed|muted|elevated)',
        ],
      },
    ],

    [
      /^fill-(border|border-elevated)$/,
      ([, c]) => {
        return {
          fill: `var(${getCssVarName(`border-${c === 'border' ? 'default' : c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          'fill-(border|border-elevated)',
        ],
      },
    ],
    // endregion
  ]
}

export function accentColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^accent-(.+)$/,
      ([, c]) => {
        const result = resolveColor('accent', c, getColorNames(options))

        if (result) {
          result['accent-color'] = result.accent
        }

        return result
      },
      { autocomplete: 'accent-<color>' },
    ],
    // endregion

    // region Theme tokens
    [
      /^accent-(dimmed|muted|toned|default|highlighted)$/,
      ([, c]) => {
        const accent = `var(${getCssVarName(`fg-${c}`, options.variablePrefix)})`

        return {
          accent,
          'accent-color': `var(${getCssVarName(`fg-${c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          'accent-(dimmed|muted|toned|default|highlighted)',
        ],
      },
    ],
    // endregion
  ]
}
