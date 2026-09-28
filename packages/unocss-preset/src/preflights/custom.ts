import type { Preflight } from '@unocss/core'
import type { PresetWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import type { CustomTheme, CustomThemeColorAlias, CustomThemeCSSVars } from '../tokens'
import { resolveRadixColorScales } from '../colors'
import { DEFAULT_NAME, isRawColor, resolveCustomThemeCssVars } from '../tokens'
import { compressCSS, detectThemeValue, themeTracking, trackedColorAliases } from '../utils'

export function custom(options: PresetWemeUIOptions): Preflight<Theme> | undefined {
  if (options.themes?.length === 0) {
    return undefined
  }

  return {
    getCSS: ({ generator, theme }) => {
      const defaultCssVarsCSS = options.cssVars ? resolveCustomCssVars(options.cssVars) : ''

      const themeCSS = options.themes?.map((custom) => {
        const colorAliasCSS = resolveCustomThemeColorAlias(custom as CustomTheme, theme)
        const tokensCSS = resolveCustomThemeTokens(custom as CustomTheme)

        return `${colorAliasCSS}
    ${defaultCssVarsCSS}
    ${tokensCSS}
    `
      }).filter(Boolean).join('\n')

      if (!themeCSS) {
        return undefined
      }

      return compressCSS(
        themeCSS,
        generator.config.envMode === 'dev',
      )
    },
    layer: 'theme',
  }
}

function resolveCustomThemeColorAlias(custom: CustomTheme, theme: Theme): string {
  if (trackedColorAliases.size === 0) {
    return ''
  }

  const lightCSS: string[] = []
  const darkCSS: string[] = []

  const lightSelector = `${custom.name === DEFAULT_NAME ? ':root, ' : ''}:where([data-theme='${custom.name}'])`
  const darkSelector = `.dark:where([data-theme='${custom.name}'])`

  const colorAliases = Array.from(trackedColorAliases).reduce((acc, alias) => {
    const [name, no] = alias.split(':')
    acc[name] = acc[name] || []
    acc[name].push(no)
    return acc
  }, {} as Record<string, string[]>)

  Object.entries(colorAliases).forEach(([name, nos]) => {
    const color = custom.colors[name as keyof CustomThemeColorAlias]

    if (isRawColor(color)) {
      const lightColorScales = resolveRadixColorScales({ color, mode: 'light' })
      const darkColorScales = resolveRadixColorScales({ color, mode: 'dark' })

      nos.forEach((no) => {
        lightCSS.push(`--${name}-${no}: var(--custom-${name}-${no}, ${lightColorScales.p3[Number(no) - 1]});`)
        darkCSS.push(`--${name}-${no}: var(--custom-${name}-${no}, ${darkColorScales.p3[Number(no) - 1]});`)

        detectThemeValue(lightColorScales.p3[Number(no) - 1], theme)
      })
    }
    else {
      nos.forEach((no) => {
        lightCSS.push(`--${name}-${no}: var(--custom-${name}-${no}, var(--${color}-${no}));`)
        darkCSS.push(`--${name}-${no}: var(--custom-${name}-${no}, var(--${color}-${no}));`)

        themeTracking('colors', [color, no])
      })
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
