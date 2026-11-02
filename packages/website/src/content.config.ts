import { glob } from 'astro/loaders'
import { defineCollection } from 'astro:content'
import { docIdFromEntry } from './lib/preset-docs'

const docsDir = new URL('../../unocss-preset/docs/', import.meta.url)

export const collections = {
  presetDocs: defineCollection({
    loader: glob({
      pattern: '**/*.md',
      base: docsDir,
      generateId: ({ entry }) => docIdFromEntry(entry),
    }),
  }),
}
