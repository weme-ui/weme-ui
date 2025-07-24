import { readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { defineCommand } from 'citty'
import { consola } from 'consola'
import { kebabCase, titleCase } from 'scule'
import { generateTemplates } from './template.mjs'

const registries = readdirSync(resolve('./registry'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

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
      default: 'web',
    },
    name: {
      type: 'positional',
      required: true,
      description: 'Name of the theme.',
    },
  },
  async setup({ args }) {
    const name = kebabCase(args.name)
    const registry = kebabCase(args.registry)

    const themeId = await consola.prompt('Confirm your theme ID.', {
      type: 'text',
      initial: kebabCase(name),
    })

    const themeName = await consola.prompt('Confirm your theme name.', {
      type: 'text',
      initial: titleCase(name),
    })

    const themeAppearance = await consola.prompt('Confirm your theme appearance.', {
      type: 'select',
      options: [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
      ],
      initial: 0,
    })

    const themeTranslucent = await consola.prompt('Use translucent mode by default.', {
      type: 'confirm',
      initial: true,
    })

    const themeRadius = await consola.prompt('Confirm your theme radius.', {
      type: 'text',
      initial: '0.25rem',
    })

    const dest = resolve(join(`registry/${registry}`, 'themes'))

    await generateTemplates(name, registry, dest, {
      themeId,
      themeName,
      themeAppearance,
      themeTranslucent,
      themeRadius,
    })
  },
})
