import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const Link = z.object({
  label: z.string(),
  icon: z.string().optional(),
  description: z.string().optional(),
  to: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
  rel: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: [{
        include: 'docs/**/*',
      }],
      schema: z.object({
        icon: z.string().optional(),
        badge: z.string().optional(),
        links: z.array(Link).optional(),
        registry: z.enum(['std']).optional(),
        navigation: z.object({
          title: z.string().optional(),
        }),
      }),
    }),
  },
})
