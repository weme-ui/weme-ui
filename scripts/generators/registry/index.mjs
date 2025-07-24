import { resolve } from 'node:path'
import { defineCommand } from 'citty'
import { kebabCase } from 'scule'
import { generateTemplates } from './template.mjs'

export default defineCommand({
  meta: {
    name: 'registry',
    description: 'Create a new Weme UI registry.',
  },
  args: {
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the registry.',
    },
  },
  async setup({ args }) {
    const name = kebabCase(args.name)
    const dest = resolve('registry', name)

    const templates = [
      'package.json.hbs',
      'registry.json.hbs',
      'tsconfig.json.hbs',
      'utils/index.ts.hbs',
    ]

    await generateTemplates(name, dest, templates)
  },
})
