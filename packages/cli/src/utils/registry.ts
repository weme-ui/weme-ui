import type { RegistryConfig, RegistryItem } from '../types'
import { RegistryConfigSchema } from '@weme-ui/schema'
import * as v from 'valibot'
import { fetchJSON } from './fetcher'

class Registry {
  private name: string
  private schema: RegistryConfig | null

  constructor(name: string) {
    this.name = this.normalizeName(name)
    this.schema = null
  }

  /**
   * Get the registry config.
   *
   * @returns The registry config.
   * @throws If the registry config fails to parse.
   */
  async config(): Promise<RegistryConfig> {
    if (this.schema) {
      return this.schema
    }

    const registryUrl = `https://raw.githubusercontent.com/${this.name}/refs/heads/main/registry.json`
    const schema = await fetchJSON<RegistryConfig>(registryUrl)
    const parsed = v.safeParse(RegistryConfigSchema, schema)

    if (!parsed.success) {
      throw new Error('Failed to parse registry config')
    }

    this.schema = parsed.output
    return this.schema
  }

  /**
   * Get the root dependencies of the registry.
   *
   * @returns The root dependencies of the registry.
   */
  async rootDependencies(): Promise<string[]> {
    const config = await this.config()
    return config.dependencies ?? []
  }

  /**
   * Get the root dev dependencies of the registry.
   *
   * @returns The root dev dependencies of the registry.
   */
  async rootDevDependencies(): Promise<string[]> {
    const config = await this.config()
    return config.devDependencies ?? []
  }

  /**
   * Find the items in the registry.
   *
   * @param filterFn - The filter function.
   * @returns The items in the registry.
   */
  async findItems(filterFn?: (item: RegistryItem) => boolean): Promise<RegistryItem[]> {
    const config = await this.config()
    const index = new Map(config.items.map(i => [i.name, i]))

    const matched = filterFn ? config.items.filter(filterFn) : config.items
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

    matched.forEach(visit)

    return result.sort((a, b) => a.name.localeCompare(b.name))
  }

  /**
   * Find the dependency items in the registry.
   *
   * @param item - The item to find the dependency items for.
   * @param config - The config to use.
   * @param visited - The visited items.
   * @returns The dependency items.
   */
  async findDependencyItems(
    item: RegistryItem,
    config?: RegistryConfig,
    visited: Set<string> = new Set(),
  ): Promise<RegistryItem[]> {
    const cfg = config ?? (await this.config())
    const items: RegistryItem[] = []

    if (visited.size === 0)
      visited.add(item.name)
    if (!item.registryDependencies?.length)
      return items

    for (const name of item.registryDependencies) {
      if (visited.has(name))
        continue
      visited.add(name)

      const d = cfg.items.find(i => i.name === name)
      if (!d) {
        continue
      }

      const nested = await this.findDependencyItems(d, cfg, visited)
      items.push(...nested)
      items.push(d)
    }

    return items.sort((a, b) => a.name.localeCompare(b.name))
  }

  /**
   * Normalize the registry name.
   *
   * @param name - The name to normalize.
   * @returns The normalized name.
   */
  private normalizeName(name: string): string {
    if (name.startsWith('http')) {
      if (name.startsWith('https://github.com/')) {
        return name.replace('https://github.com/', '')
      }
      else {
        throw new Error('Invalid registry name')
      }
    }

    return name
  }
}

export function useRegistry(name: string): Registry {
  return new Registry(name)
}
