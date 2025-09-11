import type { Preflight, WemePresetResolvedOptions, WemeTheme } from '../types'
import { defaultTheme } from '../defaults'
import { getCssVarName, minifyCss, trackColor } from '../utils'

export function preflightCssVars(options: WemePresetResolvedOptions): Preflight {
  return {
    layer: 'theme',
    getCSS() {
      if (Object.keys(options.cssVars).length === 0)
        return ''

      function resolveTokenValue(value: string) {
        if (value.startsWith('color.')) {
          const [color, scale] = value.replace(/^color\./, '').split('.')
          const trackKey = defaultTheme.colors?.[color as any as keyof WemeTheme['colors']] ?? color

          trackColor(trackKey, Number(scale))

          return `var(--${color}-${scale})`
        }

        else if (value.startsWith('$')) {
          return `var(${getCssVarName(value.slice(1).replace(/\./g, '-'), options.variablePrefix)})`
        }

        return value
      }

      return minifyCss(`:root {
${Object.entries(options.cssVars)
  .map(([name, value]) => `  ${getCssVarName(name, options.variablePrefix)}: ${resolveTokenValue(value)};`)
  .join('\n')}
}`)
    },
  }
}
