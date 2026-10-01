import * as z from 'zod'
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
export const RegistryManifestSchema = z.object({
  /**
   * 注册中心清单 JSON Schema
   *
   * @default MANIFEST_SCHEMA_URL
   */
  $schema: TrimmedURLString
    .default(MANIFEST_SCHEMA_URL)
    .meta({
      title: 'Schema',
      description:
      'URL of the JSON Schema used to validate this registry manifest. Editors and tooling use it for autocomplete and validation.',
      examples: [MANIFEST_SCHEMA_URL],
    }),

  /**
   * 已注册的注册中心名称与目录路径的映射
   */
  registries: z.record(
    RegistryNameString,
    NonEmptyTrimmedString,
  ).meta({
    title: 'Registries',
    description:
      'A map of registered registry names to their directory paths on disk. Keys use the "owner/registry" form; values are relative or absolute paths to each registry root.',
    examples: [{
      'weme-ui/core': 'registry/core',
      'weme-ui/slim': 'registry/slim',
    }],
  }),
})
  .meta({
    title: 'Registry manifest',
    description:
      'An index of registries available in a repository or workspace. Maps each registry name to the directory that contains its configuration and items.',
    examples: [{
      $schema: MANIFEST_SCHEMA_URL,
      registries: {
        'weme-ui/core': 'registry/core',
        'weme-ui/slim': 'registry/slim',
      },
    }],
  })
