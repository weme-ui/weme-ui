import type { Rule, WemePresetResolvedOptions } from '../types'
import { resolveColor } from '../utils'

export function fgColors(options: WemePresetResolvedOptions): Rule[] {
  return [
    [
      /^(?:text|color|c)-(.+)$/,
      ([, c]) => {
        return resolveColor('color', 'fg', c, options)
      },
      {
        autocomplete: [
          '(text|color|c)-<color>',
          '(text|color|c)-<color>-<scale>',
          '(text|color|c)-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}

export function bgColors(options: WemePresetResolvedOptions): Rule[] {
  return [
    [
      /^bg-(.+)$/,
      ([, c]) => {
        return resolveColor('background-color', 'bg', c, options)
      },
      {
        autocomplete: [
          'bg-<color>',
          'bg-<color>-<scale>',
          'bg-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}

export function decorationColors(options: WemePresetResolvedOptions): Rule[] {
  return [
    [
      /^(?:underline|decoration)-(.+)$/,
      ([, c]) => {
        const result = resolveColor('text-decoration-color', 'fg', c, options)

        if (result) {
          result['-webkit-text-decoration-color'] = result['text-decoration-color']
          return result
        }
      },
      {
        autocomplete: [
          '(underline|decoration)-<color>',
          '(underline|decoration)-<color>-<scale>',
          '(underline|decoration)-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}

export function accentColors(options: WemePresetResolvedOptions): Rule[] {
  return [
    [
      /^accent-(.+)$/,
      ([, c]) => {
        return resolveColor('accent-color', 'fg', c, options)
      },
      {
        autocomplete: [
          'accent-<color>',
          'accent-<color>-<scale>',
          'accent-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}

export function caretColors(options: WemePresetResolvedOptions): Rule[] {
  return [
    [
      /^caret-(.+)$/,
      ([, c]) => {
        return resolveColor('caret-color', 'fg', c, options)
      },
      {
        autocomplete: [
          'caret-<color>',
          'caret-<color>-<scale>',
          'caret-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}

export function placeholderColors(options: WemePresetResolvedOptions): Rule[] {
  return [
    [
      /^placeholder-(.+)$/,
      ([, c]) => {
        return resolveColor('placeholder-color', 'fg', c, options)
      },
      {
        autocomplete: [
          'placeholder-<color>',
          'placeholder-<color>-<scale>',
          'placeholder-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}
