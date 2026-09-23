import * as z from 'zod'
import { RegistryPathsSchema } from './registry'
import { NonEmptyTrimmedString } from './utils'

// ============================================================================
// Project Config Schema
// ============================================================================

/**
 * 项目注册器 Schema
 *
 * @category Schema
 */
export const ProjectRegistrySchema = z.object({
  /**
   * 注册器仓库地址
   */
  repo: NonEmptyTrimmedString,
  /**
   * 注册器名称
   */
  registry: NonEmptyTrimmedString,
  /**
   * 项目名称前缀
   */
  prefix: NonEmptyTrimmedString.optional(),
})

/**
 * UnoCSS 预设配置 Schema
 *
 * @category Schema
 */
export const ProjectUnoCssSchema = z.object({
  /**
   * Accent 颜色配置
   *
   * @example {
   *   'primary': '#000000',
   *   'secondary': '#ffffff',
   * }
   */
  accentColors: z.record(NonEmptyTrimmedString, NonEmptyTrimmedString).optional(),
  /**
   * 灰度颜色配置
   *
   * @example {
   *   'gray': '#000000',
   *   'secondary': '#ffffff',
   * }
   */
  grayColors: z.record(NonEmptyTrimmedString, NonEmptyTrimmedString).optional(),
  /**
   * CSS 变量配置
   *
   * @example {
   *   '--primary-color': '#000000',
   *   '--secondary-color': '#ffffff',
   * }
   */
  cssVars: z.record(NonEmptyTrimmedString, NonEmptyTrimmedString).optional(),
})

/**
 * 项目配置 Schema
 *
 * @category Schema
 */
export const ProjectConfigSchema = z.object({
  /**
   * 项目注册器
   *
   * @example [
   *   {
   *     repo: 'https://github.com/weme-project/weme-ui',
   *     registry: 'weme-ui/slim',
   *   },
   * ]
   */
  registries: z.array(ProjectRegistrySchema),
  /**
   * 项目路径配置
   *
   * @example {
   *   'component': 'src/components',
   * }
   */
  paths: RegistryPathsSchema,
  /**
   * UnoCSS 预设配置
   */
  unoCss: ProjectUnoCssSchema.optional(),
})
