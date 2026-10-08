import * as v from 'valibot'
import { MANIFEST_SCHEMA_URL } from '../constants'
import { NonEmptyTrimmedString, TrimmedURLString } from '../shared'
import { RegistryNameString } from './schema'

// ============================================================================
// Registry Manifest Schema
// ============================================================================

/**
 * 注册中心清单
 *
 * @category Registry
 */
export const RegistryManifestSchema = v.pipe(
  v.object({
    /**
     * 注册中心清单 JSON Schema
     *
     * @default MANIFEST_SCHEMA_URL
     */
    $schema: v.optional(
      v.pipe(
        TrimmedURLString,
        v.metadata({
          title: 'Schema',
          description: '用于校验该 registry manifest 的 JSON Schema URL。编辑器与工具链据此提供补全与校验。',
          examples: [MANIFEST_SCHEMA_URL],
        }),
      ),
      MANIFEST_SCHEMA_URL,
    ),

    /**
     * 已注册的注册中心名称与目录路径的映射
     */
    registries: v.pipe(
      v.record(
        RegistryNameString,
        NonEmptyTrimmedString,
      ),
      v.metadata({
        title: 'Registries',
        description: '已注册 registry 名称到磁盘目录路径的映射。键为 "owner/registry" 形式；值为各 registry 根目录的相对或绝对路径。',
        examples: [{
          'weme-ui/core': 'registry/core',
          'weme-ui/slim': 'registry/slim',
        }],
      }),
    ),
  }),
  v.metadata({
    title: 'Registry manifest',
    description: '仓库或 workspace 中可用 registry 的索引。将每个 registry 名称映射到包含其配置与 items 的目录。',
    examples: [{
      $schema: MANIFEST_SCHEMA_URL,
      registries: {
        'weme-ui/core': 'registry/core',
        'weme-ui/slim': 'registry/slim',
      },
    }],
  }),
)
