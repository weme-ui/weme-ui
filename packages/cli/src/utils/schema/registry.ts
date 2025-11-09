import type { InlineCssVars, ManifestSchema, RegistryItem, RegistryItemFile, RegistryItemType, RegistrySchema } from '@weme-ui/schema'
import type { Result } from '../result'
import fs from 'node:fs'
import { exit } from 'node:process'
import * as p from '@clack/prompts'
import { MANIFEST_FILE_NAME, manifestSchema, REGISTRY_FILE_NAME, registrySchema } from '@weme-ui/schema'
import chalk from 'chalk'
import path from 'pathe'
import { fetchJSON } from '../fetch'
import { Err, Ok } from '../result'
import { runStep } from '../utilities'

export const REGISTRY_DIRNAME = 'registry'

export interface NormalizedRegistryItems {
  dependencies: string[]
  devDependencies: string[]
  files: RegistryItemFile[]
  cssVars: InlineCssVars
}

/**
 * Fetch `manifest.json` from repository.
 *
 * @example
 * ```ts
 * const result = await fetchManifestConfig('weme-ui/weme-ui')
 *
 * if (result.isErr()) {
 *   console.error(result.unwrapErr())
 *   return
 * }
 *
 * console.log(result.unwrap())
 * ```
 *
 * @param repo - Repository name
 * @return {Result<ManifestSchema[], string>}
 */
export async function fetchManifestConfig(repo: string): Promise<Result<ManifestSchema[], string>> {
  try {
    const json = await fetchJSON<ManifestSchema[]>(
      `https://raw.githubusercontent.com/${getGithubRepoName(repo)}/refs/heads/main/${REGISTRY_DIRNAME}/${MANIFEST_FILE_NAME}`,
    )

    const result = manifestSchema.array().safeParse(json)

    if (!result.success) {
      return Err(result.error.message)
    }

    return Ok(result.data)
  }
  catch (e: any) {
    return Err(e.message)
  }
}

/**
 * Fetch `registry.json` from repository.
 *
 * @example
 * ```ts
 * const result = await fetchRegistryConfig('weme-ui/weme-ui', 'weme-ui/std')
 *
 * if (result.isErr()) {
 *   console.error(result.unwrapErr())
 *   return
 * }
 *
 * console.log(result.unwrap())
 * ```
 *
 * @param repo - Repository name
 * @param registry - Registry name
 * @return {Result<RegistrySchema, string>}
 */
export async function fetchRegistryConfig(repo: string, registry: string): Promise<Result<RegistrySchema, string>> {
  try {
    const manifest = await fetchManifestConfig(repo)

    if (manifest.isErr()) {
      return Err(manifest.unwrapErr())
    }

    const config = manifest.unwrap().find(r => r.name === registry)

    if (!config) {
      return Err('Registry not found.')
    }

    const json = await fetchJSON<RegistrySchema>(
      `https://raw.githubusercontent.com/${getGithubRepoName(repo)}/refs/heads/main/${config.directory}/${REGISTRY_FILE_NAME}`,
    )

    const result = registrySchema.safeParse(json)

    if (!result.success) {
      return Err(result.error.message)
    }

    return Ok(result.data)
  }
  catch (e: any) {
    return Err(e.message)
  }
}

/**
 * Load `registry.json` from current working directory.
 *
 * @example
 * ```ts
 * const config = loadRegistryConfig(process.cwd())
 *
 * if (config.isErr()) {
 *   console.error(config.unwrapErr())
 *   return
 * }
 *
 * console.log(config.unwrap().name)
 * ```
 *
 * @param cwd - Current working directory
 * @return {Result<RegistrySchema, string>}
 */
export function loadRegistryConfig(cwd: string): Result<RegistrySchema, string> {
  try {
    const configPath = path.join(cwd, REGISTRY_FILE_NAME)

    if (!fs.existsSync(configPath)) {
      return Err('Could not find your registry configuration file!')
    }

    const json = JSON.parse(fs.readFileSync(configPath, 'utf8').toString())
    const result = registrySchema.safeParse(json)

    if (!result.success) {
      return Err(result.error.message)
    }

    return Ok(result.data)
  }
  catch (e: any) {
    return Err(e.message)
  }
}

/**
 * Select registry from repository.
 *
 * @example
 * ```ts
 * const registry = await selectRegistry('weme-ui/weme-ui')
 *
 * if (registry.isErr()) {
 *   console.error(registry.unwrapErr())
 *   return
 * }
 *
 * console.log(registry.unwrap().name)
 * ```
 */
export async function selectRegistry(repo: string) {
  return await runStep('Fetching repository information...', async (spinner) => {
    const repository = await fetchManifestConfig(repo)

    if (repository.isErr()) {
      spinner.stop('Failed to fetch repository configuration file.', 1)
      exit(0)
    }

    const registries = repository.unwrap().map(r => ({
      label: r.name,
      value: r.name,
      hint: r.description,
    }))

    spinner.stop(chalk.dim('Repository information fetched.'))

    const registry = await p.select({
      message: 'What is the default registry?',
      options: registries,
      initialValue: registries[0].value,
    })

    if (p.isCancel(registry)) {
      p.cancel('Operation cancelled.')
      exit(0)
    }

    const registryConfig = repository.unwrap().find(r => r.name === registry)!

    return {
      name: registryConfig.name,
      directory: registryConfig.directory,
      prefix: registryConfig.prefix,
      access: registryConfig.access,
    }
  })
}

/**
 * Fetch registry items.
 *
 * @example
 * ```ts
 * const items = await fetchRegistryItems(
 *   'weme-ui/weme-ui',
 *   'weme-ui/std',
 *   'component',
 *   'button',
 * )
 *
 * if (items.isErr()) {
 *   console.error(items.unwrapErr())
 *   return
 * }
 *
 * console.log(items.unwrap().dependencies)
 * ```
 *
 * @param repo - Repository name
 * @param registry - Registry name
 * @param options - Options
 * @param options.name - Registry item name
 * @param options.type - Registry item type
 * @return {Result<NormalizedRegistryItems, string>}
 */
export async function fetchRegistryItems(
  repo: string,
  registry: string,
  options?: {
    name?: string | string[]
    type?: RegistryItemType
  },
): Promise<NormalizedRegistryItems> {
  return await runStep('Fetching registry items...', async (spinner) => {
    const registryConfig = await fetchRegistryConfig(repo, registry)

    if (registryConfig.isErr()) {
      spinner.stop('Failed to fetch registry configuration.', 1)
      exit(0)
    }

    const registryItems = registryConfig.unwrap().items

    const matched = registryItems.filter((item) => {
      if (options?.type && item.type !== options.type) {
        return false
      }

      if (options?.name) {
        return Array.isArray(options.name)
          ? options.name.includes(item.name)
          : item.name === options.name
      }

      return true
    })

    if (matched.length === 0) {
      return {
        dependencies: [],
        devDependencies: [],
        files: [],
        cssVars: {},
      }
    }

    const items = matched.reduce((acc, item) => {
      acc.push(item)

      if (item.registryDependencies) {
        registryItems.forEach((i) => {
          if (item.registryDependencies!.includes(i.name)) {
            acc.push(i)
          }
        })
      }

      return acc
    }, [] as RegistryItem[])

    spinner.stop('Registry items fetched.')

    return normalizeRegistryItems(items)
  })
}

/**
 * Normalize registry items.
 *
 * @example
 * ```ts
 * const items = normalizeRegistryItems(config.items)
 *
 * console.log(items.dependencies)
 * ```
 *
 * @param items - Registry items
 * @return {NormalizedRegistryItems}
 */
export function normalizeRegistryItems(items: RegistryItem[]): NormalizedRegistryItems {
  const dependencies = items.reduce((acc, item) => {
    acc.push(...(item.dependencies || []))
    return acc
  }, [] as string[])

  const devDependencies = items.reduce((acc, item) => {
    acc.push(...(item.devDependencies || []))
    return acc
  }, [] as string[])

  const files = items.reduce((acc, item) => {
    acc.push(...(item.files || []))
    return acc
  }, [] as RegistryItemFile[])

  const cssVars = items.reduce((acc, item) => {
    const nested = item.cssVars
    if (nested && Object.keys(nested).length > 0) {
      Object.entries(nested).forEach(
        ([name, value]) => {
          Object.entries(value).forEach(([subName, subValue]) => {
            acc[`${name}-${subName}`] = subValue
          })
        },
      )
    }

    return acc
  }, {} as InlineCssVars)

  return {
    dependencies,
    devDependencies,
    files,
    cssVars,
  }
}

/**
 * Get github repository name from url.
 *
 * @example
 * ```ts
 * const name = getGithubRepoName('https://github.com/weme-ui/weme-ui')
 *
 * console.log(name) // weme-ui/weme-ui
 * ```
 *
 * @param url - Github repository url
 * @return {string}
 */
export function getGithubRepoName(url: string): string {
  return url
    .trim()
    .replace(/^https?:\/\/github.com\//, '')
    .replace(/\.git$/, '')
}
