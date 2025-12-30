import type { Rule } from 'unocss'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { resolveColor } from '../utils'

export function fillColor(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^fill-(.+)$/,
      ([, c]) => {
        return resolveColor('fill', 'bg', c, options)
      },
      {
        autocomplete: [
          'fill-<color>',
          'fill-<color>-<scale>',
          'fill-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}

export function strokeColor(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^stroke-(.+)$/,
      ([, c]) => {
        return resolveColor('stroke', 'border', c, options)
      },
      {
        autocomplete: [
          'stroke-<color>',
          'stroke-<color>-<scale>',
          'stroke-<color>-<scale>/<percent>',
        ],
      },
    ],
  ]
}
