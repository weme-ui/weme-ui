import { z } from 'zod'

const registryItemFileSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.enum(['file']),
    path: z.string(),
    content: z.string().optional(),
    target: z.string(),
  }),
  z.object({
    type: z.enum(['component', 'composable', 'plugin', 'util', 'style', 'type']),
    path: z.string(),
    content: z.string().optional(),
    target: z.string().optional(),
  }),
])

const registryItemSchema = z.object({
  name: z.string(),
  type: z.enum(['component', 'layout', 'theme', 'block', 'page']),
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  files: z.array(registryItemFileSchema),
  cssVars: z.record(z.string(), z.string()).optional(),
  meta: z.record(z.string(), z.string()).optional(),
  docs: z.string().optional(),
  categories: z.array(z.string()).optional(),
})

/**
 * Registry Config Schema
 *
 * @see {@link https://github.com/weme-ui/weme-ui/blob/main/schema/registry.json}
 */
export const registrySchema = z.object({
  name: z.string(),
  items: z.array(registryItemSchema),
  description: z.string().optional(),
  version: z.string().optional(),
  prefix: z.string().optional(),
  access: z.enum(['public']).optional(),
  meta: z.object({
    authors: z.array(z.string()).optional(),
    homepage: z.url().optional(),
    repository: z.url().optional(),
    bugs: z.url().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  dependencies: z.array(z.string()).optional(),
  devDependencies: z.array(z.string()).optional(),
})

export type RegistrySchema = z.infer<typeof registrySchema>
export type RegistryItemSchema = z.infer<typeof registryItemSchema>
export type RegistryItemFileSchema = z.infer<typeof registryItemFileSchema>
