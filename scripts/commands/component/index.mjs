import { existsSync, readdirSync } from 'node:fs'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { join, resolve } from 'pathe'
import { kebabCase, titleCase } from 'scule'
import { readJsonFile } from '../../utils/file.mjs'
import { renderTemplates } from '../../utils/template.mjs'
import { generateDocument } from './document.mjs'
import { generatePlayground } from './playground.mjs'
import { updateRegistry } from './registry.mjs'

const registries = readdirSync(resolve('./registry'), { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => dir.name)

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
      default: registries ? registries[0] : '',
    },
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the component.',
    },
    src: {
      type: 'string',
      description: 'Source path of the templates.',
      valueHint: 'path',
      default: './scripts/templates/component',
    },
  },

  async setup({ args }) {
    const { name, registry, src } = args

    const dest = resolve('registry', kebabCase(registry), 'components')
    const registryJSON = readJsonFile(resolve('registry', kebabCase(registry), 'registry.json'))
    const categories = registryJSON.categories.map(c => ({ name: c, value: titleCase(c) }))

    args.category = await consola.prompt(
      'What is the category of the component?',
      {
        type: 'select',
        options: categories,
        cancel: 'undefined',
        initial: 0,
      },
    )

    let registryDest = join(dest, kebabCase(name))

    if (name.includes('-')) {
      const parentName = name.split('-').shift()
      const parentPath = join(dest, parentName)

      if (existsSync(parentPath)) {
        const inside = await consola.prompt(
          `Component \`${parentName}\` already exists. Do you want to create the component inside it?`,
          {
            type: 'confirm',
            initial: false,
          },
        )

        if (inside)
          registryDest = parentPath

        args.inside = inside
      }
    }

    if (!args.category) {
      // eslint-disable-next-line node/prefer-global/process
      process.exit(1)
    }

    // Generate component -> registry/{registry}/components
    consola.start(`Generating \`${titleCase(registry)}\` component \`${titleCase(name)}\`...`)

    await renderTemplates(
      src,
      registryDest,
      [
        { tpl: 'vue.hbs', dest: '{{ kebabCase name }}.vue' },
        { tpl: 'props.ts.hbs', dest: '{{ kebabCase name }}.props.ts' },
        { tpl: 'style.ts.hbs', dest: '{{ kebabCase name }}.style.ts' },
      ],
      args,
    )

    consola.success(`\`${titleCase(name)}\` component generated!`)

    // Generate playground -> registry/{registry}/.playground/app/pages/components
    await generatePlayground(
      src,
      resolve('registry', kebabCase(registry), '.playground', 'app', 'pages', 'components'),
      [
        { tpl: 'playground.vue.hbs', dest: '{{ kebabCase name }}.vue' },
      ],
      args,
    )

    // Generate document -> docs/content/docs/{registry}/components
    await generateDocument(
      src,
      resolve('docs', 'content', 'docs', kebabCase(registry), 'components'),
      [
        { tpl: 'doc.hbs', dest: '{{ kebabCase name }}.md' },
      ],
      args,
    )

    // Update registry -> registry/{registry}/registry.json
    await updateRegistry(args)
  },
})
