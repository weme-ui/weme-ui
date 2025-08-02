import { existsSync, readdirSync } from 'node:fs'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { join, resolve } from 'pathe'
import { camelCase, kebabCase, titleCase } from 'scule'
import { readFile, writeFile } from '../../utils/file.mjs'
import { compile, renderTemplates } from '../../utils/template.mjs'

const registries = readdirSync(resolve('./registry'), { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => dir.name)

const accentColors = ['tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'bronze', 'gold', 'brown', 'orange', 'amber', 'yellow', 'lime', 'mint', 'sky']
const neutralColors = ['gray', 'mauve', 'slate', 'sage', 'olive', 'sand']

export default defineCommand({
  meta: {
    name: 'theme',
    description: 'Create a new Weme UI theme.',
  },

  args: {
    registry: {
      type: 'positional',
      description: 'Registry of the theme.',
      valueHint: registries.join('|'),
      default: registries ? registries[0] : '',
    },
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the theme.',
    },
    src: {
      type: 'string',
      description: 'Source path of the theme.',
      valueHint: 'path',
      default: './scripts/templates/theme',
    },
    dest: {
      type: 'string',
      description: 'Destination path of the theme.',
      valueHint: 'path',
      default: './registry/{{ kebabCase registry }}/themes',
    },
  },

  async setup({ args }) {
    const { name, registry, src } = args

    if (!existsSync(resolve('./registry', kebabCase(registry)))) {
      consola.error(`Registry \`${registry}\` not found.`)
      return
    }

    if (existsSync(resolve('./registry', kebabCase(registry), 'themes', kebabCase(name)))) {
      consola.error(`Themes ${kebabCase(name)} already exists.`)
      return
    }

    if (!existsSync(resolve(src))) {
      consola.error(`Source path \`${src}\` not found.`)
      return
    }

    const dest = resolve(compile(args.dest, args))
    const answers = await showQuestions(name)

    const data = { ...args, ...answers }

    consola.start(`Generating \`${titleCase(registry)}\` theme \`${titleCase(name)}\`...`)

    await renderTemplates(
      src,
      dest,
      [
        { tpl: 'theme.ts.hbs', dest: '{{ kebabCase theme.id }}.ts' },
      ],
      data,
    )

    // Index
    const indexPath = join(dest, 'index.ts')

    await writeFile(
      indexPath,
      `export { default as ${camelCase(data.theme.id)}Theme } from './${kebabCase(data.theme.id)}.ts'\n`,
      { quiet: true, flag: 'a' },
    )

    const indexContent = readFile(indexPath)
    const sortedIndexContentLines = indexContent
      .trim()
      .split('\n')
      .filter(Boolean)
      .sort()

    await writeFile(
      indexPath,
      [...new Set(sortedIndexContentLines)].join('\n'),
      { quiet: true },
    )

    consola.success(`\`${titleCase(name)}\` theme generated!`)
  },
})

async function showQuestions(name) {
  const data = {
    theme: {
      id: '',
      name: '',
      appearance: '',
      translucent: false,
      radius: '',
      colors: {
        accent: 'indigo',
        neutral: 'gray',
        info: 'blue',
        success: 'green',
        warning: 'orange',
        error: 'red',
      },
    },
  }

  data.theme.id = await consola.prompt('Confirm your theme ID.', {
    type: 'text',
    initial: kebabCase(name),
  })

  data.theme.name = await consola.prompt('Confirm your theme name.', {
    type: 'text',
    initial: titleCase(name),
  })

  data.theme.appearance = await consola.prompt('Confirm your theme appearance.', {
    type: 'select',
    options: [
      { name: 'Light', value: 'light' },
      { name: 'Dark', value: 'dark' },
    ],
    initial: 0,
  })

  data.theme.translucent = await consola.prompt('Use translucent mode by default.', {
    type: 'confirm',
    initial: true,
  })

  data.theme.radius = await consola.prompt('Confirm your theme radius.', {
    type: 'text',
    initial: '0.25rem',
  })

  if (await consola.prompt('Do you want to use custom colors?', {
    type: 'confirm',
    initial: false,
  })) {
    data.theme.colors.accent = await consola.prompt('Confirm your theme accent color.', {
      type: 'select',
      options: accentColors,
      initial: 'tomato',
    })

    data.theme.colors.neutral = await consola.prompt('Confirm your theme neutral color.', {
      type: 'select',
      options: neutralColors,
      initial: 'gray',
    })

    data.theme.colors.info = await consola.prompt('Confirm your theme info color.', {
      type: 'select',
      options: ['blue', 'indigo', 'sky', 'cyan'],
      initial: 'blue',
    })

    data.theme.colors.success = await consola.prompt('Confirm your theme success color.', {
      type: 'select',
      options: ['green', 'grass', 'jade', 'teal', 'mint'],
      initial: 'green',
    })

    data.theme.colors.warning = await consola.prompt('Confirm your theme warning color.', {
      type: 'select',
      options: ['orange', 'amber', 'yellow', 'gold'],
      initial: 'orange',
    })

    data.theme.colors.error = await consola.prompt('Confirm your theme error color.', {
      type: 'select',
      options: ['red', 'ruby', 'crimson', 'tomato'],
      initial: 'red',
    })
  }

  return data
}
