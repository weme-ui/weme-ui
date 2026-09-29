import type { Preflight } from '@unocss/core'
import type { ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme'
import type { CustomTheme, CustomThemeColorAlias, ResolvedCustomThemeCSSVars } from '../tokens'
import { resolveRadixColorScales } from '../colors'
import { DEFAULT_NAME, isRawColor, resolveCustomThemeCssVars } from '../tokens'
import { compressCSS, detectThemeValue, themeTracking, trackedColorAliases } from '../utils'

export function custom(options: ResolvedWemeUIOptions): Preflight<Theme> | undefined {
  if (options.themes?.length === 0) {
    return undefined
  }

  return {
    getCSS: ({ generator, theme }) => {
      const defaultCssVarsCSS = options.cssVars
        ? createCssBlock(':root', serializeCssVars(options.cssVars, theme))
        : ''

      const themeCSS = options.themes?.map((customTheme) => {
        const colorAliasCSS = resolveCustomThemeColorAlias(customTheme, theme)
        const tokensCSS = resolveCustomThemeTokens(customTheme, theme)

        return [colorAliasCSS, defaultCssVarsCSS, tokensCSS]
          .filter(Boolean)
          .join('\n')
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

function getThemeSelector(name: string, dark = false): string {
  const themeSelector = `:where([data-theme='${name}'])`

  if (dark) {
    return `.dark${themeSelector}`
  }

  return name === DEFAULT_NAME
    ? `:root, ${themeSelector}`
    : themeSelector
}

function createCssBlock(selector: string, entries: string[]): string {
  if (entries.length === 0) {
    return ''
  }

  return `${selector} {
${entries.join('\n')}
}`
}

function serializeCssVars(
  cssVars: ResolvedCustomThemeCSSVars,
  theme: Theme,
): string[] {
  return Object.entries(resolveCustomThemeCssVars(cssVars, theme)).map(
    ([key, value]) => `${key}: ${value};`,
  )
}

function getTrackedColorAliasGroups(): Record<string, string[]> {
  return Array.from(trackedColorAliases)
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, alias) => {
      const [name, no] = alias.split(':')
      acc[name] ??= []
      acc[name].push(no)
      return acc
    }, {} as Record<string, string[]>)
}

function resolveAliasDeclarations(
  custom: CustomTheme<ResolvedCustomThemeCSSVars>,
  theme: Theme,
): { light: string[], dark: string[] } {
  const light: string[] = []
  const dark: string[] = []

  Object.entries(getTrackedColorAliasGroups()).forEach(([name, nos]) => {
    const color = custom.colors[name as keyof CustomThemeColorAlias]
    const sorted = [...nos].sort((a, b) => Number(a) - Number(b))

    if (isRawColor(color)) {
      const lightColorScales = resolveRadixColorScales({ color, mode: 'light' })
      const darkColorScales = resolveRadixColorScales({ color, mode: 'dark' })

      sorted.forEach((no) => {
        const index = Number(no) - 1
        const lightValue = lightColorScales.p3[index]
        const darkValue = darkColorScales.p3[index]

        light.push(`--${name}-${no}: var(--custom-${name}-${no}, ${lightValue});`)
        dark.push(`--${name}-${no}: var(--custom-${name}-${no}, ${darkValue});`)

        detectThemeValue(lightValue, theme)
      })
    }
    else {
      sorted.forEach((no) => {
        const value = `var(--custom-${name}-${no}, var(--${color}-${no}))`

        light.push(`--${name}-${no}: ${value};`)
        dark.push(`--${name}-${no}: ${value};`)

        themeTracking('colors', [color, no])
      })
    }
  })

  return { light, dark }
}

function resolveCustomThemeColorAlias(custom: CustomTheme<ResolvedCustomThemeCSSVars>, theme: Theme): string {
  if (trackedColorAliases.size === 0) {
    return ''
  }

  const { light, dark } = resolveAliasDeclarations(custom, theme)

  return [
    createCssBlock(getThemeSelector(custom.name), light),
    createCssBlock(getThemeSelector(custom.name, true), dark),
  ].filter(Boolean).join('\n')
}

function resolveCustomThemeTokens(custom: CustomTheme<ResolvedCustomThemeCSSVars>, theme: Theme): string {
  const entries = [
    ...serializeCssVars(custom.tokens as unknown as ResolvedCustomThemeCSSVars, theme),
    ...(custom.cssVars ? serializeCssVars(custom.cssVars, theme) : []),
  ]

  return createCssBlock(getThemeSelector(custom.name), entries)
}
