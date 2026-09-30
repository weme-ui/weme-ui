import * as z from 'zod'
import { REGISTRY_SCHEMA_URL } from '../constants'
import { NonEmptyTrimmedString, TrimmedURLString } from '../shared'
import { RegistryItemSchema, RegistryItemTypeEnum } from './item'

// ============================================================================
// Registry Config Schema
// ============================================================================

/**
 * 注册中心名称
 *
 * @category Registry
 */
export const RegistryNameString = z.templateLiteral([
  NonEmptyTrimmedString.lowercase(),
  z.literal('/'),
  NonEmptyTrimmedString.lowercase(),
]).meta({
  title: 'Registry name',
  description:
    'The unique name of the registry in the form "owner/registry". Used to identify and resolve this registry across the ecosystem.',
  examples: ['weme-ui/core', 'weme-ui/slim'],
})

/**
 * 注册中心访问权限
 *
 * @category Registry
 *
 * @default 'public'
 */
export const RegistryAccessEnum = z.enum([
  'public',
  'private',
])
  .default('public')
  .meta({
    title: 'Access',
    description:
      'Controls who can access this registry. "public" registries are open to everyone; "private" registries require authorization.',
    examples: ['public', 'private'],
  })

/**
 * 注册中心路径映射
 *
 * @category Registry
 */
export const RegistryPathsRecord = z.partialRecord(
  z.union([
    z.literal('*'),
    RegistryItemTypeEnum,
  ]),
  NonEmptyTrimmedString,
).meta({
  title: 'Paths',
  description:
    'Maps registry item types to install destinations. Use "*" as a catch-all for types without an explicit path. Paths may use aliases such as "~/components".',
  examples: [{ '*': '~/registry', 'component': '~/components', 'ui': '~/components/ui' }],
})

/**
 * 注册中心配置
 *
 * @category Registry
 */
export const RegistryConfigSchema = z.object({
  /**
   * 注册中心配置 JSON Schema
   *
   * @default REGISTRY_SCHEMA_URL
   */
  $schema: TrimmedURLString
    .default(REGISTRY_SCHEMA_URL)
    .meta({
      title: 'Schema',
      description:
        'URL of the JSON Schema used to validate this registry config. Editors and tooling use it for autocomplete and validation.',
      examples: [REGISTRY_SCHEMA_URL],
    }),

  /**
   * 名称
   */
  name: RegistryNameString,

  /**
   * 描述
   *
   * @optional
   */
  description: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Description',
      description:
        'A short human-readable summary of what this registry contains and what it is for.',
      examples: ['The slim registry of Weme UI'],
    }),

  /**
   * 版本
   *
   * @optional
   */
  version: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Version',
      description:
        'The version of this registry. Prefer a semver-compatible string so consumers can reason about upgrades.',
      examples: ['1.0.0', '2.1.3'],
    }),

  /**
   * 官网地址
   *
   * @optional
   */
  homepage: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Homepage',
      description: 'The URL of the project homepage for this registry.',
      examples: ['https://weme-ui.com'],
    }),

  /**
   * 仓库地址
   *
   * @optional
   */
  repository: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Repository',
      description: 'The URL of the source code repository for this registry.',
      examples: ['https://github.com/weme-ui/weme-ui'],
    }),

  /**
   * 问题追踪地址
   *
   * @optional
   */
  issues: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Issues',
      description:
        'The URL of the issue tracker where people can report problems with this registry.',
      examples: ['https://github.com/weme-ui/weme-ui/issues'],
    }),

  /**
   * 贡献者
   *
   * @optional
   */
  contributors: z.array(NonEmptyTrimmedString)
    .optional()
    .meta({
      title: 'Contributors',
      description:
        'A list of people who have contributed to this registry. Each entry is typically a name, optionally followed by an email address.',
      examples: ['Luo Yi <luoyi@mouji.com>'],
    }),

  /**
   * 访问权限
   *
   * @default 'public'
   * @optional
   */
  access: RegistryAccessEnum.optional(),

  /**
   * 注册项清单
   */
  items: z.array(RegistryItemSchema)
    .meta({
      title: 'Items',
      description:
        'The catalog of registry items published by this registry. Each item describes an installable unit such as a component, block, or utility.',
      examples: [{ name: 'button', title: 'Button', description: 'A button component' }],
    }),

  /**
   * 元数据
   *
   * @optional
   */
  meta: z.record(NonEmptyTrimmedString, NonEmptyTrimmedString)
    .optional()
    .meta({
      title: 'Metadata',
      description:
        'Arbitrary key-value metadata for tooling and discovery. Values are free-form strings and are not interpreted by the schema itself.',
      examples: [{ category: 'component', framework: 'vue' }],
    }),

  /**
   * 排除的注册项
   *
   * @optional
   */
  exclude: z.array(NonEmptyTrimmedString)
    .optional()
    .meta({
      title: 'Exclude',
      description:
        'A list of registry item names to omit from resolution or installation. Useful for temporarily hiding unfinished or deprecated items.',
      examples: ['button', 'legacy-card'],
    }),

  /**
   * 默认路径映射
   *
   * @optional
   */
  defaultPaths: RegistryPathsRecord.optional(),
}).meta({
  title: 'Registry configuration',
  description:
    'Configuration for a Weme UI registry. Declares identity, access, default install paths, and the items the registry exposes.',
  examples: [{
    name: 'weme-ui/slim',
    access: 'public',
    defaultPaths: { component: '~/components' },
    items: [{ name: 'button', title: 'Button', files: [{ path: 'button/button.vue' }] }],
  }],
})
