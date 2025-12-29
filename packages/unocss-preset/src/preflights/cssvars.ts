import type { Preflight } from '@unocss/core'
import type { Theme, WemePresetResolvedOptions } from '../types'
import { cssVarName, minifyCss, resolveTokenValue } from '../utils'

export function cssVars(options: WemePresetResolvedOptions): Preflight<Theme>[] {
  return [
    {
      layer: 'theme',
      getCSS({ generator }) {
        if (Object.keys(options.cssVars).length === 0)
          return ''

        return minifyCss(
          `:root {
  ${Object.entries(options.cssVars)
    .map(([name, value]) => `${cssVarName(options.variablePrefix, name)}: ${resolveTokenValue(options.variablePrefix, value)};`)
    .join('\n')}
}`,
          generator.config.envMode === 'dev',
        )
      },
    },
  ]
}
