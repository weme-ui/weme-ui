import * as z from 'zod'
import { RegistryItemSchema, RegistryItemTypeEnum } from './registry-item'
import { NonEmptyTrimmedString } from './utils'

// ============================================================================
// Registry Schema
// ============================================================================

/**
 * 注册路径配置
 *
 * @category Schema
 */
export const RegistryPathsSchema = z.partialRecord(
  z.union([z.literal('*'), RegistryItemTypeEnum]),
  z.string(),
)

/**
 * 注册器访问权限
 *
 * - public: 公开
 * - private: 私有
 *
 * @category Schema
 */
export const RegistryAccessEnum = z.enum(['public', 'private'])

/**
 * 注册器 Schema
 *
 * @category Schema
 */
export const RegistryConfigSchema = z.object({
  /**
   * 注册器名称
   *
   * @example '<repo>/<scope>': 'weme-ui/slim'
   */
  name: NonEmptyTrimmedString.toLowerCase(),
  /**
   * 注册器描述
   */
  description: NonEmptyTrimmedString.optional(),
  /**
   * 注册器版本
   *
   * @default 'package'
   */
  version: z.literal('package').default('package').optional(),
  /**
   * 注册器主页
   */
  homepage: NonEmptyTrimmedString.optional(),
  /**
   * 注册器仓库
   */
  repository: NonEmptyTrimmedString.optional(),
  /**
   * 注册器问题追踪
   */
  issues: NonEmptyTrimmedString.optional(),
  /**
   * 注册器贡献者
   */
  contributors: z.array(NonEmptyTrimmedString).optional(),
  /**
   * 注册器元数据
   */
  meta: z.record(NonEmptyTrimmedString, z.string()).optional(),
  /**
   * 访问权限
   *
   * @default 'public'
   */
  access: RegistryAccessEnum.default('public').optional(),
  /**
   * 注册器项目
   *
   * @example [{
   *   name: 'button',
   *   type: 'component',
   *   path: 'src/components/button',
   *   files: [
   *     {
   *       path: 'button.tsx',
   *       type: 'component',
   *     },
   *   ],
   * }]
   */
  items: z.array(RegistryItemSchema),
  /**
   * 排除注册器项目, 将不会被安装
   *
   * @example ['weme-ui/slim/button']
   */
  exclude: z.array(NonEmptyTrimmedString).optional(),
  /**
   * 默认路径配置
   *
   * @example { 'block': 'src/blocks', 'component': 'src/components', 'page': 'src/pages' }
   */
  defaultPaths: RegistryPathsSchema.optional(),
})
