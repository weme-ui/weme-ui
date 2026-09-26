import type { Arrayable, CSSEntry, PreflightContext, PresetOptions } from '@unocss/core'
import type { PartialDeep } from 'type-fest'
import type { CustomColors } from './colors'
import type { Theme } from './theme'
import type { WemeUITheme } from './tokens'
import { defu } from 'defu'
import { DEFAULT_COLORS, DEFAULT_NAME, DEFAULT_RADIUS, DEFAULT_SCALING, DEFAULT_TOKENS } from './tokens'

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
export interface PresetWemeUIOptions extends PresetOptions {
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
  colors?: CustomColors

  /**
   * 自定义主题
   */
  themes?: PartialDeep<WemeUITheme>[]

  /**
   * 自定义 CSS 变量
   */
  cssVars?: Record<string, string>
}

export function resolveOptions(options: PresetWemeUIOptions) {
  options.dark = options.dark ?? 'class'
  options.variablePrefix = options.variablePrefix ?? 'un-'
  options.important = options.important ?? false
  options.colors = options.colors ?? {}
  options.themes = options.themes ?? []
  options.cssVars = options.cssVars ?? {}

  options.themes = options.themes.map((theme) => {
    return {
      name: theme.name ?? DEFAULT_NAME,
      scaling: theme.scaling ?? DEFAULT_SCALING,
      radius: theme.radius ?? DEFAULT_RADIUS,
      colors: defu(theme.colors ?? {}, DEFAULT_COLORS),
      tokens: defu(theme.tokens ?? {}, DEFAULT_TOKENS),
    }
  })

  if (!options.themes.some(theme => theme.name === DEFAULT_NAME)) {
    options.themes.push({
      name: DEFAULT_NAME,
      scaling: DEFAULT_SCALING,
      radius: DEFAULT_RADIUS,
      colors: DEFAULT_COLORS,
      tokens: DEFAULT_TOKENS,
    })
  }

  return options
}
