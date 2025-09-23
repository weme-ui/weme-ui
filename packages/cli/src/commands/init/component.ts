import { exit } from 'node:process'
import createDebugger from 'debug'
import { join, resolve } from 'pathe'
import {
  confirm,
  consola,
  selectPrompt,
  textPrompt,
} from '../../utils/consola'
import { fs } from '../../utils/fs'
import {
  appendRegistryItem,
  appendRegistryItemFiles,
  existsRegistryConfig,
  existsRegistryItem,
  existsRegistryItemFile,
  getRegistryInfo,
  getRegistryItem,
  listRegistries,
} from '../../utils/schema'

const debug = createDebugger('init:component')

export default async function (args: Record<string, any>) {
  const { name } = args

  args.name = name.toLowerCase()

  debug('Args:', args)

  if (name.includes('/')) {
    const [registry, component] = name.toLowerCase().split('/')

    args.registry = registry
    args.name = component
  }
  else {
    const registries = await listRegistries(args.cwd)

    if (registries.length === 0) {
      consola.error('No registry found.')
      consola.info('Try `pnpm dlx @weme-ui/weme-ui init --help` for more information.')
      exit(0)
    }

    args.registry = await selectPrompt(
      'What is the registry of the component?',
      registries,
    )
  }

  debug('Registry:', args.registry)

  if (!existsRegistryConfig(args.registry, args.cwd)) {
    consola.error(`Registry \`%s\` is not found.`, args.registry)
    consola.info('Try `pnpm dlx @weme-ui/weme-ui init --help` for more information.')
    exit(0)
  }

  args.meta = getRegistryInfo(args.registry, args.cwd)
  args.dest = resolve(args.cwd, args.meta.directory, 'components')

  debug('Meta:', args.meta)

  if (args.name.includes('-')) {
    const parentName = args.name.split('-').shift()

    if (existsRegistryItem(args.registry, parentName, args.cwd)) {
      await confirm(
        `Found closest component \`${parentName}\`. Do you want to create the component inside it?`,
        () => {
          args.parent = parentName
          args.inside = true
          args.category = getRegistryItem(args.registry, args.parent, args.cwd)?.categories?.[0] || ''
        },
      )

      if (
        args.parent
        && args.inside
        && existsRegistryItemFile(
          args.registry,
          args.parent,
          `components/${args.parent}/${args.name}.vue`,
          args.cwd,
        )
      ) {
        consola.error(`Component \`%s\` already exists.`, args.name)
        consola.info('Try `pnpm dlx @weme-ui/weme-ui init --help` for more information.')
        exit(0)
      }
    }
  }
  else {
    if (!args.force && existsRegistryItem(args.registry, args.name, args.cwd)) {
      consola.error(`Component \`%s\` already exists.`, args.name)
      consola.info('Try `pnpm dlx @weme-ui/weme-ui init --help` for more information.')
      exit(0)
    }
  }

  if (!args.inside) {
    const category = await selectPrompt(
      'What is the category of the component?',
      [
        { label: 'General', value: 'general' },
        { label: 'Layout', value: 'layout' },
        { label: 'Data Display', value: 'data-display' },
        { label: 'Form', value: 'form' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Feedback', value: 'feedback' },
        { label: 'Other', value: 'other' },
        { label: 'Custom', value: 'custom' },
      ],
    )

    args.dest = join(args.dest, args.name)
    args.category = category === 'custom'
      ? await textPrompt('What is the name of the category?')
      : category
  }
  else {
    args.dest = join(args.dest, args.parent)
  }

  debug('Dest:', args.dest)
  debug('Inside:', args.inside)
  debug('Category:', args.category)

  consola.log('')

  await createFiles(args)

  if (!args.force) {
    await confirm(
      'Do you want to create a documentation for the component?',
      () => createDocs(args),
    )
  }
  else {
    createDocs(args)
  }

  if (!args.force) {
    await confirm(
      'Do you want to create a test for the component?',
      () => createTests(),
    )
  }
  else {
    createTests()
  }
}

/**
 * Create component files.
 */
async function createFiles(args: Record<string, any>) {
  consola.start('Generating component files')

  const templates = await fs.writeTemplates([
    '{{ name }}.vue.hbs',
    '{{ name }}.props.ts.hbs',
    '{{ name }}.style.ts.hbs',
  ], args)

  const files = templates.map(
    t => join('components', args.inside ? args.parent : args.name, t.dest),
  )

  if (args.inside) {
    await appendRegistryItemFiles(
      args.registry,
      args.parent,
      files,
      args.cwd,
    )

    await appendComponentTypes(args.registry, args.parent, files, args.cwd)

    debug('Append Files:', args.parent, files)
  }
  else {
    await appendRegistryItem(
      args.registry,
      args.name,
      'component',
      args.category,
      files,
      args.cwd,
    )
    await appendComponentTypes(args.registry, args.name, files, args.cwd)

    debug('Append Item:', args.name, args.category, files)
  }

  consola.success('Component files generated!')
}

async function appendComponentTypes(registry: string, name: string, files: string[], cwd: string = '') {
  debug('Append types:', registry, name, files)

  const typeFile = join(cwd, 'registry', registry, 'types', 'components.ts')
  const types = files.filter(f => f.endsWith('.props.ts'))

  if (types.length > 0) {
    const componentTypes = (fs.read(typeFile) || '').split('\n')

    for (const type of types) {
      const importStatement = `export * from '~/${type.replace('.props.ts', '')}.props'`

      if (componentTypes.includes(importStatement))
        continue

      componentTypes.push(importStatement)
    }

    fs.write({
      path: typeFile,
      content: `${componentTypes.sort().filter(Boolean).join('\n')}\n`,
      cwd,
      force: true,
    })
  }
}

/**
 * Create component documentation.
 */
async function createDocs(args: Record<string, any>) {
  consola.start('Generating component documentation')

  await fs.writeTemplates([
    '{{ name }}.md.hbs',
  ], {
    ...args,
    dest: resolve(args.cwd, 'docs', 'content', 'docs', 'components', args.registry, args.category),
  })

  consola.success('Component documentation generated!')
}

/**
 * Create component tests.
 */
async function createTests() {
  consola.warn('`Create component tests`, Not implemented yet.')
}
