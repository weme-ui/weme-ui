import * as z from 'zod'
import { NonEmptyTrimmedString } from './utils'

// ============================================================================
// Registry Item Schema
// ============================================================================

/**
 * 注册项目类型
 *
 * - block: 功能块
 * - component: 组件
 * - composable: 组合式函数
 * - ui: UI 组件
 * - layout: 布局
 * - page: 页面
 * - util: 工具
 *
 * @category Schema
 */
export const RegistryItemTypeEnum = z.enum(['block', 'component', 'composable', 'ui', 'layout', 'page', 'util'])

/**
 * 注册项目安装条件
 *
 * - on-init: 当项目初始化时安装
 * - on-needed: 当初安装项设为依赖时安装
 *
 * @category Schema
 */
export const RegistryItemWhenEnum = z.enum(['on-init', 'on-needed'])

/**
 * 注册项目文件类型
 *
 * - file: 文件
 * - doc: 文档
 * - example: 示例
 * - test: 测试
 *
 * @category Schema
 */
export const RegistryItemFileKindEnum = z.enum(['file', 'doc', 'example', 'test'])

/**
 * 注册项目文件 Schema
 *
 * @category Schema
 */
export const RegistryItemFileSchema = z.object({
  /**
   * 文件路径
   */
  path: NonEmptyTrimmedString,
  /**
   * 文件类型
   *
   * @default 'file'
   */
  kind: RegistryItemFileKindEnum.default('file').optional(),
  /**
   * 项目类型
   *
   * @default 'block'
   */
  type: RegistryItemTypeEnum.default('block').optional(),
  /**
   * 文件目标, 将覆盖所有路径配置
   */
  target: NonEmptyTrimmedString.optional(),
})

/**
 * 注册项目 Schema
 *
 * @category Schema
 */
export const RegistryItemSchema = z.object({
  /**
   * 项目名称
   */
  name: NonEmptyTrimmedString.toLowerCase(),
  /**
   * 项目显示名称
   */
  title: NonEmptyTrimmedString.optional(),
  /**
   * 项目描述
   */
  description: NonEmptyTrimmedString.optional(),
  /**
   * 项目类型
   *
   * @default 'block'
   */
  type: RegistryItemTypeEnum.default('block').optional(),
  /**
   * 项目安装条件
   *
   * @default 'on-needed'
   */
  when: RegistryItemWhenEnum.default('on-needed').optional(),
  /**
   * 项目文件
   */
  files: z.array(RegistryItemFileSchema),
  /**
   * CSS 变量
   *
   * @example { '--item-css-variable': '#000' }
   */
  cssVars: z.record(NonEmptyTrimmedString.toLowerCase(), z.string()).optional(),
  /**
   * 依赖 NPM 包，将自动安装
   *
   * @example ['package^1.0.0', 'package@latest']
   */
  dependencies: z.array(NonEmptyTrimmedString).optional(),
  /**
   * 项目依赖
   *
   * @example ['project@1.0.0', 'project@latest']
   */
  devDependencies: z.array(NonEmptyTrimmedString).optional(),
  /**
   * 依赖注册项目，将自动安装
   */
  registryDependencies: z.array(NonEmptyTrimmedString).optional(),
})
