import type { Preflight } from '@unocss/core'
import type { PresetWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import type { CustomTheme, CustomThemeCSSVars } from '../tokens'
import { resolveRadixColorScales } from '../colors'
import { DEFAULT_NAME, isRawColor, resolveCustomThemeCssVars } from '../tokens'
import { compressCSS } from '../utils'

export function custom(options: PresetWemeUIOptions): Preflight<Theme> | undefined {
  if (options.themes?.length === 0) {
    return undefined
  }

  const defaultCssVarsCSS = options.cssVars ? resolveCustomCssVars(options.cssVars) : ''

  const themeCSS = options.themes?.map((theme) => {
    const colorsCSS = resolveCustomThemeColors(theme as CustomTheme)
    const tokensCSS = resolveCustomThemeTokens(theme as CustomTheme)

    return `${colorsCSS}
${defaultCssVarsCSS}
${tokensCSS}
`
  }).filter(Boolean).join('\n')

  if (!themeCSS) {
    return undefined
  }

  return {
    getCSS: ({ generator }) => {
      return compressCSS(
        themeCSS,
        generator.config.envMode === 'dev',
      )
    },
    layer: 'theme',
  }
}

function resolveCustomThemeColors(theme: CustomTheme): string {
  const lightCSS: string[] = []
  const darkCSS: string[] = []

  const lightSelector = `${theme.name === DEFAULT_NAME ? ':root, ' : ''}:where([data-theme='${theme.name}'])`
  const darkSelector = `.dark:where([data-theme='${theme.name}'])`

  Object.entries(theme.colors).forEach(([name, color]) => {
    if (isRawColor(color)) {
      const lightColorScales = resolveRadixColorScales({ color, mode: 'light' })

      lightColorScales.p3.forEach((color, index) => {
        lightCSS.push(`--${name}-${index + 1}: var(--custom-${name}-${index + 1}, ${color});`)
      })

      const darkColorScales = resolveRadixColorScales({ color, mode: 'dark' })

      darkColorScales.p3.forEach((color, index) => {
        darkCSS.push(`--${name}-${index + 1}: var(--custom-${name}-${index + 1}, ${color});`)
      })
    }
    else {
      for (let i = 0; i <= 11; i++) {
        lightCSS.push(`--${name}-${i + 1}: var(--custom-${name}-${i + 1}, var(--${color}-${i + 1}));`)
      }
    }
  })

  return `${lightSelector} {
${lightCSS.join('\n')}
}
${darkCSS.length > 0
  ? `${darkSelector} {
${darkCSS.join('\n')}
}`
  : ''}`
}

function resolveCustomThemeTokens(theme: CustomTheme): string {
  const tokensSelector = `${theme.name === DEFAULT_NAME ? ':root, ' : ''}:where([data-theme='${theme.name}'])`
  const tokensCSS: string[] = Object.entries(
    resolveCustomThemeCssVars(theme.tokens),
  ).map(
    ([key, value]) => {
      return `${key}: ${value};`
    },
  )

  if (theme.cssVars) {
    Object.entries(
      resolveCustomThemeCssVars(theme.cssVars),
    ).forEach(([key, value]) => {
      tokensCSS.push(`${key}: ${value};`)
    })
  }

  return tokensCSS.length > 0
    ? `${tokensSelector} {
${tokensCSS.join('\n')}
}
`
    : ''
}

function resolveCustomCssVars(cssVars: CustomThemeCSSVars): string {
  const cssVarsCSS: string[] = Object.entries(
    resolveCustomThemeCssVars(cssVars),
  ).map(
    ([key, value]) => {
      return `${key}: ${value};`
    },
  )

  return cssVarsCSS.length > 0
    ? `:root {
${cssVarsCSS.join('\n')}
}
`
    : ''
}
