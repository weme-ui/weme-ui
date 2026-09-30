import * as z from 'zod'
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
export const ProjectRegisteredItemSchema = z.object({
  /**
   * 注册中心仓库地址
   *
   * @optional
   */
  repo: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Repository',
      description:
        'The source repository that hosts the registry. Used to resolve and fetch registry contents when the registry is not already available locally.',
      examples: ['https://github.com/weme-ui/weme-ui'],
    }),

  /**
   * 注册中心名称
   */
  registry: RegistryNameString.meta({
    title: 'Registry',
    description:
      'The registry to register with this project, in the form "owner/registry".',
    examples: ['weme-ui/slim'],
  }),

  /**
   * 注册项目安装前缀，用于区分不同注册项目
   *
   * @optional
   */
  prefix: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Prefix',
      description:
        'An optional install prefix used to namespace this registry\'s items and avoid collisions when multiple registries are registered in the same project.',
      examples: ['weme'],
    }),
}).meta({
  title: 'Registered registry',
  description:
    'A registry registered with the project. Identifies which registry to use and optionally where to fetch it from and under which prefix to install its items.',
  examples: [{
    repo: 'https://github.com/weme-ui/weme-ui',
    registry: 'weme-ui/slim',
    prefix: 'weme',
  }],
})

/**
 * 扩展 UnoCSS 配置
 *
 * @category Project
 */
export const ProjectUnoCSSConfigSchema = z.object({
  /**
   * 主题色
   *
   * @optional
   */
  accent: z.record(
    NonEmptyTrimmedString.lowercase(),
    NonEmptyTrimmedString,
  )
    .optional()
    .meta({
      title: 'Accent colors',
      description:
        'Accent (brand) color tokens for the project theme. Keys are token names and values are CSS color strings, typically in oklch.',
      examples: [{ primary: 'oklch(0.55 0.2 250)', secondary: 'oklch(0.7 0.15 40)' }],
    }),

  /**
   * 中性色
   *
   * @optional
   */
  neutral: z.record(
    NonEmptyTrimmedString.lowercase(),
    NonEmptyTrimmedString,
  )
    .optional()
    .meta({
      title: 'Neutral colors',
      description:
        'Neutral (gray-scale) color tokens for the project theme. Keys are token names and values are CSS color strings, typically in oklch.',
      examples: [{ base: 'oklch(0.2 0 0)', muted: 'oklch(0.55 0 0)' }],
    }),

  /**
   * CSS 变量
   *
   * @optional
   */
  cssVars: CSSVariables
    .optional()
    .meta({
      title: 'CSS variables',
      description:
        'Additional CSS custom properties for the project theme. Values are merged into UnoCSS preset options, nested as theme-key → variable-name → value.',
      examples: [{ theme: { 'radius-lg': '0.75rem' } }],
    }),
}).meta({
  title: 'UnoCSS extensions',
  description:
    'Project-level UnoCSS theme extensions. Use this to customize accent colors, neutral colors, and additional CSS variables injected into the UnoCSS preset.',
})

/**
 * 项目配置
 *
 * @category Project
 */
export const ProjectConfigSchema = z.object({
  /**
   * 项目配置 JSON Schema
   *
   * @default CONFIG_SCHEMA_URL
   */
  $schema: TrimmedURLString.default(CONFIG_SCHEMA_URL).meta({
    title: 'Schema',
    description:
      'URL of the JSON Schema used to validate this project config. Editors and tooling use it for autocomplete and validation.',
    examples: [CONFIG_SCHEMA_URL],
  }),

  /**
   * 路径配置
   *
   * @optional
   */
  paths: RegistryPathsRecord.optional(),

  /**
   * 注册项目配置
   *
   * @optional
   */
  registries: z.array(ProjectRegisteredItemSchema)
    .optional()
    .meta({
      title: 'Registries',
      description:
        'Registries registered with this project. Each entry selects a registry and may specify a repository source and install prefix.',
      examples: [{
        repo: 'https://github.com/weme-ui/weme-ui',
        registry: 'weme-ui/slim',
        prefix: 'weme',
      }],
    }),

  /**
   * 扩展 UnoCSS 配置
   *
   * @optional
   */
  unocss: ProjectUnoCSSConfigSchema.optional(),
}).meta({
  title: 'Project configuration',
  description:
    'Configuration for a Weme UI project. Declares install paths, registered registries, and optional UnoCSS theme extensions.',
  examples: [{
    paths: { component: '~/components', ui: '~/components/ui' },
    registries: [{ registry: 'weme-ui/slim', prefix: 'weme' }],
  }],
})
