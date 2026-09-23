import * as z from 'zod'
import { RegistryItemFileSchema, RegistryItemSchema } from './registry-item'
import { NonEmptyTrimmedString } from './utils'

// ============================================================================
// Lock File Schema
// ============================================================================

/**
 * 锁定文件项目 Schema
 *
 * @category Schema
 */
export const LockFileItemSchema = z.object({
  /**
   * 项目名称
   */
  name: RegistryItemSchema.shape.name,
  /**
   * 项目类型
   */
  type: RegistryItemFileSchema.shape.type.unwrap(),
  /**
   * 项目文件类型
   */
  kind: RegistryItemFileSchema.shape.kind.unwrap(),
  /**
   * 项目文件路径
   */
  path: RegistryItemFileSchema.shape.path,
})

/**
 * 锁定文件 Schema
 *
 * @category Schema
 */
export const LockFileSchema = z.object({
  /**
   * 注册器名称
   */
  registry: NonEmptyTrimmedString,
  /**
   * 注册器仓库地址
   */
  repo: NonEmptyTrimmedString,
  /**
   * 项目名称前缀
   */
  prefix: NonEmptyTrimmedString.optional(),
  /**
   * 锁定文件项目
   */
  items: z.array(LockFileItemSchema),
})
