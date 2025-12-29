import type { Rule } from '@unocss/core'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { resolveColor } from '../utils'

export function ringColors(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^ring-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-ring-color', 'bg', c, options)
      },
      {
        autocomplete: [
          'ring-<color>',
          'ring-<color>-<scale>',
          'ring-<color>-<scale>/<percent>',
        ],
      },
    ],

    [
      /^inset-ring-(.+)$/,
      ([, c]) => {
        return resolveColor('--un-inset-ring-color', 'bg', c, options)
      },
      {
        autocomplete: [
          'inset-ring-<color>',
          'inset-ring-<color>-<scale>',
          'inset-ring-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}
