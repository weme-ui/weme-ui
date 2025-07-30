import { readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineCommand } from 'citty'
import { kebabCase } from 'scule'
import { generateDocuments } from './document.mjs'
import { generateTemplates } from './template.mjs'

const registries = readdirSync(resolve('./registry'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

export default defineCommand({
  meta: {
    name: 'component',
    description: 'Create a new Weme UI component.',
  },
  args: {
    registry: {
      type: 'positional',
      description: 'Registry of the component.',
      valueHint: registries.join('|'),
      default: 'web',
    },
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the component.',
    },
  },
  async setup({ args }) {
    const name = kebabCase(args.name)
    const registry = kebabCase(args.registry)
    const dest = resolve(join(`registry/${registry}`, 'components'))
    const docs = resolve('docs/content/components')

    const templates = [
      'vue.hbs',
      'props.ts.hbs',
      'style.ts.hbs',
    ]

    await generateTemplates(name, registry, dest, templates)
    await generateDocuments(name, registry, docs)
  },
})
