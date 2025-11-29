import { z } from 'zod'
import { NestedCssVar } from './shared'

export const RegistryItemType = z.enum(['component', 'layout', 'theme', 'block', 'page', 'init'])
export const RegistryItemFileType = z.enum(['component', 'composable', 'plugin', 'util', 'style', 'type', 'file'])

export const RegistryItemFile = z.discriminatedUnion('type', [
  z.object({
    type: z.enum(['file']),
    path: z.string().trim(),
    target: z.string().trim(),
    hash: z.string().trim().default(''),
  }),

  z.object({
    type: RegistryItemFileType.exclude(['file']),
    path: z.string().trim(),
    target: z.string().trim().optional(),
    hash: z.string().trim().default(''),
  }),
])

export const RegistryItem = z.object({
  /**
   * Name of the item.
   */
  name: z.string().lowercase().trim(),

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
  type: RegistryItemType,

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
  files: z.array(RegistryItemFile),

  /**
   * CSS variables of the item.
   */
  cssVars: NestedCssVar.optional(),
})

export const RegistryName = z.templateLiteral([
  z.string().lowercase().trim(),
  '/',
  z.string().lowercase().trim(),
])

export const RegistrySchema = z.object({
  /**
   * Schema URL.
   */
  $schema: z.url().trim(),

  /**
   * Name of the registry.
   *
   * @example `<repo>/<scope>`: 'weme-ui/std'
   */
  name: RegistryName,

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
  prefix: z.string().lowercase().trim().default('ui').optional(),

  /**
   * Items in the registry.
   */
  items: z.array(RegistryItem),
})

export type IRegistry = z.infer<typeof RegistrySchema>
export type IRegistryName = z.infer<typeof RegistryName>
export type IRegistryItem = z.infer<typeof RegistryItem>
export type IRegistryItemType = z.infer<typeof RegistryItemType>
export type IRegistryItemFile = z.infer<typeof RegistryItemFile>
export type IRegistryItemFileType = z.infer<typeof RegistryItemFileType>
