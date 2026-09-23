import type * as z from 'zod'
import type { LockFileItemSchema, LockFileSchema } from './config/schema/lock-file'
import type { ProjectConfigSchema, ProjectRegistrySchema } from './config/schema/project'
import type { RegistryAccessEnum, RegistryConfigSchema, RegistryPathsSchema } from './config/schema/registry'
import type { RegistryItemFileKindEnum, RegistryItemFileSchema, RegistryItemSchema, RegistryItemTypeEnum, RegistryItemWhenEnum } from './config/schema/registry-item'

// ============================================================================
// Project Config Type
// ============================================================================

/**
 * 项目配置
 *
 * @category Types
 */
export type ProjectConfig = Prettify<z.infer<typeof ProjectConfigSchema>>

/**
 * 项目注册器
 *
 * @category Types
 */
export type ProjectRegistry = Prettify<z.infer<typeof ProjectRegistrySchema>>

// ============================================================================
// Registry Config Type
// ============================================================================

/**
 * 注册器
 *
 * @category Types
 */
export type RegistryConfig = Prettify<z.infer<typeof RegistryConfigSchema>>

/**
 * 注册器路径配置
 *
 * @category Types
 */
export type RegistryPaths = z.infer<typeof RegistryPathsSchema>

/**
 * 注册器访问权限
 *
 * - public: 公开
 * - private: 私有
 *
 * @category Types
 */
export type RegistryAccess = LooseAutocomplete<z.infer<typeof RegistryAccessEnum>>

/**
 * 注册项目
 *
 * @category Types
 */
export type RegistryItem = Prettify<z.infer<typeof RegistryItemSchema>>

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
 * @category Types
 */
export type RegistryItemType = LooseAutocomplete<z.infer<typeof RegistryItemTypeEnum>>

/**
 * 注册项目安装条件
 *
 * - on-init: 当项目初始化时安装
 * - on-needed: 当初安装项设为依赖时安装
 *
 * @category Types
 */
export type RegistryItemWhen = LooseAutocomplete<z.infer<typeof RegistryItemWhenEnum>>

/**
 * 注册项目文件类型
 *
 * - file: 文件
 * - doc: 文档
 * - example: 示例
 * - test: 测试
 *
 * @category Types
 */
export type RegistryItemFileKind = LooseAutocomplete<z.infer<typeof RegistryItemFileKindEnum>>

/**
 * 注册项目文件
 *
 * @category Types
 */
export type RegistryItemFile = Prettify<z.infer<typeof RegistryItemFileSchema>>

// ============================================================================
// Lock File Type
// ============================================================================

/**
 * 锁定文件
 *
 * @category Types
 */
export type LockFile = Prettify<z.infer<typeof LockFileSchema>>

/**
 * 锁定文件项目
 *
 * @category Types
 */
export type LockFileItem = Prettify<z.infer<typeof LockFileItemSchema>>

// ============================================================================
// Utils Type
// ============================================================================

/**
 * 松散的自动补全类型
 *
 * @category Utils
 */
export type LooseAutocomplete<T> = T | (string & {})

/**
 * 美化类型
 *
 * @category Utils
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {}
