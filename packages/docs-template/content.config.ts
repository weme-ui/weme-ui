import type { DefinedCollection } from '@nuxt/content'
import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { useNuxt } from '@nuxt/kit'
import { joinURL } from 'ufo'

const { options } = useNuxt()
const cwd = joinURL(options.rootDir, 'content')

function createDocSchema() {
  return z.object({
    badge: z.object({
      label: z.string().optional(),
      color: z.string().optional(),
    }).optional(),

    nav: z.array(z.object({
      label: z.string(),
      to: z.string().optional(),
      icon: z.string().optional(),
      rel: z.string().optional(),
      target: z.enum(['_blank', '_self']).optional(),
      description: z.string().optional(),
      children: z.array(z.object({
        label: z.string(),
        to: z.string(),
        icon: z.string().optional(),
        rel: z.string().optional(),
        target: z.enum(['_blank', '_self']).optional(),
      })).optional(),
    })).optional(),

    links: z.array(
      z.object({
        label: z.string(),
        icon: z.string().optional(),
        to: z.string().optional(),
        rel: z.string().optional(),
        target: z.enum(['_blank', '_self']).optional(),
      }),
    ).optional(),

    socials: z.array(
      z.object({
        icon: z.string(),
        alt: z.string().optional(),
        to: z.string().optional(),
        rel: z.string().optional(),
        target: z.enum(['_blank', '_self']).optional(),
      }),
    ).optional(),

    outline: z.boolean().default(true).optional(),
    footer: z.boolean().default(true).optional(),

    // Use custom page, like `Landing Page` etc.
    custom: z.boolean().default(false).optional(),
  })
}

const collections: Record<string, DefinedCollection> = {
  docs: defineCollection({
    type: 'page',
    source: {
      cwd,
      include: '**/*',
    },
    schema: createDocSchema(),
  }),
}

export default defineContentConfig({
  collections,
})
