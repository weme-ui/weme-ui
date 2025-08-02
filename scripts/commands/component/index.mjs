import { readdirSync } from 'node:fs'
import { defineCommand } from 'citty'
import { join, resolve } from 'pathe'
import { kebabCase } from 'scule'
import { generateComponent } from './component.mjs'
import { generateDocument } from './document.mjs'
import { generatePlayground } from './playground.mjs'

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
    const { registry, src } = args

    // Generate component -> registry/{registry}/components
    await generateComponent(
      src,
      resolve(join('registry', kebabCase(registry), 'components')),
      [
        { tpl: 'vue.hbs', dest: '{{ kebabCase name }}.vue' },
        { tpl: 'props.ts.hbs', dest: '{{ kebabCase name }}.props.ts' },
        { tpl: 'style.ts.hbs', dest: '{{ kebabCase name }}.style.ts' },
      ],
      args,
    )

    // Generate playground -> registry/{registry}/playground/pages
    await generatePlayground(
      src,
      resolve(join('registry', kebabCase(registry), 'playground', 'pages')),
      [
        { tpl: 'playground.vue.hbs', dest: '{{ kebabCase name }}.vue' },
      ],
      args,
    )

    // Generate document -> docs/content/docs/{registry}/components
    await generateDocument(
      src,
      resolve(join('docs', 'content', 'docs', kebabCase(registry), 'components')),
      [
        { tpl: 'doc.hbs', dest: '{{ kebabCase name }}.md' },
      ],
      args,
    )
  },
})
