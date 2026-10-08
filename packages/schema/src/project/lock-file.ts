import * as v from 'valibot'
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
export const ProjectAddedItemFileSchema = v.pipe(
  v.object({
    /**
     * 注册项文件源路径
     */
    source: v.pipe(
      RegistryItemFileSchema.entries.path,
      v.metadata({
        title: '源路径',
        description: '文件在 registry 包内的原始路径，相对于 registry 根目录。',
        examples: ['button/button.vue', 'use-toggle/index.ts'],
      }),
    ),

    /**
     * 注册项文件目标路径
     */
    dest: v.pipe(
      NonEmptyTrimmedString,
      v.metadata({
        title: '目标路径',
        description: '安装该 item 时文件在项目中写入的路径。',
        examples: ['src/components/ui/button/button.vue', 'src/composables/use-toggle/index.ts'],
      }),
    ),
  }),
  v.metadata({
    title: '已安装文件',
    description: '锁定文件中记录的单个文件：来自 registry 的源路径，以及写入项目的目标路径。',
    examples: [{
      source: 'button/button.vue',
      dest: 'src/components/ui/button/button.vue',
    }],
  }),
)

/**
 * 已添加的注册项目
 *
 * @category Project
 */
export const ProjectAddedItemSchema = v.pipe(
  v.object({
    /**
     * 已添加的注册中心名称
     */
    registry: v.pipe(
      ProjectRegisteredItemSchema.entries.registry,
      v.metadata({
        title: 'Registry',
        description: '该已安装 item 来源的 registry，形式为 "owner/registry"。',
        examples: ['weme-ui/core', 'weme-ui/slim'],
      }),
    ),

    /**
     * 注册中心仓库地址
     */
    repo: v.pipe(
      ProjectRegisteredItemSchema.entries.repo,
      v.metadata({
        title: '仓库',
        description: '安装该 item 时解析所得的 registry 源仓库。',
        examples: ['https://github.com/weme-ui/weme-ui'],
      }),
    ),

    /**
     * 注册项目安装前缀，用于区分不同注册项目
     */
    prefix: v.pipe(
      ProjectRegisteredItemSchema.entries.prefix,
      v.metadata({
        title: '前缀',
        description: '安装该 item 时应用的前缀，用于在同一项目存在多个 registry 时隔离文件命名空间。',
        examples: ['weme'],
      }),
    ),

    /**
     * 已添加的注册项目文件列表
     */
    files: v.pipe(
      v.array(ProjectAddedItemFileSchema),
      v.metadata({
        title: '文件',
        description: '为该 item 写入项目的文件列表，每项含 registry 源路径与项目目标路径。',
        examples: [{
          source: 'button/button.vue',
          dest: 'src/components/ui/button/button.vue',
        }],
      }),
    ),
  }),
  v.metadata({
    title: '已安装 item',
    description: '已安装进项目的 registry item。记录来源 registry 以及实际写入的文件。',
    examples: [{
      registry: 'weme-ui/slim',
      repo: 'https://github.com/weme-ui/weme-ui',
      prefix: 'weme',
      files: [{
        source: 'button/button.vue',
        dest: 'src/components/ui/button/button.vue',
      }],
    }],
  }),
)

/**
 * 项目锁定文件
 *
 * @category Project
 */
export const ProjectLockFileSchema = v.pipe(
  v.object({
    /**
     * 项目锁定文件 JSON Schema
     *
     * @default LOCKFILE_SCHEMA_URL
     */
    $schema: v.optional(
      v.pipe(
        TrimmedURLString,
        v.metadata({
          title: 'Schema',
          description: '用于校验该项目锁定文件的 JSON Schema URL。编辑器与工具链据此提供补全与校验。',
          examples: [LOCKFILE_SCHEMA_URL],
        }),
      ),
      LOCKFILE_SCHEMA_URL,
    ),

    /**
     * 已添加的注册项目列表
     */
    items: v.pipe(
      v.array(ProjectAddedItemSchema),
      v.metadata({
        title: 'Items',
        description: '当前已安装进项目的 registry items。用于在更新时追踪来源与已安装文件位置。',
        examples: [{
          registry: 'weme-ui/slim',
          prefix: 'weme',
          files: [{
            source: 'button/button.vue',
            dest: 'src/components/ui/button/button.vue',
          }],
        }],
      }),
    ),
  }),
  v.metadata({
    title: '项目锁定文件',
    description: '记录已安装进 Weme UI 项目的 registry items，包括来源 registry 以及磁盘上写入的具体文件。',
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
  }),
)
