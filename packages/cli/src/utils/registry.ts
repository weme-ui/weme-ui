import type { RegistryConfig } from '../types'
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
