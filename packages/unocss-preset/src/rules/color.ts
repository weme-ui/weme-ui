import type { Rule, WemePresetOptions } from '../types'
import { resolveColor, resolveColorNames, resolveCssVarName } from '../utils'

export function bgColor(options: WemePresetOptions): Rule[] {
  return [
    // region Colors
    [
      /^bg-(.+)$/,
      ([, c]) => {
        return resolveColor('background-color', c, resolveColorNames(options))
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
          'background-color': `var(${resolveCssVarName(`bg-${c}`, options.variablePrefix)})`,
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
          'background-color': `var(${resolveCssVarName(`border-${c === 'border' ? 'default' : c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          'bg-(border|border-elevated)',
        ],
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
        return resolveColor('color', c, resolveColorNames(options))
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
          color: `var(${resolveCssVarName(`fg-${c}`, options.variablePrefix)})`,
        }
      },
      {
        autocomplete: [
          '(text|color|c)-(dimmed|muted|toned|default|highlighted)',
        ],
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
        return resolveColor('fill', c, resolveColorNames(options))
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
          fill: `var(${resolveCssVarName(`bg-${c}`, options.variablePrefix)})`,
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
          fill: `var(${resolveCssVarName(`border-${c === 'border' ? 'default' : c}`, options.variablePrefix)})`,
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
        const result = resolveColor('accent', c, resolveColorNames(options))

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
        const accent = `var(${resolveCssVarName(`fg-${c}`, options.variablePrefix)})`

        return {
          accent,
          'accent-color': `var(${resolveCssVarName(`fg-${c}`, options.variablePrefix)})`,
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
