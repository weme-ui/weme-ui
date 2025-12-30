import type { Preflight } from 'unocss'
import type { Theme, WemePresetResolvedOptions, WemePresetTheme } from '../types'
import { transformColor } from '../colors/transformer'
import { THEME } from '../defaults'
import { cssVarName, minifyCss, resolveTokenValue } from '../utils'

export function themes(options: WemePresetResolvedOptions): Preflight<Theme>[] {
  const themes: Preflight[] = []

  options.themes
    .forEach((theme) => {
      themes.push({
        layer: 'theme',
        getCSS({ generator }) {
          const selector = theme.id === THEME.id
            ? ':root'
            : `:where([data-theme=${theme.id}])`

          const tokens: string[] = processThemeTokens(theme, options.variablePrefix)
          const colors: string[] = processThemeColors(theme)

          return minifyCss(
            `${selector} { ${tokens.join('\n')} ${colors.join('\n')} }`,
            generator.config.envMode === 'dev',
          )
        },
      })
    })

  return themes
}

function processThemeColors(theme: WemePresetTheme) {
  const cssVars: string[] = []

  Object.entries(theme.colors).forEach(([name, color]) => {
    if (
      color.startsWith('#')
      || color.startsWith('rgb(')
      || color.startsWith('hsl(')
      || color.startsWith('lch(')
      || color.startsWith('oklch(')
    ) {
      transformColor(color, theme.appearance).forEach((c, i) => {
        cssVars.push(`--${name}-${i + 1}: var(--custom-${name}-${i + 1}, ${c});`)
      })
    }
    else {
      for (let i = 0; i <= 11; i++) {
        cssVars.push(`--${name}-${i + 1}: var(--custom-${name}-${i + 1}, var(--${color}-${i + 1}));`)
      }
    }
  })

  return cssVars
}

function processThemeTokens(theme: WemePresetTheme, prefix: string) {
  const cssVars: string[] = []

  cssVars.push(`--${prefix}-radius: var(--custom-radius, ${theme.radius});`)

  Object.entries(theme.tokens).forEach(([name, value]) => {
    if (typeof value === 'string') {
      cssVars.push(
        `${cssVarName(prefix, name)}: ${resolveTokenValue(prefix, value)};`,
      )
    }
    else if (typeof value === 'object') {
      Object.entries(value).forEach(([subName, subValue]) => {
        cssVars.push(
          `${cssVarName(prefix, name, subName)}: ${resolveTokenValue(prefix, subValue)};`,
        )
      })
    }
  })

  return cssVars
}
