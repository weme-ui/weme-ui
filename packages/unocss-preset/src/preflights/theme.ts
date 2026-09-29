import type { CSSEntry, Preflight, PreflightContext } from '@unocss/core'
import type { PreflightsTheme, ResolvedWemeUIOptions } from '../options'
import type { Theme } from '../theme/types'
import { escapeSelector, toArray, uniq } from '@unocss/core'
import { alphaPlaceholdersRE } from '@unocss/rule-utils'
import { compressCSS, detectThemeValue, getThemeByKey, themeTracking, trackedTheme } from '../utils'

/** Exclude output for CSS Variables */
const ExcludeCssVarKeys = [
  'colors',
  'spacing',
  'breakpoint',
  'verticalBreakpoint',
  'shadow',
  'insetShadow',
  'dropShadow',
  'textShadow',
  'animation',
  'property',
  'aria',
  'media',
  'supports',
  'containers',
]

interface ThemeEntries {
  colors: CSSEntry[]
  deps: CSSEntry[]
}

type ColorVariant = 'dark' | 'p3' | 'p3-dark'

function resolvePreflightThemeOptions(options: ResolvedWemeUIOptions): PreflightsTheme {
  const themeOption = options.preflights?.theme

  if (typeof themeOption === 'boolean' || typeof themeOption === 'string') {
    return { mode: themeOption ?? 'on-demand' }
  }

  return {
    mode: themeOption?.mode ?? 'on-demand',
    ...themeOption,
  }
}

function normalizeThemeValue(value: string): string {
  return value.replace(alphaPlaceholdersRE, '1')
}

function collectThemeVars(
  themeMap: Map<string, string>,
  obj: Record<string, unknown>,
  prefix: string,
): void {
  for (const key in obj) {
    const value = obj[key]

    if (Array.isArray(value)) {
      themeMap.set(`--${prefix}-${key}`, normalizeThemeValue(value.join(',')))
    }
    else if (value && typeof value === 'object') {
      collectThemeVars(themeMap, value as Record<string, unknown>, `${prefix}-${key}`)
    }
    else if (typeof value === 'string') {
      themeMap.set(`--${prefix}-${key}`, normalizeThemeValue(value))
    }
  }
}

function getThemeVarsMap(theme: Theme, keys: string[]): Map<string, string> {
  const themeMap = new Map<string, string>([
    ['--spacing', theme.spacing!.DEFAULT],
  ])

  for (const key of keys) {
    const value = theme[key as keyof Theme]
    if (value && typeof value === 'object') {
      collectThemeVars(themeMap, value as Record<string, unknown>, key)
    }
  }

  return themeMap
}

function trackSafelistThemeValues(ctx: PreflightContext<Theme>): void {
  const { theme, generator } = ctx
  const safelist = uniq(
    generator.config.safelist.flatMap(s => typeof s === 'function' ? s(ctx) : s),
  )

  for (const s of safelist) {
    const [key, ...prop] = s.trim().split(':')
    if (!(key in theme) || prop.length > 1)
      continue

    const props = prop.length === 0 ? ['DEFAULT'] : prop[0].split('-')
    const value = getThemeByKey(theme, key as keyof Theme, props)

    if (typeof value === 'string') {
      themeTracking(key, props)
      detectThemeValue(value, theme)
    }
  }
}

function resolveOnDemandThemeEntries(theme: Theme): ThemeEntries {
  const colors: CSSEntry[] = []
  const deps: CSSEntry[] = []

  for (const entry of trackedTheme) {
    const [key, prop] = entry.split(':') as [keyof Theme, string]
    const value = getThemeByKey(theme, key, prop.split('-'))

    if (typeof value !== 'string')
      continue

    if (key === 'colors') {
      colors.push([`--${prop}`, value])
      continue
    }

    // 跳过颜色主题变量，改为 tokens 接管
    const suffix = key === 'spacing' && prop === 'DEFAULT' ? '' : `-${prop}`
    deps.push([`--${key}${suffix}`, value])
  }

  return { colors, deps }
}

function resolveFullThemeEntries(theme: Theme): ThemeEntries {
  const keys = Object.keys(theme).filter(k => !ExcludeCssVarKeys.includes(k))

  return {
    deps: Array.from(getThemeVarsMap(theme, keys)),
    colors: Array.from(getThemeVarsMap(theme, ['colors'])),
  }
}

function resolveColorVariant(
  theme: Theme,
  key: string,
  variant: ColorVariant,
): string | undefined {
  const variantKey = key.replace(/^--/, '').split('-').join(`-${variant}-`)
  const value = getThemeByKey(theme, 'colors', variantKey.split('-'))

  return typeof value === 'string' ? value : undefined
}

function createCssBlock(selector: string, declarations: string[]): string {
  if (declarations.length === 0)
    return ''

  return `
${selector} {
${declarations.join('\n')}
}`
}

function applyProcessHooks(
  entries: CSSEntry[],
  process: PreflightsTheme['process'],
  ctx: PreflightContext<Theme>,
): void {
  if (!process)
    return

  const processors = toArray(process)
  for (const entry of entries) {
    for (const processor of processors) {
      processor(entry, ctx)
    }
  }
}

function serializeCssEntries(entries: CSSEntry[]): string[] {
  return entries
    .map(([key, value]) => (key && value) ? `${escapeSelector(key)}: ${value};` : undefined)
    .filter(Boolean) as string[]
}

function resolveColorCssGroups(theme: Theme, colors: CSSEntry[]) {
  const resolvedColors: string[] = []
  const resolvedDarkColors: string[] = []
  const resolvedP3Colors: string[] = []
  const resolvedP3DarkColors: string[] = []

  const sortedColors = [...colors].sort((a, b) => a[0].localeCompare(b[0]))

  for (const [key, value] of sortedColors) {
    if (!key || !value)
      continue

    resolvedColors.push(`${escapeSelector(key)}: ${value};`)

    const darkValue = resolveColorVariant(theme, key, 'dark')
    if (darkValue)
      resolvedDarkColors.push(`${escapeSelector(key)}: ${darkValue};`)

    const p3Value = resolveColorVariant(theme, key, 'p3')
    if (p3Value)
      resolvedP3Colors.push(`${escapeSelector(key)}: ${p3Value};`)

    const p3DarkValue = resolveColorVariant(theme, key, 'p3-dark')
    if (p3DarkValue)
      resolvedP3DarkColors.push(`${escapeSelector(key)}: ${p3DarkValue};`)
  }

  return {
    resolvedColors,
    resolvedDarkColors,
    resolvedP3Colors,
    resolvedP3DarkColors,
  }
}

function createThemeCSS(
  ctx: PreflightContext<Theme>,
  deps: CSSEntry[],
  colors: CSSEntry[],
  process?: PreflightsTheme['process'],
): string | undefined {
  applyProcessHooks(deps, process, ctx)
  applyProcessHooks(colors, process, ctx)

  const resolvedDeps = serializeCssEntries(deps)
  if (resolvedDeps.length === 0)
    return undefined

  const {
    resolvedColors,
    resolvedDarkColors,
    resolvedP3Colors,
    resolvedP3DarkColors,
  } = resolveColorCssGroups(ctx.theme, colors)

  const colorCSS = createCssBlock(':root, .light', resolvedColors)
  const darkColorCSS = createCssBlock('.dark', resolvedDarkColors)
  const p3ColorCSS = resolvedP3Colors.length > 0
    ? `
@supports (color: color(display-p3 1 1 1)) {
  @media (color-gamut: p3) {
    :root,
    .light {
${resolvedP3Colors.join('\n')}
    }

    .dark {
${resolvedP3DarkColors.join('\n')}
    }
  }
}`
    : ''

  return compressCSS(`
:root, :host {
${resolvedDeps.join('\n')}
}
${colorCSS}
${darkColorCSS}
${p3ColorCSS}
`, ctx.generator.config.envMode === 'dev')
}

export function theme(options: ResolvedWemeUIOptions): Preflight<Theme> {
  const preflightsTheme = resolvePreflightThemeOptions(options)

  return {
    layer: 'theme',
    getCSS(ctx) {
      const { mode, process } = preflightsTheme
      if (mode === false)
        return undefined

      trackSafelistThemeValues(ctx)

      if (mode === 'on-demand') {
        if (trackedTheme.size === 0)
          return undefined

        const { deps, colors } = resolveOnDemandThemeEntries(ctx.theme)
        return createThemeCSS(ctx, deps, colors, process)
      }

      const { deps, colors } = resolveFullThemeEntries(ctx.theme)
      return createThemeCSS(ctx, deps, colors, process)
    },
  }
}
