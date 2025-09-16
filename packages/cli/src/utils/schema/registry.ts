import type { Registry } from '@weme-ui/schema'
import { existsSync } from 'node:fs'
import { exit } from 'node:process'
import { registrySchema } from '@weme-ui/schema'
import createDebugger from 'debug'
import { resolve } from 'pathe'
import { REGISTRY_SCHEMA } from '../../constants'
import { consola } from '../consola'
import { fs } from '../fs'

const registries: Record<string, Registry> = {}
const debug = createDebugger('registry')

export async function listRegistries(cwd: string): Promise<string[]> {
  const { default: fg } = await import('fast-glob')

  const info = await fg(['registry/*'], {
    onlyDirectories: true,
    dot: false,
    cwd: resolve(cwd),
  }).then((registries) => {
    return registries.map((registry) => {
      const name = registry.replace('registry/', '')

      if (existsRegistryConfig(name, cwd)) {
        return name
      }

      return false
    }).filter(r => !!r)
  })

  return info as string[]
}

export function loadRegistryConfig(registry: string, cwd: string = '') {
  const registryConfigFile = resolveRegistryConfigPath(registry, cwd)

  debug('load', registry, registryConfigFile)

  if (!registries[registry] && existsRegistryConfig(registry, cwd)) {
    const content = fs.readJson<Registry>(registryConfigFile, cwd) || null

    if (content) {
      if (Object.keys(content).includes('$schema')) {
        delete (content as any).$schema
      }

      const result = registrySchema.safeParse(content)

      if (result.success) {
        registries[registry] = result.data
      }
    }
  }

  return registries[registry] || null
}

export function getRegistryInfo(registry: string, cwd: string = '') {
  const config = loadRegistryConfig(registry, cwd)

  return config
    ? {
        name: config.name,
        description: config.description,
        version: config.version,
        prefix: config.prefix,
        directory: config.directory,
        access: config.access,
        ...config.meta,
        dependencies: config.dependencies?.length,
        devDependencies: config.devDependencies?.length,
        items: config.items.length,
      }
    : null
}

export function getRegistryItem(
  registry: string,
  itemName: string,
  cwd: string = '',
) {
  return loadRegistryConfig(registry, cwd)?.items.find(item => item.name === itemName)
}

export function existsRegistryItem(
  registry: string,
  itemName: string,
  cwd: string = '',
) {
  return getRegistryItem(registry, itemName, cwd) !== undefined
}

export function existsRegistryItemFile(
  registry: string,
  itemName: string,
  filePath: string,
  cwd: string = '',
) {
  return getRegistryItem(registry, itemName, cwd)?.files.find(file => file.path === filePath) !== undefined
}

export function existsRegistryConfig(
  registry: string,
  cwd: string = '',
) {
  return existsSync(resolveRegistryConfigPath(registry, cwd))
}

export async function appendRegistryItem(
  registry: string,
  itemName: string,
  itemType: 'component' | 'layout' | 'theme' | 'block' | 'page',
  itemCategory: string,
  itemFiles: string[],
  cwd: string = '',
) {
  if (!existsRegistryItem(registry, itemName, cwd)) {
    registries[registry]!.items.push({
      name: itemName,
      type: itemType,
      title: itemName,
      description: `The ${itemName} component.`,
      categories: [itemCategory],
      files: [],
    })

    await appendRegistryItemFiles(registry, itemName, itemFiles, cwd)
  }
}

export async function appendRegistryItemFiles(
  registry: string,
  itemName: string,
  files: string[],
  cwd: string = '',
) {
  const item = getRegistryItem(registry, itemName, cwd)

  function getFileType(file: string) {
    if (file.endsWith('.vue'))
      return 'component'

    if (file.endsWith('.props.ts'))
      return 'type'

    return 'style'
  }

  if (item) {
    files.forEach((file) => {
      if (item.files.find(f => f.path === file) === undefined) {
        item.files.push({
          type: getFileType(file),
          path: file,
        })
      }
    })

    await updateRegistryConfig(registry, registries[registry], cwd)
  }
}

async function updateRegistryConfig(registry: string, registryConfig: Registry, cwd: string = '') {
  const result = registrySchema.safeParse(registryConfig)

  if (!result.success) {
    consola.error(result.error.message)
    exit(1)
  }

  const content = {
    $schema: REGISTRY_SCHEMA,
    ...result.data,
  }

  debug('update', registry, content)

  await fs.write({
    path: resolveRegistryConfigPath(registry, cwd),
    content: JSON.stringify(content, null, 2),
    cwd,
    force: true,
  })
}

function resolveRegistryConfigPath(registry: string, cwd: string = '') {
  return resolve(cwd, 'registry', registry, 'registry.json')
}
