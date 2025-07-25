import type { Preflight, WemePresetOptions } from '../types'
import { createCssVars, minifyCss } from '../utils'

export function preflightCssVars(prefix: string, cssVars: WemePresetOptions['cssVars']): Preflight {
  return {
    getCSS() {
      return minifyCss(`
        :root {
          ${createCssVars(prefix, cssVars)}
        }
      `)
    },
    layer: 'base',
  }
}
