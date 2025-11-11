import { z } from 'zod'
import { nestedCssVars } from './shared'

export const registryAccess = z.enum(['public', 'private'])
export const registryItemType = z.enum(['component', 'layout', 'theme', 'block', 'page', 'init'])
export const registryItemFileType = z.enum(['component', 'composable', 'plugin', 'util', 'style', 'type', 'file'])

export const registryItemFile = z.discriminatedUnion('type', [
  z.object({
    type: z.enum(['file']),
    path: z.string().trim(),
    target: z.string().trim(),
  }),
  z.object({
    type: registryItemFileType.exclude(['file']),
    path: z.string().trim(),
    target: z.string().trim().optional(),
  }),
])

export const registryItem = z.object({
  /**
   * Name of the item.
   */
  name: z.string().trim(),

  /**
   * Type of the item.
   *
   * - component
   * - layout
   * - theme
   * - block
   * - page
   * - init
   */
  type: registryItemType,

  /**
   * Title of the item.
   */
  title: z.string().trim().optional(),

  /**
   * Description of the item.
   */
  description: z.string().trim().optional(),

  /**
   * Dependencies of the item.
   */
  dependencies: z.array(z.string().trim()).optional(),

  /**
   * Dev dependencies of the item.
   */
  devDependencies: z.array(z.string().trim()).optional(),

  /**
   * Registry dependencies of the item.
   */
  registryDependencies: z.array(z.string().trim()).optional(),

  /**
   * Files of the item.
   */
  files: z.array(registryItemFile),

  /**
   * CSS variables of the item.
   */
  cssVars: nestedCssVars.optional(),
})

export const registrySchema = z.object({
  /**
   * Schema URL.
   */
  $schema: z.url().trim(),

  /**
   * ID of the registry.s
   */
  id: z.string().trim(),

  /**
   * Name of the registry.
   */
  name: z.string().trim(),

  /**
   * Description of the registry.
   */
  description: z.string().trim().optional(),

  /**
   * Version of the registry.
   */
  version: z.string().trim().optional(),

  /**
   * Default prefix for added items of the registry.
   */
  prefix: z.string().trim().default('ui').optional(),

  /**
   * Access level of the registry.
   *
   * @default 'public'
   */
  access: registryAccess.default('public').optional(),

  /**
   * Metadata of the registry.
   *
   * - authors: Array of authors
   * - homepage: Homepage of the registry
   * - repository: Repository URL of the registry
   * - bugs: Bugs page of the registry
   * - tags: Array of tags
   */
  meta: z.object({
    authors: z.array(z.string().trim()),
    homepage: z.url().trim(),
    repository: z.url().trim(),
    bugs: z.url().trim(),
    tags: z.array(z.string().trim()),
  }).partial().optional(),

  /**
   * Items in the registry.
   */
  items: z.array(registryItem),
})

export type RegistrySchema = z.infer<typeof registrySchema>
export type RegistryItem = z.infer<typeof registryItem>
export type RegistryItemFile = z.infer<typeof registryItemFile>
export type RegistryAccess = z.infer<typeof registryAccess>
export type RegistryItemType = z.infer<typeof registryItemType>
export type RegistryItemFileType = z.infer<typeof registryItemFileType>
