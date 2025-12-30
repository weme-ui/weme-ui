import type { Preflight } from 'unocss'
import type { Theme } from '../types'
import { trackedProperties } from '../utils'

export function properties(): Preflight<Theme> | undefined {
  return {
    layer: 'properties',
    getCSS() {
      if (trackedProperties.size > 0) {
        const parent = `@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))`
        const root = `*, ::before, ::after, ::backdrop`
        const css = Array.from(trackedProperties.entries())
          .map(([property, value]) => `${property}:${value};`)
          .join('')

        return `${parent}{${root}{${css}}}`
      }
    },
  }
}
