import { defineCommand } from 'citty'
import { consola } from 'consola'
import { join } from 'pathe'
import { kebabCase, titleCase } from 'scule'
import { mkdirs } from '../../utils/file.mjs'
import { renderTemplates } from '../../utils/template.mjs'

export default defineCommand({
  meta: {
    name: 'package',
    description: 'Create a new Weme UI package.',
  },

  args: {
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the package.',
    },
    src: {
      type: 'string',
      description: 'Source path of the templates.',
      valueHint: 'path',
      default: './scripts/templates/package',
    },
    dest: {
      type: 'string',
      description: 'Destination path of the package.',
      valueHint: 'path',
      default: './packages',
    },
  },

  async setup({ args }) {
    const { name, src } = args
    const dest = join(args.dest, kebabCase(name))

    consola.start(`Generating package \`${titleCase(name)}\`...`)

    await renderTemplates(
      src,
      dest,
      [
        { tpl: 'package.json.hbs', dest: 'package.json' },
        { tpl: 'README.md.hbs', dest: 'README.md' },
      ],
      args,
    )

    mkdirs(join(dest, 'src'))

    consola.success(`\`${titleCase(name)}\` package generated!`)
  },
})
