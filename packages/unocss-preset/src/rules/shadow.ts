import type { Rule } from 'unocss'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { resolveColor } from '../utils'

export function shadowColors(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^shadow-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-shadow-color', 'bg', c, options)
      },
      {
        autocomplete: [
          'shadow-<color>',
          'shadow-<color>-<scale>',
          'shadow-<color>-<scale>/<percent>',
        ],
      },
    ],

    [
      /^inset-shadow-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-inset-shadow-color', 'bg', c, options)
      },
      {
        autocomplete: [
          'inset-shadow-<color>',
          'inset-shadow-<color>-<scale>',
          'inset-shadow-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}

export function textShadowColors(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^text-shadow-(.+)$/,
      ([, c]) => {
        return resolveColor('text-shadow', 'fg', c, options)
      },
      {
        autocomplete: [
          'text-shadow-<color>',
          'text-shadow-<color>-<scale>',
          'text-shadow-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}
