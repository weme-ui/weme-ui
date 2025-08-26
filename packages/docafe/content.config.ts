import type { DefinedCollection } from '@nuxt/content'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { useNuxt } from '@nuxt/kit'
import { joinURL } from 'ufo'

const { options } = useNuxt()
const cwd = joinURL(options.rootDir, 'content')

const linkSchema = z.object({
  label: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
  to: z.string().optional(),
  rel: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
})

function createDocsSchema() {
  return z.object({
    header: z.object({
      bordered: z.boolean().optional(),
    }).optional(),

    sidebar: z.object({
      spiltLevel: z.boolean().default(false).optional(),
      bordered: z.boolean().optional(),
      badge: z.object({
        icon: z.string().optional(),
        label: z.string().optional(),
      }).optional(),
    }).optional(),

    outline: z.object({
      enable: z.boolean().default(true).optional(),
      links: z.array(linkSchema).optional(),
    }).optional(),

    footer: z.object({
      enable: z.boolean().default(true).optional(),
      bordered: z.boolean().optional(),
    }).optional(),

    nav: z.array(
      z.object({
        label: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        to: z.string().optional(),
        rel: z.string().optional(),
        target: z.enum(['_blank', '_self']).optional(),
        children: z.array(linkSchema).optional(),
      }),
    ).optional(),

    links: z.array(linkSchema).optional(),

    // Use custom page, like `Landing Page`, `Blog` etc.
    theme: z.object({
      bordered: z.boolean().optional(),
      fillContainer: z.boolean().optional(),
      custom: z.boolean().optional(),
    }).optional(),
  })
}

const collections: Record<string, DefinedCollection> = {
  docs: defineCollection({
    type: 'page',
    source: {
      cwd,
      include: '**',
    },
    schema: createDocsSchema(),
  }),
}

export default defineContentConfig({
  collections,
})
