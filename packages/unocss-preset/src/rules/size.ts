import type { Rule, WemePresetResolvedOptions } from '../types'
import { resolveCssVar } from '../utils'

export function boxSize(options: WemePresetResolvedOptions): Rule[] {
  return [
    // region Css Variables
    [
      /^size-(min-|max-)?(.+)$/,
      ([, m, c]) => {
        const width = resolveCssVar('width', c, options)
        const height = resolveCssVar('height', c, options)

        if (width && height) {
          if (m === 'min-') {
            return { 'min-width': width.width, 'min-height': height.height }
          }

          else if (m === 'max-') {
            return { 'max-width': width.width, 'max-height': height.height }
          }

          return { 'min-width': width.width, 'min-height': height.height }
        }
      },
    ],

    [
      /^(?:size-)?(min-|max-)?([wh])-?(.+)$/,
      ([, m, w, c]) => {
        const width = resolveCssVar('width', c, options)
        const height = resolveCssVar('height', c, options)

        if (w === 'w' && width) {
          if (m === 'min-') {
            return { 'min-width': width.width }
          }

          else if (m === 'max-') {
            return { 'max-width': width.width }
          }

          return { width: width.width }
        }

        if (w === 'h' && height) {
          if (m === 'min-') {
            return { 'min-height': height.height }
          }

          else if (m === 'max-') {
            return { 'max-height': height.height }
          }

          return { height: height.height }
        }
      },
    ],
    // endregion
  ]
}
