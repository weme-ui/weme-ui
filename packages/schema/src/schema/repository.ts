import { z } from 'zod'
import { registryAccess } from './registry'

export const repositorySchema = z.strictObject({
  id: z.string().trim(),
  name: z.string().trim(),
  description: z.string().trim().optional(),
  version: z.string().trim().optional(),
  directory: z.string().trim(),
  prefix: z.string().trim().default('ui'),
  access: registryAccess.default('public'),
  items: z.strictObject({
    components: z.number(),
    layouts: z.number(),
    themes: z.number(),
    blocks: z.number(),
    pages: z.number(),
  }),
  updated: z.string().trim(),
})

export type RepositorySchema = z.infer<typeof repositorySchema>
