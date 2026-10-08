import * as v from 'valibot'
import { CONFIG_SCHEMA_URL } from '../constants'
import { RegistryNameString, RegistryPathsRecord } from '../registry'
import { CSSVariables, NonEmptyTrimmedString, TrimmedURLString } from '../shared'

// ============================================================================
// Project Config Schema
// ============================================================================

/**
 * 注册项目配置
 *
 * @category Project
 */
export const ProjectRegisteredItemSchema = v.pipe(
  v.object({
    /**
     * 注册中心仓库地址
     *
     * @optional
     */
    repo: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: '仓库',
          description: '托管该 registry 的源仓库。当 registry 本地尚不可用时，用于解析并拉取内容。',
          examples: ['https://github.com/weme-ui/weme-ui'],
        }),
      ),
    ),

    /**
     * 注册中心名称
     */
    registry: v.pipe(
      RegistryNameString,
      v.metadata({
        title: 'Registry',
        description: '向本项目注册的 registry，形式为 "owner/registry"。',
        examples: ['weme-ui/slim'],
      }),
    ),

    /**
     * 注册项目安装前缀，用于区分不同注册项目
     *
     * @optional
     */
    prefix: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: '前缀',
          description: '可选的安装前缀，用于为该 registry 的 items 做命名空间隔离，避免同一项目注册多个 registry 时发生冲突。',
          examples: ['weme'],
        }),
      ),
    ),
  }),
  v.metadata({
    title: '已注册的 Registry',
    description: '已向项目注册的 registry。指明使用哪个 registry，以及可选的拉取来源与安装前缀。',
    examples: [{
      repo: 'https://github.com/weme-ui/weme-ui',
      registry: 'weme-ui/slim',
      prefix: 'weme',
    }],
  }),
)

/**
 * 扩展 UnoCSS 配置
 *
 * @category Project
 */
export const ProjectUnoCSSConfigSchema = v.pipe(
  v.object({
    /**
     * 主题色
     *
     * @optional
     */
    accent: v.optional(
      v.pipe(
        v.record(
          v.pipe(NonEmptyTrimmedString, v.toLowerCase()),
          NonEmptyTrimmedString,
        ),
        v.metadata({
          title: '强调色',
          description: '项目主题的强调（品牌）色 token。键为 token 名，值为 CSS 颜色字符串，通常使用 oklch。',
          examples: [{ primary: 'oklch(0.55 0.2 250)', secondary: 'oklch(0.7 0.15 40)' }],
        }),
      ),
    ),

    /**
     * 中性色
     *
     * @optional
     */
    neutral: v.optional(
      v.pipe(
        v.record(
          v.pipe(NonEmptyTrimmedString, v.toLowerCase()),
          NonEmptyTrimmedString,
        ),
        v.metadata({
          title: '中性色',
          description: '项目主题的中性（灰阶）色 token。键为 token 名，值为 CSS 颜色字符串，通常使用 oklch。',
          examples: [{ base: 'oklch(0.2 0 0)', muted: 'oklch(0.55 0 0)' }],
        }),
      ),
    ),

    /**
     * CSS 变量
     *
     * @optional
     */
    cssVars: v.optional(
      v.pipe(
        CSSVariables,
        v.metadata({
          title: 'CSS 变量',
          description: '项目主题的额外 CSS 自定义属性。取值会合并进 UnoCSS preset options，嵌套结构为 theme-key → variable-name → value。',
          examples: [{ theme: { 'radius-lg': '0.75rem' } }],
        }),
      ),
    ),
  }),
  v.metadata({
    title: 'UnoCSS 扩展',
    description: '项目级 UnoCSS 主题扩展。用于自定义强调色、中性色，以及注入 UnoCSS preset 的额外 CSS 变量。',
  }),
)

/**
 * 项目配置
 *
 * @category Project
 */
export const ProjectConfigSchema = v.pipe(
  v.object({
    /**
     * 项目配置 JSON Schema
     *
     * @default CONFIG_SCHEMA_URL
     */
    $schema: v.optional(
      v.pipe(
        TrimmedURLString,
        v.metadata({
          title: 'Schema',
          description: '用于校验该项目配置的 JSON Schema URL。编辑器与工具链据此提供补全与校验。',
          examples: [CONFIG_SCHEMA_URL],
        }),
      ),
      CONFIG_SCHEMA_URL,
    ),

    /**
     * 路径配置
     *
     * @optional
     */
    paths: v.optional(RegistryPathsRecord),

    /**
     * 注册项目配置
     *
     * @optional
     */
    registries: v.optional(
      v.pipe(
        v.array(ProjectRegisteredItemSchema),
        v.metadata({
          title: 'Registries',
          description: '已向本项目注册的 registries。每项选择一个 registry，并可指定仓库来源与安装前缀。',
          examples: [{
            repo: 'https://github.com/weme-ui/weme-ui',
            registry: 'weme-ui/slim',
            prefix: 'weme',
          }],
        }),
      ),
    ),

    /**
     * 扩展 UnoCSS 配置
     *
     * @optional
     */
    unocss: v.optional(ProjectUnoCSSConfigSchema),
  }),
  v.metadata({
    title: '项目配置',
    description: 'Weme UI 项目配置。声明安装路径、已注册的 registries，以及可选的 UnoCSS 主题扩展。',
    examples: [{
      paths: { component: '~/components', ui: '~/components/ui' },
      registries: [{ registry: 'weme-ui/slim', prefix: 'weme' }],
    }],
  }),
)
