import type { PresetOptions, SourceCodeTransformer } from '@unocss/core'
import type { CustomTheme, CustomThemeCSSVars } from './custom/types'
import type { Theme } from './theme/types'
import { definePreset } from '@unocss/core'
import { extractorArbitraryVariants } from '@unocss/extractor-arbitrary-variants'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { DEFAULT_THEME } from './custom'
import { postprocessors } from './postprocess'
import { preflights } from './preflights'
import { rules } from './rules'
import { shortcuts } from './shortcuts'
import { shorthands } from './shorthands'
import { theme } from './theme'
import {
  PRESET_NAME,
  trackedProperties,
  trackedTheme,
  trackedCSSVars,
  trackedColorAliases,
  setColorAliasMap,
} from './utils'
import { variants } from './variants'

/**
 * 额外颜色
 */
interface AdditionalColors {
  /**
   * 强调色
   */
  accent?: Record<string, string>

  /**
   * 中性色
   */
  neutral?: Record<string, string>
}

/**
 * Weme UI 预设选项
 */
export interface PresetWemeUIOptions extends PresetOptions {
  /**
   * 暗色模式选项
   *
   * @default 'class'
   */
  dark?:
    | 'class'
    | 'media'
    | {
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
   * 是否输出 reset CSS
   *
   * @default true
   */
  reset?: boolean

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
   * 启用任意变体，例如 `<div class="[&>*]:m-1 [&[open]]:p-2"></div>`
   *
   * 禁用此选项可能会略微提高性能
   *
   * @default true
   */
  arbitraryVariants?: boolean

  /**
   * 启用变体组，例如 `<div class="b-(~ default)"></div>`
   *
   * @default true
   */
  transformerVariantGroup?: boolean

  /**
   * 自定义主题
   */
  themes?: CustomTheme[]

  /**
   * 自定义主题颜色
   */
  colors?: AdditionalColors

  /**
   * 自定义主题 CSS 变量
   */
  cssVars?: CustomThemeCSSVars
}

/**
 * Weme UI UnoCSS 预设
 */
export const presetWemeUI = definePreset<PresetWemeUIOptions, Theme>((options = {}) => {
  options.dark = options.dark ?? 'class'
  options.variablePrefix = options.variablePrefix ?? 'un-'
  options.important = options.important ?? false
  options.arbitraryVariants = options.arbitraryVariants ?? true
  options.transformerVariantGroup = options.transformerVariantGroup ?? true
  options.themes = options.themes ?? []
  options.colors = options.colors ?? {}
  options.cssVars = options.cssVars ?? {}

  if (options.themes?.length === 0 || options.themes?.some((t) => t.name === 'default')) {
    options.themes.push(DEFAULT_THEME)
  }

  setColorAliasMap(options.themes?.map((t) => t.aliases) ?? [])

  const transformers = [
    options.transformerVariantGroup ? transformerVariantGroup() : undefined,
  ].filter(Boolean) as SourceCodeTransformer[]

  return {
    name: PRESET_NAME,
    docs: 'https://weme-ui.github.io/weme-ui/docs/unocss-preset/',
    rules,
    shortcuts,
    theme: theme(options),
    layers: {
      properties: -200,
      theme: -150,
      base: -100,
    },
    transformers,
    preflights: preflights(options),
    variants: variants(options),
    prefix: options.prefix,
    postprocess: postprocessors(options),
    extractorDefault: !options.arbitraryVariants ? undefined : extractorArbitraryVariants(),
    autocomplete: {
      shorthands,
    },
    options,
    configResolved() {
      trackedTheme.clear()
      trackedProperties.clear()
      trackedCSSVars.clear()
      trackedColorAliases.clear()
    },
    meta: {
      themeDeps: trackedTheme,
      propertyDeps: trackedProperties,
      colorAliasDeps: trackedColorAliases,
      cssVarDeps: trackedCSSVars,
    },
  }
})

export default presetWemeUI
