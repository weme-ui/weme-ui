import { z } from 'zod'
import { RegistryName } from './registry'

export const RepositoryRegistryStatistics = z.object({
  components: z.number().default(0),
  layouts: z.number().default(0),
  themes: z.number().default(0),
  blocks: z.number().default(0),
  pages: z.number().default(0),
})

export const RepositoryRegistryInfo = z.object({
  /**
   * Name of the registry.
   *
   * @example `<owner>/<scope>`: 'weme-ui/std'
   */
  name: RegistryName,

  /**
   * Description of the registry.
   */
  description: z.string().trim().optional(),

  /**
   * Default prefix for added items of the registry.
   */
  prefix: z.string().trim().default('ui').optional(),

  /**
   * Statistics of the registry
   */
  statistics: RepositoryRegistryStatistics,
})

export const RepositoryName = z.stringFormat(
  'repository-name',
  val => !val.includes('/'),
)

export const RepositorySchema = z.object({
  /**
   * Schema URL.
   */
  $schema: z.url().trim(),

  /**
   * Name of the repository.
   *
   * @example 'weme-ui'
   */
  name: RepositoryName.lowercase().trim(),

  /**
   * Owner of the repository.
   *
   * @example 'weme-ui'
   */
  owner: RepositoryName.lowercase().trim(),

  /**
   * Version of the repository.
   *
   * @example `1.0.0`
   */
  version: z.string().trim().optional(),

  /**
   * Registry information list of the repository.
   */
  registries: z.array(RepositoryRegistryInfo),

  /**
   * Last update of the repository.
   */
  updated: z.string().trim(),
})

export type IRepository = z.infer<typeof RepositorySchema>
export type IRepositoryName = z.infer<typeof RepositoryName>
export type IRepositoryRegistryInfo = z.infer<typeof RepositoryRegistryInfo>
export type IRepositoryRegistryStatistics = z.infer<typeof RepositoryRegistryStatistics>
