import type { Arrayable, CSSEntry, DeepPartial, PreflightContext } from '@unocss/core'
import type { AdditionalColors } from './colors'
import type { Theme } from './theme'
import type { CustomTheme, CustomThemeColorAlias, CustomThemeCSSVars, CustomThemeTokens, ResolvedCustomThemeCSSVars } from './tokens'
import type { Prettify } from './utils'
import { defu } from 'defu'
import { DEFAULT_COLOR_ALIASES, DEFAULT_NAME, DEFAULT_TOKENS } from './tokens'

/**
 * 暗色模式选择器
 *
 * @category Preset
 */
interface DarkModeSelectors {
  /**
   * 亮色模式选择器
   *
   * @default '.light'
   */
  light?: string

  /**
   * 暗色模式选择器
   *
   * @default '.dark'
   */
  dark?: string
}

/**
 * 预设主题
 *
 * @category Preset
 */
export interface PreflightsTheme {
  /**
   * 生成主题键作为 CSS 变量
   *
   * - `true`: 生成主题键完全
   * - `false`: 禁用主题键 (不推荐 ⚠️)
   * - `'on-demand'`: 仅在需要时生成主题键
   *
   * @default 'on-demand'
   */
  mode?: boolean | 'on-demand'

  /**
   * 处理主题键
   */
  process?: Arrayable<(entry: CSSEntry, ctx: PreflightContext<Theme>) => void>
}

/**
 * 预设选项
 *
 * @category Preset
 */
export interface PresetWemeUIOptions {
  /**
   * 暗色模式选项
   *
   * @default 'class'
   */
  dark?: 'class' | 'media' | DarkModeSelectors

  /**
   * CSS 变量前缀
   *
   * @default 'un-'
   */
  variablePrefix?: string

  /**
   * 工具前缀，当使用标记伪选择器时，只有第一个为真的前缀会被使用
   *
   * @default undefined
   */
  prefix?: string | string[]

  /**
   * 启用任意变体，例如 `<div class="[&>*]:m-1 [&[open]]:p-2"></div>`
   *
   * 禁用此选项可能会略微提高性能
   *
   * @default true
   */
  arbitraryVariants?: boolean

  /**
   * 重要选项，控制 UnoCSS 的工具是否应该标记为 `!important`
   * 当使用 UnoCSS 与具有高特异性的现有 CSS 时，这非常有用
   * 你也可以将 `important` 设置为一个选择器，比如 `#app`，这将生成 `#app :is(.m-1) { ... }`
   * 也请查看 [:is()](https://caniuse.com/?search=%3Ais()) 的兼容性
   *
   * @default false
   */
  important?: boolean | string

  /**
   * 控制预设样式
   */
  preflights?: {
    /**
     * 重置默认预设样式
     *
     * @default true
     */
    reset?: boolean

    /**
     * 主题配置，用于预设样式
     *
     * 这可以是 `PreflightsTheme['mode']` 中的特定模式或完整的 `PreflightsTheme` 对象。
     * 主题定义了应用于元素的基本样式，可以自定义以匹配设计系统或项目的需求。
     */
    theme?: PreflightsTheme['mode'] | PreflightsTheme

    /**
     * 属性预设生成配置
     *
     * - `false`: 禁用属性预设
     * - `true` 或 `undefined`: 启用默认配置
     * - `object`: 启用自定义配置
     */
    property?: boolean | {
      /**
       * 自定义父选择器 (例如，@supports 查询或 @layer)
       *
       * - `string`: 使用自定义父选择器
       * - `false`: 没有父选择器，直接应用属性到选择器
       * - `undefined`: 使用默认 @supports 查询
       *
       * @default '@supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b))))'
       */
      parent?: string | false

      /**
       * 自定义选择器，用于应用属性
       *
       * @default '*, ::before, ::after, ::backdrop'
       */
      selector?: string
    }
  }

  /**
   * 自定义颜色
   */
  colors?: AdditionalColors

  /**
   * 自定义主题
   */
  themes?: DeepPartial<CustomTheme>[]

  /**
   * 自定义 CSS 变量
   */
  cssVars?: CustomThemeCSSVars
}

/**
 * 初始化后的预设选项
 *
 * @category Preset
 */
export type ResolvedWemeUIOptions = Prettify<Omit<PresetWemeUIOptions, 'themes' | 'cssVars'> & {
  /**
   * 初始化后的主题
   */
  themes: CustomTheme<ResolvedCustomThemeCSSVars>[]

  /**
   * 初始化后的 CSS 变量
   */
  cssVars: ResolvedCustomThemeCSSVars
}>

/**
 * 解析预设选项
 */
export function resolveOptions(options: PresetWemeUIOptions): ResolvedWemeUIOptions {
  options.dark = options.dark ?? 'class'
  options.variablePrefix = options.variablePrefix ?? 'un-'
  options.important = options.important ?? false
  options.colors = options.colors ?? {}

  options.themes = options.themes ?? []
  options.cssVars = options.cssVars ?? {}

  const themes: CustomTheme<ResolvedCustomThemeCSSVars>[] = []

  if (options.themes?.length === 0) {
    themes.push({
      name: DEFAULT_NAME,
      colors: DEFAULT_COLOR_ALIASES,
      tokens: flattenCssVars(DEFAULT_TOKENS),
      cssVars: {},
    })
  }
  else {
    options.themes?.forEach((theme) => {
      themes.push({
        name: theme.name ?? DEFAULT_NAME,
        colors: defu(theme.colors ?? {}, DEFAULT_COLOR_ALIASES) as CustomThemeColorAlias,
        tokens: flattenCssVars(theme.tokens ?? DEFAULT_TOKENS),
        cssVars: theme.cssVars ? flattenCssVars(theme.cssVars as CustomThemeCSSVars) : {},
      })
    })
  }

  return {
    ...options,
    themes,
    cssVars: flattenCssVars(options.cssVars),
  }
}

function flattenCssVars(cssVars: CustomThemeTokens | CustomThemeCSSVars): ResolvedCustomThemeCSSVars {
  return Object.entries(cssVars).reduce((acc, [scope, vals]) => {
    if (typeof vals === 'string') {
      acc[scope] = vals
    }
    else {
      Object.entries(vals).forEach(([key, value]) => {
        acc[`${scope}-${key}`] = value as string
      })
    }
    return acc
  }, {} as ResolvedCustomThemeCSSVars)
}
