import type { CSSEntry, Preflight } from '@unocss/core'
import type { Theme } from '../theme/types'
import { escapeSelector, uniq } from '@unocss/core'
import {
  compressCSS,
  detectThemeValue,
  getThemeByKey,
  getTrackedTheme,
  themeTracking,
} from '../utils'

interface TrackedThemeEntries {
  colors: CSSEntry[]
  deps: CSSEntry[]
}

type ColorVariant = 'dark' | 'p3' | 'p3-dark'

export function theme(): Preflight<Theme> {
  return {
    layer: 'theme',
    getCSS(ctx) {
      const { theme, generator } = ctx
      const safelist = uniq(
        generator.config.safelist.flatMap((s) => (typeof s === 'function' ? s(ctx) : s)),
      )

      if (safelist.length > 0) {
        for (const s of safelist) {
          const [key, ...prop] = s.trim().split(':')
          if (key in theme && prop.length <= 1) {
            const props =
              prop.length === 0 ? (key === 'colors' ? ['9'] : ['DEFAULT']) : prop[0].split('-')
            const v = getThemeByKey(theme, key as keyof Theme, props)

            if (typeof v === 'string') {
              themeTracking(theme, key, props)
              detectThemeValue(v, theme)
            }
          }
        }
      }

      const trackedTheme = getTrackedTheme(theme)
      if (trackedTheme.size === 0) return undefined

      const { colors, deps } = resolveTrackedThemeEntries(theme)
      const resolvedDeps = serializeTrackedThemeEntries(deps)
      const { resolvedColors, resolvedDarkColors, resolvedP3Colors, resolvedP3DarkColors } =
        resolveColorCssGroups(theme, colors)

      if (resolvedDeps.length === 0 && resolvedColors.length === 0) return undefined

      const depsCSS = createCssBlock(':root', resolvedDeps)
      const colorCSS = createCssBlock(':root', resolvedColors)
      const darkColorCSS = createCssBlock('.dark', resolvedDarkColors)
      const p3ColorCSS =
        resolvedP3Colors.length > 0
          ? `
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root {
${resolvedP3Colors.join('\n')}
    }

    .dark {
${resolvedP3DarkColors.join('\n')}
    }
  }
}`
          : ''

      return compressCSS(
        `
${depsCSS}
${colorCSS}
${darkColorCSS}
${p3ColorCSS}
`,
        ctx.generator.config.envMode === 'dev',
      )
    },
  }
}

/**
 * 解析颜色 CSS 组
 */
function resolveColorCssGroups(theme: Theme, colors: CSSEntry[]) {
  const resolvedColors: string[] = []
  const resolvedDarkColors: string[] = []
  const resolvedP3Colors: string[] = []
  const resolvedP3DarkColors: string[] = []

  const sortedColors = [...colors].toSorted((a, b) => a[0].localeCompare(b[0]))

  for (const [key, value] of sortedColors) {
    if (!key || !value) continue

    resolvedColors.push(`${escapeSelector(key)}: ${value};`)

    const darkValue = resolveColorVariant(theme, key, 'dark')
    if (darkValue) resolvedDarkColors.push(`${escapeSelector(key)}: ${darkValue};`)

    const p3Value = resolveColorVariant(theme, key, 'p3')
    if (p3Value) resolvedP3Colors.push(`${escapeSelector(key)}: ${p3Value};`)

    const p3DarkValue = resolveColorVariant(theme, key, 'p3-dark')
    if (p3DarkValue) resolvedP3DarkColors.push(`${escapeSelector(key)}: ${p3DarkValue};`)
  }

  return {
    resolvedColors,
    resolvedDarkColors,
    resolvedP3Colors,
    resolvedP3DarkColors,
  }
}

/**
 * 解析颜色变体
 */
function resolveColorVariant(theme: Theme, key: string, variant: ColorVariant): string | undefined {
  const variantKey = key.replace(
    new RegExp(`^--(.+?)(?:-${variant})?-(\\d+)$`),
    (_, prefix, num) => `${prefix}-${variant}-${num}`,
  )
  const value = getThemeByKey(theme, 'colors', variantKey.split('-'))

  return typeof value === 'string' ? value : undefined
}

/**
 * 创建 CSS 块
 */
function createCssBlock(selector: string, declarations: string[]): string {
  if (declarations.length === 0) return ''

  return `
${selector} {
${declarations.join('\n')}
}`
}

/**
 * 序列化跟踪的主题变量
 */
function serializeTrackedThemeEntries(entries: CSSEntry[]): string[] {
  return entries
    .map(([key, value]) => (key && value ? `${escapeSelector(key)}: ${value};` : undefined))
    .filter(Boolean) as string[]
}

/**
 * 解析跟踪的主题变量, 切分成颜色和依赖
 */
function resolveTrackedThemeEntries(theme: Theme): TrackedThemeEntries {
  const colors: CSSEntry[] = []
  const deps: CSSEntry[] = []

  const trackedTheme = Array.from(getTrackedTheme(theme)).toSorted((a, b) =>
    a[0].localeCompare(b[0]),
  )

  for (const entry of trackedTheme) {
    const [key, prop] = entry.split(':') as [keyof Theme, string]
    const value = getThemeByKey(theme, key, prop.split('-'))

    if (typeof value !== 'string') continue

    if (key === 'colors') {
      colors.push([`--${prop}`, value])
      continue
    }

    const suffix = key === 'spacing' && prop === 'DEFAULT' ? '' : `-${prop}`
    deps.push([`--${key}${suffix}`, value])
  }

  return {
    colors,
    deps,
  }
}
