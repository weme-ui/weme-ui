import type { Preflight } from '@unocss/core'
import type { PresetWemeUIOptions } from '..'
import type {
  CustomTheme,
  CustomThemeColorAliases,
  CustomThemeCSSVars,
  FlattenedCustomThemeCSSVars,
} from '../custom/types'
import type { Theme } from '../theme'
import { resolveColor } from '@weme-ui/colors'
import {
  applyShortKeys,
  DEFAULT_RADIUS_FACTOR,
  DEFAULT_SCALING,
  flattenCssVars,
  isRawColor,
  themeRadiusMap,
  themeScalingMap,
} from '../custom'
import {
  compressCSS,
  detectThemeValue,
  generateThemeVariable,
  getTrackedColorAliasGroups,
  isSize,
  parseColor,
  themeTracking,
  trackedColorAliases,
} from '../utils'

export function custom(options: PresetWemeUIOptions): Preflight<Theme> | undefined {
  if (!options.cssVars && !options.themes?.length) {
    return undefined
  }

  return {
    getCSS: ({ generator, theme }) => {
      const globalCssVars = resolveGlobalCssVars(options.cssVars ?? {}, theme)
      const themeCssBlocks = resolveThemeCssVars((options.themes as CustomTheme[]) ?? [], theme)
      const colorAliasBlocks = resolveThemeColorAliases(
        (options.themes as CustomTheme[]) ?? [],
        theme,
      )

      return compressCSS(
        [globalCssVars, ...colorAliasBlocks, ...themeCssBlocks].join('\n'),
        generator.config.envMode === 'dev',
      )
    },
    layer: 'theme',
  }
}

/**
 * 解析全局 CSS 变量
 *
 * @param cssVars - CSS 变量
 * @param theme - 主题
 * @returns 全局 CSS 变量
 */
function resolveGlobalCssVars(cssVars: CustomThemeCSSVars, theme: Theme): string {
  const flattenedCssVars = flattenCssVars(cssVars)
  const entries = serializeCSSEntries(flattenedCssVars, theme)

  return createCssBlock(':root', entries)
}

/**
 * 解析主题 CSS 变量
 *
 * @param themes - 自定义主题列表
 * @param theme - 主题
 * @returns 解析后的主题 CSS 块列表
 */
function resolveThemeCssVars(themes: CustomTheme[], theme: Theme): string[] {
  const entries = themes.map((t) => {
    const themeTokens = t.tokens ? flattenCssVars(t.tokens) : {}
    const themeCSSVars = t.cssVars ? flattenCssVars(t.cssVars) : {}

    const themeOptions = [
      `--default-radius-factor: ${themeRadiusMap[t.radius] ?? DEFAULT_RADIUS_FACTOR};`,
      `--default-scaling: ${themeScalingMap[t.scaling] ?? DEFAULT_SCALING};`,
    ]

    const themeEntries = [
      ...themeOptions,
      ...serializeCSSEntries(themeTokens, theme),
      ...(themeCSSVars ? serializeCSSEntries(themeCSSVars, theme) : []),
    ]

    return createCssBlock(getThemeSelector(t.name), themeEntries)
  })

  return entries
}

/**
 * 获取主题选择器
 *
 * @param name - 主题名称
 * @returns 主题选择器
 */
function getThemeSelector(name: string, scheme?: 'light' | 'dark'): string {
  return scheme === 'dark'
    ? `:where([data-theme="${name}"]).dark`
    : `${name === 'default' ? ':root,' : ''}:where([data-theme="${name}"])`
}

/**
 * 解析主题颜色别名
 *
 * @param themes - 自定义主题列表
 * @returns 解析后的主题颜色别名块列表
 */
function resolveThemeColorAliases(themes: CustomTheme[], theme: Theme): string[] {
  if (trackedColorAliases.size === 0) {
    return []
  }

  const entries = themes.map((t) => {
    const light: string[] = []
    const dark: string[] = []

    Object.entries(getTrackedColorAliasGroups()).forEach(([name, nos]) => {
      const color = t.aliases[name as keyof CustomThemeColorAliases]
      const sortedNos = [...nos].toSorted((a, b) => Number(a) - Number(b))

      if (isRawColor(color)) {
        const lightScales = resolveColor(color, 'light')
        const darkScales = resolveColor(color, 'dark')

        sortedNos.forEach((no) => {
          const index = Number(no) - 1
          const lightValue = lightScales.p3[index]
          const darkValue = darkScales.p3[index]

          light.push(`--${name}-${no}: var(--custom-${name}-${no}, ${lightValue});`)
          dark.push(`--${name}-${no}: var(--custom-${name}-${no}, ${darkValue});`)
        })
      } else {
        sortedNos.forEach((no) => {
          light.push(`--${name}-${no}: var(--custom-${name}-${no}, var(--${color}-${no}));`)

          themeTracking(theme, 'colors', [color, no])
        })
      }
    })

    return [
      createCssBlock(getThemeSelector(t.name, 'light'), light),
      createCssBlock(getThemeSelector(t.name, 'dark'), dark),
    ]
      .filter(Boolean)
      .join('\n')
  })

  return entries
}

/**
 * 创建 CSS 块
 *
 * @param selector - 选择器
 * @param entries - 样式
 * @returns 创建的 CSS 块
 */
function createCssBlock(selector: string, entries: string[]): string {
  if (entries.length === 0) {
    return ''
  }

  return `${selector} {
${entries.join('\n')}
}`
}

/**
 * 序列化 CSS 变量
 *
 * @param vars - CSS 变量
 * @param theme - 主题
 * @returns 序列化后的 CSS 变量
 */
function serializeCSSEntries(vars: FlattenedCustomThemeCSSVars, theme: Theme): string[] {
  const entries: string[] = []

  const dedupedVars = Object.entries(vars).reduce((acc, [key, value]) => {
    const shortKey = applyShortKeys(key)
    if (acc[shortKey]) {
      return acc
    }
    acc[shortKey] = value
    return acc
  }, {} as FlattenedCustomThemeCSSVars)

  Object.entries(dedupedVars).forEach(([key, value]) => {
    const body = value.replace(/\./g, '-')
    const { keys } = parseColor(body, theme) ?? {}

    if (keys && keys.length > 0) {
      themeTracking(theme, 'colors', keys)
      entries.push(`--${key}: ${generateThemeVariable('colors', keys)};`)
    } else {
      if (isSize(value) || isRawColor(value)) {
        entries.push(`--${key}: ${value};`)
        detectThemeValue(value, theme)
      } else {
        entries.push(`--${key}: var(--${body});`)
      }
    }
  })

  return entries
}
