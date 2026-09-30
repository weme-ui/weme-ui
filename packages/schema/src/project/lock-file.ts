import * as z from 'zod'
import { LOCKFILE_SCHEMA_URL } from '../constants'
import { RegistryItemFileSchema } from '../registry'
import { NonEmptyTrimmedString, TrimmedURLString } from '../shared'
import { ProjectRegisteredItemSchema } from './schema'

// ============================================================================
// Project Lock File Schema
// ============================================================================

/**
 * 已添加的注册项文件
 *
 * @category Project
 */
export const ProjectAddedItemFileSchema = z.object({
  /**
   * 注册项文件源路径
   */
  source: RegistryItemFileSchema.shape.path.meta({
    title: 'Source path',
    description:
      'The original path of the file inside the registry package, relative to the registry root.',
    examples: ['button/button.vue', 'use-toggle/index.ts'],
  }),

  /**
   * 注册项文件目标路径
   */
  dest: NonEmptyTrimmedString.meta({
    title: 'Destination path',
    description:
      'The path where this file was written in the project when the item was installed.',
    examples: ['src/components/ui/button/button.vue', 'src/composables/use-toggle/index.ts'],
  }),
})
  .meta({
    title: 'Installed file',
    description:
      'A single file recorded in the lock file: where it came from in the registry, and where it was installed in the project.',
    examples: [{
      source: 'button/button.vue',
      dest: 'src/components/ui/button/button.vue',
    }],
  })

/**
 * 已添加的注册项目
 *
 * @category Project
 */
export const ProjectAddedItemSchema = z.object({
  /**
   * 已添加的注册中心名称
   */
  registry: ProjectRegisteredItemSchema.shape.registry.meta({
    title: 'Registry',
    description:
      'The registry this installed item came from, in the form "owner/registry".',
    examples: ['weme-ui/core', 'weme-ui/slim'],
  }),

  /**
   * 注册中心仓库地址
   */
  repo: ProjectRegisteredItemSchema.shape.repo.meta({
    title: 'Repository',
    description:
      'The source repository the registry was resolved from when this item was installed.',
    examples: ['https://github.com/weme-ui/weme-ui'],
  }),

  /**
   * 注册项目安装前缀，用于区分不同注册项目
   */
  prefix: ProjectRegisteredItemSchema.shape.prefix.meta({
    title: 'Prefix',
    description:
      'The install prefix that was applied to this item, used to namespace files when multiple registries are present in the same project.',
    examples: ['weme'],
  }),

  /**
   * 已添加的注册项目文件列表
   */
  files: z.array(ProjectAddedItemFileSchema).meta({
    title: 'Files',
    description:
      'The files installed into the project for this item, each with its registry source path and project destination path.',
    examples: [{
      source: 'button/button.vue',
      dest: 'src/components/ui/button/button.vue',
    }],
  }),
}).meta({
  title: 'Installed item',
  description:
    'A registry item that has been installed into the project. Records which registry it came from and which files were written.',
  examples: [{
    registry: 'weme-ui/slim',
    repo: 'https://github.com/weme-ui/weme-ui',
    prefix: 'weme',
    files: [{
      source: 'button/button.vue',
      dest: 'src/components/ui/button/button.vue',
    }],
  }],
})

/**
 * 项目锁定文件
 *
 * @category Project
 */
export const ProjectLockFileSchema = z.object({
  /**
   * 项目锁定文件 JSON Schema
   *
   * @default LOCKFILE_SCHEMA_URL
   */
  $schema: TrimmedURLString.default(LOCKFILE_SCHEMA_URL).meta({
    title: 'Schema',
    description:
      'URL of the JSON Schema used to validate this project lock file. Editors and tooling use it for autocomplete and validation.',
    examples: [LOCKFILE_SCHEMA_URL],
  }),

  /**
   * 已添加的注册项目列表
   */
  items: z.array(ProjectAddedItemSchema).meta({
    title: 'Items',
    description:
      'The registry items currently installed in the project. Used to track provenance and installed file locations across updates.',
    examples: [{
      registry: 'weme-ui/slim',
      prefix: 'weme',
      files: [{
        source: 'button/button.vue',
        dest: 'src/components/ui/button/button.vue',
      }],
    }],
  }),
}).meta({
  title: 'Project lock file',
  description:
    'Records which registry items have been installed into a Weme UI project, including their source registry and the exact files written on disk.',
  examples: [{
    $schema: LOCKFILE_SCHEMA_URL,
    items: [{
      registry: 'weme-ui/slim',
      prefix: 'weme',
      files: [{
        source: 'button/button.vue',
        dest: 'src/components/ui/button/button.vue',
      }],
    }],
  }],
})
