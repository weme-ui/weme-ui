import * as z from 'zod'
import { CSSVariables, NonEmptyTrimmedString } from '../shared'

// ============================================================================
// Registry Item Schema
// ============================================================================

/**
 * 注册项类型
 *
 * @category Registry
 */
export const RegistryItemTypeEnum = z.enum([
  'component',
  'composable',
  'ui',
  'block',
  'layout',
  'page',
  'util',
])
  .meta({
    title: 'Item type',
    description:
      'The category of the registry item. Determines how the item is classified and which default install path it uses when resolving files.',
    examples: ['component', 'composable', 'ui', 'block', 'layout', 'page', 'util'],
  })

/**
 * 注册项何时被安装，仅影响被动安装的情况
 *
 * @category Registry
 *
 * @default 'on-depended'
 */
export const RegistryItemWhenEnum = z.enum([
  'on-init',
  'on-depended',
])
  .default('on-depended')
  .meta({
    title: 'Install timing',
    description:
      'Controls when this item is installed during passive (automatic) installation. "on-init" installs the item as soon as the registry is initialized; "on-depended" installs it only when another item depends on it. This field does not affect explicit, user-requested installs.',
    examples: ['on-init', 'on-depended'],
  })

/**
 * 注册项文件类型
 *
 * @category Registry
 *
 * @default 'file'
 */
export const RegistryItemFileKindEnum = z.enum([
  'file',
  'doc',
  'example',
  'test',
])
  .default('file')
  .meta({
    title: 'File kind',
    description:
      'The role of a file within a registry item. "file" is the primary source; "doc", "example", and "test" mark supporting documentation, demos, and tests respectively.',
    examples: ['file', 'doc', 'example', 'test'],
  })

/**
 * 注册项文件配置
 *
 * @category Registry
 */
export const RegistryItemFileSchema = z.object({
  /**
   * 注册项类型
   *
   * @default 'block'
   * @optional
   */
  type: RegistryItemTypeEnum.default('block').optional(),

  /**
   * 注册项文件类型
   *
   * @default 'file'
   * @optional
   */
  kind: RegistryItemFileKindEnum.optional(),

  /**
   * 注册项文件路径
   */
  path: NonEmptyTrimmedString.meta({
    title: 'Source path',
    description:
      'The path to the file within the registry package. Relative to the registry root.',
    examples: ['button/button.vue', 'use-toggle/index.ts'],
  }),

  /**
   * 注册项文件目标路径
   *
   * @optional
   */
  target: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Target path',
      description:
        'The destination path where this file should be written when the item is installed. If omitted, the path is derived from the registry default paths and the item type.',
      examples: ['components/ui/button.vue'],
    }),

}).meta({
  title: 'Registry item file',
  description:
    'Describes a single file that belongs to a registry item, including its source path, optional install target, type, and kind.',
})

/**
 * 注册项配置
 *
 * @category Registry
 */
export const RegistryItemSchema = z.object({
  /**
   * 注册项名称
   */
  name: NonEmptyTrimmedString
    .lowercase()
    .meta({
      title: 'Name',
      description:
        'The unique identifier of the registry item within its registry. Must be lowercase.',
      examples: ['button', 'use-toggle'],
    }),

  /**
   * 注册项显示名称
   *
   * @optional
   */
  title: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Display name',
      description:
        'A human-friendly display name for the item, shown in UIs and documentation. Falls back to the name when omitted.',
      examples: ['Button', 'Use Toggle'],
    }),

  /**
   * 注册项描述
   *
   * @optional
   */
  description: NonEmptyTrimmedString
    .optional()
    .meta({
      title: 'Description',
      description:
        'A short summary of what this registry item provides, useful for discovery and documentation.',
      examples: ['A versatile button component with multiple variants.'],
    }),

  /**
   * 注册项类型
   *
   * @default 'block'
   * @optional
   */
  type: RegistryItemTypeEnum
    .default('block')
    .optional()
    .meta({
      title: 'Type',
      description:
        'The category of this registry item. Defaults to "block" when omitted. Used for classification and to select the matching default install path.',
      examples: ['block', 'component', 'composable', 'ui', 'layout', 'page', 'util'],
    }),

  /**
   * 注册项何时被安装
   *
   * @default 'on-depended'
   * @optional
   */
  when: RegistryItemWhenEnum
    .optional()
    .meta({
      title: 'Install timing',
      description:
        'Controls when this item is installed during passive (automatic) installation. "on-init" installs as soon as the registry is initialized; "on-depended" installs only when another item depends on it. Explicit installs are unaffected.',
      examples: ['on-init', 'on-depended'],
    }),

  /**
   * 注册项文件清单
   */
  files: z.array(RegistryItemFileSchema).meta({
    title: 'Files',
    description:
      'The files that make up this registry item. At least the primary source files should be listed here.',
    examples: [{ path: 'button/button.vue' }],
  }),

  /**
   * 注册项待注入 CSS 变量，将注入至 UnoCSS Preset Options 中
   *
   * @optional
   */
  cssVars: CSSVariables
    .optional()
    .meta({
      title: 'CSS variables',
      description:
        'CSS custom properties to inject when this item is installed. Values are merged into UnoCSS preset options, nested as theme-key → variable-name → value.',
      examples: [{ theme: { 'color-primary': 'oklch(0.55 0.2 250)' } }],
    }),

  /**
   * 注册项 NPM 依赖项
   *
   * @optional
   */
  dependencies: z.array(NonEmptyTrimmedString.lowercase())
    .optional()
    .meta({
      title: 'Dependencies',
      description:
        'NPM packages required at runtime by this item. Entries may include a version range or tag, e.g. "vue^3.0.0" or "lodash@latest".',
      examples: ['vue^3.4.0', 'class-variance-authority@latest'],
    }),

  /**
   * 注册项 NPM 开发依赖项
   *
   * @optional
   */
  devDependencies: z.array(NonEmptyTrimmedString.lowercase())
    .optional()
    .meta({
      title: 'Dev dependencies',
      description:
        'NPM packages required only for developing or testing this item. These are not needed in production.',
      examples: ['vitest^2.0.0', '@vue/test-utils@latest'],
    }),

  /**
   * 注册项依赖的注册项
   *
   * @optional
   */
  registryDependencies: z.array(NonEmptyTrimmedString.lowercase())
    .optional()
    .meta({
      title: 'Registry dependencies',
      description:
        'Other registry items that must be installed alongside this one. Referenced by item name within the same or a resolved registry.',
      examples: ['button', 'utils'],
    }),
}).meta({
  title: 'Registry item',
  description:
    'A single installable unit in a registry. Describes identity, type, files, CSS variables, and both NPM and registry-level dependencies.',
  examples: [{
    name: 'button',
    title: 'Button',
    description: 'A versatile button component with multiple variants.',
    type: 'component',
    files: [{ path: 'button/button.vue' }],
    registryDependencies: ['utils'],
  }],
})
