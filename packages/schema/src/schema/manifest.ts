import { z } from 'zod'

export const manifestSchema = z.strictObject({
  id: z.string().trim(),
  name: z.string().trim(),
  description: z.string().trim().optional(),
  version: z.string().trim().optional(),
  directory: z.string().trim(),
  prefix: z.string().trim().default('ui'),
  access: z.enum(['public', 'private']).default('public'),
  items: z.strictObject({
    components: z.number(),
    layouts: z.number(),
    themes: z.number(),
    blocks: z.number(),
    pages: z.number(),
  }),
  updated: z.string().trim(),
})

export type ManifestSchema = z.infer<typeof manifestSchema>
