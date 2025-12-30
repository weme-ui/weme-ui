import type { Rule } from 'unocss'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { resolveColor } from '../utils'

export function boxSizes(options: WemePresetResolvedOptions): Rule<Theme>[] {
  return [
    [
      /^size-(min-|max-)?(.+)$/,
      ([, m, c]) => {
        const width = resolveColor('width', '', c, options)
        const height = resolveColor('height', '', c, options)

        if (width && height) {
          if (m === 'min-') {
            return { 'min-width': width.width, 'min-height': height.height }
          }

          if (m === 'max-') {
            return { 'max-width': width.width, 'max-height': height.height }
          }

          return { width: width.width, height: height.height }
        }
      },
      {
        autocomplete: [
          'size-<value>',
          'size-min-<value>',
          'size-max-<value>',
        ],
      },
    ],

    [
      /^(?:size-)?(min-|max-)?([wh])-?(.+)$/,
      ([, m, w, c]) => {
        const width = resolveColor('width', '', c, options)
        const height = resolveColor('height', '', c, options)

        if (w === 'w' && width) {
          if (m === 'min-') {
            return { 'min-width': width.width }
          }

          if (m === 'max-') {
            return { 'max-width': width.width }
          }

          return { width: width.width }
        }

        if (w === 'h' && height) {
          if (m === 'min-') {
            return { 'min-height': height.height }
          }

          if (m === 'max-') {
            return { 'max-height': height.height }
          }

          return { height: height.height }
        }
      },
      {
        autocomplete: [
          '(size|min|max)-<value>',
          '(size|min|max)-w-<value>',
          '(size|min|max)-h-<value>',
        ],
      },
    ],
  ]
}
