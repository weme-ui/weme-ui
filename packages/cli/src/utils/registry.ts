import type { HashableContent, Prettify, RegistryConfig, RegistryItem, RegistryItemFile } from '../types'
import { RegistryConfigSchema } from '@weme-ui/schema'
import { hash } from 'hasha'
import * as v from 'valibot'
import { DEFAULT_REGISTRY_BRANCH } from '../constants'
import { fetchJSON, fetchURL } from './fetcher'

interface RegistryMetadata {
  name: RegistryConfig['name']
  description: RegistryConfig['description']
  version: RegistryConfig['version']
  homepage: RegistryConfig['homepage']
  repository: RegistryConfig['repository']
  issues: RegistryConfig['issues']
  contributors: RegistryConfig['contributors']
  access: RegistryConfig['access']
}

type ResolvedRegistryItemFile = Prettify<RegistryItemFile & HashableContent>

interface RegistryCache {
  config: RegistryConfig
  index: ReadonlyMap<string, RegistryItem>
}

class Registry {
  /**
   * The name of the registry.
   */
  private name: string
  /**
   * The branch of the registry.
   */
  private branch: string
  /**
   * The cache of the registry.
   */
  private cache: Promise<RegistryCache> | null = null

  constructor(name: string, branch: string) {
    this.name = name
    this.branch = branch
  }

  /**
   * Get the registry metadata.
   *
   * @returns The registry metadata.
   */
  async metadata(): Promise<RegistryMetadata> {
    const { config } = await this.load()

    return {
      name: config.name,
      description: config.description,
      version: config.version,
      homepage: config.homepage,
      repository: config.repository,
      issues: config.issues,
      contributors: config.contributors,
      access: config.access,
    }
  }

  /**
   * Get the registry dependencies.
   *
   * @returns The registry dependencies.
   */
  async dependencies(): Promise<string[]> {
    return (await this.load()).config.dependencies ?? []
  }

  /**
   * Get the registry dev dependencies.
   *
   * @returns The registry dev dependencies.
   */
  async devDependencies(): Promise<string[]> {
    return (await this.load()).config.devDependencies ?? []
  }

  /**
   * Find the items in the registry.
   *
   * @param filter - The filter function.
   * @returns The items that match the filter.
   */
  async getItems(filter?: (item: RegistryItem) => boolean): Promise<RegistryItem[]> {
    const { config, index } = await this.load()

    const items = filter ? config.items.filter(filter) : config.items
    const visited = new Set<string>()
    const result: RegistryItem[] = []

    const visit = (item: RegistryItem) => {
      if (visited.has(item.name))
        return
      visited.add(item.name)

      for (const name of item.registryDependencies ?? []) {
        const dep = index.get(name)
        if (!dep) {
          continue
        }
        visit(dep)
      }
      result.push(item)
    }

    items.forEach(visit)
    return result
  }

  /**
   * Get the files of an item.
   *
   * @param item - The item to get the files from.
   * @returns The resolved files of the item.
   */
  async getItemFiles(item: RegistryItem): Promise<ResolvedRegistryItemFile[]> {
    return await Promise.all(item.files.map(
      async (file) => {
        const result = await this.getItemFileContent(file.path)

        return {
          type: file.type,
          kind: file.kind,
          path: file.path,
          target: file.target,
          content: result.content,
          hash: result.hash,
        }
      },
    ))
  }

  /**
   * Get the content of a file.
   *
   * @param source - The source of the file.
   * @returns The content of the file.
   */
  async getItemFileContent(source: string): Promise<HashableContent> {
    const url = this.joinURL(source)
    const content = await fetchURL(url)
    const hashStr = await hash(content)

    return {
      content,
      hash: hashStr,
    }
  }

  /**
   * Load the registry cache.
   *
   * @throws If the registry cache fails to load.
   * @returns The registry cache.
   */
  private async load(): Promise<RegistryCache> {
    this.cache ??= this.fetchRegistryJson().catch((err) => {
      this.cache = null
      throw err
    })
    return this.cache
  }

  /**
   * Fetch the registry JSON.
   *
   * @throws If the registry JSON fails to parse.
   * @returns The registry cache.
   */
  private async fetchRegistryJson(): Promise<RegistryCache> {
    const url = this.joinURL('registry.json')
    const raw = await fetchJSON<unknown>(url)
    const parsed = v.safeParse(RegistryConfigSchema, raw)

    if (!parsed.success) {
      throw new Error('Failed to parse registry config', { cause: parsed.issues })
    }

    const config = parsed.output
    const index = new Map<string, RegistryItem>()
    for (const item of config.items) {
      if (index.has(item.name)) {
        throw new Error(`Duplicate item name: ${item.name}`)
      }
      index.set(item.name, item)
    }

    return { config, index }
  }

  /**
   * Join the URL with the name and branch.
   *
   * @param path The path to join.
   * @returns The joined URL.
   */
  private joinURL(path: string): string {
    return `https://raw.githubusercontent.com/${this.name}/refs/heads/${this.branch}/${path}`
  }
}

/**
 * Use the registry.
 *
 * @param name The name of the registry.
 * @param branch The branch of the registry.
 * @returns The registry instance.
 */
export function useRegistry(name: string, branch: string = DEFAULT_REGISTRY_BRANCH): Registry {
  return new Registry(name, branch)
}
