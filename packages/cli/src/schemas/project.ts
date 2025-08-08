import { z } from 'zod'

/**
 * Project Config Schema
 *
 * @see {@link https://github.com/weme-ui/weme-ui/blob/main/schema/project.json}
 */
export const projectSchema = z.object({
  provider: z.string().optional(),
  repos: z.array(z.string()).optional(),

  prefix: z.record(z.string(), z.string()).optional(),

  paths: z.object({
    components: z.string(),
    composables: z.string().optional(),
    layouts: z.string().optional(),
    themes: z.string().optional(),
    plugins: z.string().optional(),
    utils: z.string().optional(),
    types: z.string().optional(),
  }).catchall(z.string()),

  unocss: z.object({
    prefix: z.string().optional(),
    reset: z.boolean().optional(),
    accentColors: z.record(z.string(), z.string()).optional(),
    neutralColors: z.record(z.string(), z.string()).optional(),
    background: z.object({
      light: z.string().optional(),
      dark: z.string().optional(),
    }).optional(),
  }).optional(),
})

export type ProjectSchema = z.infer<typeof projectSchema>
