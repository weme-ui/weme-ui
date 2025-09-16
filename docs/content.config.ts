import type { DefinedCollection } from '@nuxt/content'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { useNuxt } from '@nuxt/kit'
import { joinURL } from 'ufo'

const { options } = useNuxt()
const cwd = joinURL(options.rootDir, 'content')

const docsLinkItem = z.object({
  to: z.string().optional(),
  icon: z.string().optional(),
  label: z.string().optional(),
  description: z.string().optional(),
  redirect: z.string().optional(),
  rel: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
})

function createDocsSchema() {
  return z.object({
    icon: z.string().optional(),
    redirect: z.string().optional(),
    navs: z.array(docsLinkItem).optional(),
    links: z.array(docsLinkItem).optional(),

    badge: z.object({
      icon: z.string().optional(),
      label: z.string().optional(),
    }),

    theme: z.object({
      sidebar: z.object({
        enabled: z.boolean().optional(),
        splitNav: z.boolean().optional(),
      }).optional(),
      footer: z.boolean().optional(),
      outline: z.boolean().optional(),
      fillContainer: z.boolean().optional(),
      custom: z.boolean().optional(),
    }),
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
