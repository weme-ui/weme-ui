import type { RegistryItemFileSchema, RegistryItemSchema, RegistrySchema } from '~/schemas/registry'
import { exit } from 'node:process'
import createDebugger from 'debug'
import { resolve } from 'pathe'
import { kebabCase, titleCase } from 'scule'
import { registrySchema } from '~/schemas/registry'
import { consola } from '~/utils/consola'
import { writeFile } from '~/utils/file'
import { existsComponent, existsRegistry } from '~/utils/repository'
import { compile, renderTemplates } from '~/utils/template'
import { loadJson } from '~/utils/utilities'
import { normalizeOptions } from './options'

const debug = createDebugger('init:component')

export async function initializeComponent(args: Record<string, any>) {
  debug('Args:', args)

  const [registry, name] = args.name.split('/')

  args.name = name ? kebabCase(name) : undefined
  args.registry = kebabCase(registry)

  const data = await resolveData(args)

  debug('Resolved args:', data)

  await initialized(data)
}

async function resolveData(args: Record<string, any>) {
  const options = await normalizeOptions(args)
  const isExistsRegistry = existsRegistry(args.registry, options.cwd)

  if (!isExistsRegistry) {
    consola.error(`Registry \`${args.registry}\` not found.`)
    exit(0)
  }

  else if (isExistsRegistry && !options.name) {
    options.name = await consola.prompt('What is the name of the component?', {
      type: 'text',
      cancel: 'undefined',
    })

    if (!options.name)
      exit(0)
  }

  else if (!options.force && existsComponent(options.registry, options.name, options.cwd)) {
    consola.error(`Component \`${options.name}\` already exists.`)
    consola.info('Try `pnpm dlx @weme-ui/weme-ui init --help` for more information.')

    exit(0)
  }

  if (options.name.includes('-')) {
    const parentName = options.name.split('-').shift()

    if (existsComponent(options.registry, parentName, options.cwd)) {
      const inside = await consola.prompt(
        `Component \`${parentName}\` already exists. Do you want to create the component inside it?`,
        {
          type: 'confirm',
          initial: false,
          cancel: 'undefined',
        },
      )

      if (inside === undefined)
        exit(0)

      if (inside) {
        options.parent = parentName
        options.inside = inside
      }
    }
  }

  if (!options.inside) {
    options.category = await consola.prompt('What is the category of the component?', {
      type: 'select',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Layout', value: 'layout' },
        { label: 'Data', value: 'data' },
        { label: 'Form', value: 'form' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Feedback', value: 'feedback' },
        { label: 'Other', value: 'other' },
        { label: 'Custom', value: 'custom' },
      ],
      cancel: 'undefined',
    })

    if (options.category === 'custom') {
      options.category = await consola.prompt('What is the name of the category?', {
        type: 'text',
        cancel: 'undefined',
      })
    }

    if (options.category === undefined)
      exit(0)
  }

  return options
}

async function initialized(data: Record<string, any>) {
  consola.start('Initializing component')

  const src = resolve(data.template, 'component')
  const dest = resolve(data.cwd, 'registry', data.registry, 'components', data.inside ? data.parent : data.name)

  const templates = [
    '{{ name }}.props.ts.hbs',
    '{{ name }}.style.ts.hbs',
    '{{ name }}.vue.hbs',
  ].reduce((acc, tpl) => {
    acc.push({
      src: tpl,
      dest: tpl.replace('.hbs', ''),
    })
    return acc
  }, [] as { src: string, dest: string }[])

  await renderTemplates({ src, dest, templates, data })
  await updateRegistryJson(data, templates)

  debug('Templates:', templates)

  if (!data.force && await consola.prompt('Do you want to create a test for the component?', {
    type: 'confirm',
    initial: false,
  })) {
    const tests = [
      '{{ name }}.test.ts.hbs',
    ].reduce((acc, tpl) => {
      acc.push({
        src: tpl,
        dest: tpl.replace('.hbs', ''),
      })
      return acc
    }, [] as { src: string, dest: string }[])

    await renderTemplates({ src, dest, templates: tests, data })

    debug('Tests:', tests)

    console.log('')
  }

  if (!data.force && await consola.prompt('Do you want to create a documentation for the component?', {
    type: 'confirm',
    initial: false,
  })) {
    const docs = [
      '{{ name }}.md.hbs',
    ].reduce((acc, tpl) => {
      acc.push({
        src: tpl,
        dest: tpl.replace('.hbs', ''),
      })
      return acc
    }, [] as { src: string, dest: string }[])

    await renderTemplates({
      src,
      data,
      templates: docs,
      dest: resolve(data.cwd, 'docs', 'content', data.registry, 'components', data.category),
    })

    debug('Docs:', docs)
  }

  console.log('')
  consola.success('Component initialized!')
}

async function updateRegistryJson(
  data: Record<string, any>,
  templates: { src: string, dest: string }[],
) {
  consola.start('Updating `registry.json`')

  const registryJson = loadJson<RegistrySchema>(
    'registry.json',
    resolve(data.cwd, 'registry', data.registry),
  )

  const resolvedName = data.inside ? data.parent : data.name

  const registryItems: RegistryItemSchema[] = registryJson?.items || []
  const registryItem: RegistryItemSchema = registryItems.find(item => item.name === resolvedName) || {
    name: resolvedName,
    type: 'component',
    title: titleCase(resolvedName),
    description: `The ${resolvedName} component.`,
    author: data.author,
    categories: [data.category],
    files: [],
  }

  templates.forEach((tpl) => {
    const file = {
      path: compile(`components/${resolvedName}/${tpl.dest}`, data),
      type: tpl.dest.endsWith('.vue')
        ? 'component'
        : tpl.dest.endsWith('.props.ts')
          ? 'type'
          : 'style',
    } satisfies RegistryItemFileSchema

    if (registryItem.files.find(f => f.path === file.path) === undefined)
      registryItem.files.push(file)
  })

  if (registryItems.length === 0)
    registryItems.push(registryItem)

  const result = registrySchema.safeParse(registryJson)

  if (!result.success) {
    consola.error(result.error.message)
    exit(1)
  }

  await writeFile(
    resolve(data.cwd, 'registry', data.registry, 'registry.json'),
    JSON.stringify(registryJson, null, 2),
    { flag: 'w', quiet: true },
  )

  consola.success('Updated `registry.json`!')
}
