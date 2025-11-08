import type { ProjectSchema, RegistryItem } from '@weme-ui/schema'
import fs from 'node:fs'
import { exit } from 'node:process'
import * as p from '@clack/prompts'
import { DEFAULT_REGISTRY_PREFIX } from '@weme-ui/schema'
import path from 'pathe'
import { loadProjectConfig, resolvePaths } from '../../../utils/schema/project'
import { fetchRegistryConfig } from '../../../utils/schema/registry'

export interface AddRegistryItemContext {
  project: ProjectSchema
  names: string[]
  repo: string
  registry: string
  prefix: string
  cwd: string
}

export async function createContext(args: Record<string, any>): Promise<AddRegistryItemContext> {
  const context: AddRegistryItemContext = {
    project: {} as ProjectSchema,
    names: [],
    repo: '',
    registry: '',
    prefix: '',
    cwd: path.resolve(args.cwd),
  }

  if (args.names)
    context.names = args.names.split(',')

  const project = loadProjectConfig(args.cwd)

  if (project.isErr()) {
    console.error(project.unwrapErr())
    return context
  }

  context.project = project.unwrap()

  const defaultRegistry = project.unwrap().repos.find(r => r.default)

  if (defaultRegistry) {
    context.repo = args.repo || defaultRegistry.repo
    context.registry = args.registry || defaultRegistry.registry
    context.prefix = defaultRegistry.prefix || DEFAULT_REGISTRY_PREFIX
  }
  else {
    const selectRegistry = await p.select({
      message: 'Choose a registry?',
      options: project.unwrap().repos.map(r => ({
        label: r.registry,
        value: r,
        hint: r.repo,
      })),
    })

    if (p.isCancel(selectRegistry)) {
      p.cancel('Operation cancelled.')
      exit(0)
    }

    context.registry = selectRegistry.registry
    context.repo = selectRegistry.repo
    context.prefix = selectRegistry.prefix || DEFAULT_REGISTRY_PREFIX
  }

  if (context.names.length === 0) {
    const remote = await fetchRegistryConfig(context.repo, context.registry)

    if (remote.isErr()) {
      console.error(remote.unwrapErr())
      return context
    }

    let options = await getOptionsByType(remote.unwrap().items)

    while (options.length === 0) {
      p.log.warn('No items found, please choose another type.')
      options = await getOptionsByType(remote.unwrap().items)
    }

    const selectItems = await p.multiselect({
      message: 'Choose registry items to add:',
      options,
      maxItems: 10,
    })

    if (p.isCancel(selectItems)) {
      p.cancel('Operation cancelled.')
      exit(0)
    }

    const paths = resolvePaths(context.cwd, context.project.paths).unwrap()

    // TODO: diff updates and merge them all.
    const updates = selectItems
      .filter((i) => {
        let _path = ''

        switch (i.type) {
          case 'component':
            _path = path.join(paths.components, context.prefix, i.name)
            break
          case 'layout':
            _path = path.join(paths.layouts, context.prefix, i.name)
            break
          case 'theme':
            _path = path.join(paths.themes, context.prefix, i.name)
            break
          case 'page':
            _path = path.join(paths.pages, i.name)
            break
        }

        return fs.existsSync(_path)
      })
      .map(i => i.name)

    context.names = selectItems
      .filter(i => !updates.includes(i.name))
      .map(i => i.name)
  }

  return context
}

async function getOptionsByType(
  items: RegistryItem[],
): Promise<{
  label: string
  value: RegistryItem
  hint: string
}[]> {
  const type = await p.select({
    message: 'Choose a type of registry items?',
    options: [
      { label: 'Component', value: 'component', hint: `${items.filter(i => i.type === 'component').length} items` },
      { label: 'Layout', value: 'layout', hint: `${items.filter(i => i.type === 'layout').length} items` },
      { label: 'Theme', value: 'theme', hint: `${items.filter(i => i.type === 'theme').length} items` },
      { label: 'Block', value: 'block', hint: `${items.filter(i => i.type === 'block').length} items` },
      { label: 'Page', value: 'page', hint: `${items.filter(i => i.type === 'page').length} items` },
    ],
  })

  if (p.isCancel(type)) {
    p.cancel('Operation cancelled.')
  }

  return items
    .filter(i => i.type === type)
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(i => ({
      label: `${i.title} ${i.type}`,
      value: i,
      hint: i.description || '',
    }))
}
