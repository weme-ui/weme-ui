import type { Rule } from 'unocss'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { resolveColor } from '../utils'

export function outlineColors(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^outline-(.+)$/,
      ([, c]) => {
        return resolveColor('outline-color', 'border', c, options)
      },
      {
        autocomplete: [
          'outline-<color>',
          'outline-<color>-<scale>',
          'outline-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}
