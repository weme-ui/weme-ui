import * as v from 'valibot'
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
export const RegistryNameString = v.pipe(
  v.string(),
  v.trim(),
  v.toLowerCase(),
  v.nonEmpty(),
  v.regex(/^[^/]+\/[^/]+$/),
  v.metadata({
    title: 'Registry 名称',
    description: 'registry 的唯一名称，形式为 "owner/registry"。用于在生态中标识并解析该 registry。',
    examples: ['weme-ui/core', 'weme-ui/slim'],
  }),
)

/**
 * 注册中心访问权限
 *
 * @category Registry
 *
 * @default 'public'
 */
export const RegistryAccessEnum = v.pipe(
  v.picklist([
    'public',
    'private',
  ]),
  v.metadata({
    title: '访问权限',
    description: '控制谁可以访问该 registry。"public" 对所有人开放；"private" 需要授权。',
    examples: ['public', 'private'],
  }),
)

/**
 * 注册中心路径映射
 *
 * @category Registry
 */
export const RegistryPathsRecord = v.pipe(
  v.record(
    v.union([
      v.literal('*'),
      RegistryItemTypeEnum,
    ]),
    NonEmptyTrimmedString,
  ),
  v.metadata({
    title: '路径',
    description: '将 registry item 类型映射到安装目标路径。用 "*" 作为未显式配置类型的兜底。路径可使用别名，例如 "~/components"。',
    examples: [{ '*': '~/registry', 'component': '~/components', 'ui': '~/components/ui' }],
  }),
)

/**
 * 注册中心配置
 *
 * @category Registry
 */
export const RegistryConfigSchema = v.pipe(
  v.object({
    /**
     * 注册中心配置 JSON Schema
     *
     * @default REGISTRY_SCHEMA_URL
     */
    $schema: v.optional(
      v.pipe(
        TrimmedURLString,
        v.metadata({
          title: 'Schema',
          description: '用于校验该 registry 配置的 JSON Schema URL。编辑器与工具链据此提供补全与校验。',
          examples: [REGISTRY_SCHEMA_URL],
        }),
      ),
      REGISTRY_SCHEMA_URL,
    ),

    /**
     * 名称
     */
    name: RegistryNameString,

    /**
     * 描述
     *
     * @optional
     */
    description: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: '描述',
          description: '对该 registry 内容与用途的简短说明。',
          examples: ['Weme UI 的 slim registry'],
        }),
      ),
    ),

    /**
     * 版本
     *
     * @optional
     */
    version: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: '版本',
          description: '该 registry 的版本。建议使用兼容 semver 的字符串，便于消费方判断升级。',
          examples: ['1.0.0', '2.1.3'],
        }),
      ),
    ),

    /**
     * 官网地址
     *
     * @optional
     */
    homepage: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: '主页',
          description: '该 registry 所属项目的主页 URL。',
          examples: ['https://weme-ui.com'],
        }),
      ),
    ),

    /**
     * 仓库地址
     *
     * @optional
     */
    repository: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: '仓库',
          description: '该 registry 源代码仓库的 URL。',
          examples: ['https://github.com/weme-ui/weme-ui'],
        }),
      ),
    ),

    /**
     * 问题追踪地址
     *
     * @optional
     */
    issues: v.optional(
      v.pipe(
        NonEmptyTrimmedString,
        v.metadata({
          title: 'Issues',
          description: '用于反馈该 registry 问题的 issue 跟踪地址。',
          examples: ['https://github.com/weme-ui/weme-ui/issues'],
        }),
      ),
    ),

    /**
     * 贡献者
     *
     * @optional
     */
    contributors: v.optional(
      v.pipe(
        v.array(NonEmptyTrimmedString),
        v.metadata({
          title: '贡献者',
          description: '参与该 registry 的贡献者列表。通常为姓名，可选附带邮箱。',
          examples: ['Luo Yi <luoyi@mouji.com>'],
        }),
      ),
    ),

    /**
     * 访问权限
     *
     * @default 'public'
     * @optional
     */
    access: v.optional(RegistryAccessEnum, 'public'),

    /**
     * 默认 NPM 依赖项，以当前 registry 初始化项目时，会自动安装这些依赖项
     *
     * @optional
     */
    dependencies: v.optional(
      v.pipe(
        v.array(v.pipe(NonEmptyTrimmedString, v.toLowerCase())),
        v.metadata({
          title: '依赖',
          description: '以该 registry 初始化消费方项目时默认安装的运行时 NPM 包。与 item 级依赖不同，这些依赖对整个 registry 只应用一次。条目可带版本范围或 tag，例如 "vue^3.4.0" 或 "lodash@latest"。',
          examples: ['vue^3.4.0', 'class-variance-authority@latest'],
        }),
      ),
    ),

    /**
     * 默认 NPM 开发依赖项，以当前 registry 初始化项目时，会自动安装这些依赖项
     *
     * @optional
     */
    devDependencies: v.optional(
      v.pipe(
        v.array(v.pipe(NonEmptyTrimmedString, v.toLowerCase())),
        v.metadata({
          title: '开发依赖',
          description: '以该 registry 初始化消费方项目时默认安装的开发用 NPM 包。适用于 registry 共享的工具链（例如测试辅助），而非应用运行时所需的包。条目可带版本范围或 tag。',
          examples: ['vitest^2.0.0', '@vue/test-utils@latest'],
        }),
      ),
    ),

    /**
     * 注册项清单
     */
    items: v.pipe(
      v.array(RegistryItemSchema),
      v.metadata({
        title: 'Items',
        description: '该 registry 发布的 item 目录。每个 item 描述一个可安装单元，例如 component、block 或工具。',
        examples: [{ name: 'button', title: 'Button', description: '按钮 component' }],
      }),
    ),

    /**
     * 排除的注册项
     *
     * @optional
     */
    exclude: v.optional(
      v.pipe(
        v.array(NonEmptyTrimmedString),
        v.metadata({
          title: '排除',
          description: '在解析或安装时忽略的 registry item 名称列表。适合临时隐藏未完成或已弃用的 item。',
          examples: ['button', 'legacy-card'],
        }),
      ),
    ),

    /**
     * 默认路径映射
     *
     * @optional
     */
    defaultPaths: v.optional(RegistryPathsRecord),
  }),
  v.metadata({
    title: 'Registry 配置',
    description: 'Weme UI registry 的配置。声明标识、访问权限、默认安装路径，以及对外暴露的 items。',
    examples: [{
      name: 'weme-ui/slim',
      access: 'public',
      defaultPaths: { component: '~/components' },
      items: [{ name: 'button', title: 'Button', files: [{ path: 'button/button.vue' }] }],
    }],
  }),
)
