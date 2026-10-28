import type { HashableContent, Prettify, ProjectAddedItem, ProjectAddedItemFile, ProjectAddedRegistry, ProjectConfig, ProjectLockFile, ProjectPaths } from '../types'
import { basename, isAbsolute, join, relative, resolve } from 'node:path/posix'
import { LOCKFILE_SCHEMA_URL, ProjectConfigSchema, ProjectLockFileSchema } from '@weme-ui/schema'
import { defu } from 'defu'
import { hash } from 'hasha'
import { addDependency } from 'nypm'
import * as v from 'valibot'
import { CLI_TMP_DIR, DEFAULT_PATHS, DEFAULT_REGISTRIES, PROJECT_CONFIG_FILENAME, PROJECT_LOCKFILE_FILENAME } from '../constants'
import { useRegistry } from './registry'
import { existsFile, readFile, removeLeadingSlash, writeFile } from './utilities'

type ProjectAddedItemMeta = Pick<ProjectAddedItem, 'type' | 'registry' | 'repo' | 'prefix'>
type ResolvedProjectAddedItemFile = Prettify<ProjectAddedItemMeta & ProjectAddedItemFile & HashableContent>

interface ProjectInfo {
  root: string
  paths: ProjectPaths
  registries: NonNullable<ProjectConfig['registries']>
  defaultRegistry: ProjectAddedRegistry
}

/**
 * Project management class.
 *
 * @example
 * ```ts
 * const project = new Project(cwd)
 * ```
 *
 * @param root - The root directory of the project.
 * @returns The project instance.
 */
export class Project {
  /**
   * The root directory of the project.
   */
  private root: string

  constructor(root: string) {
    this.root = root
  }

  /**
   * Get the project info.
   *
   * @returns The project info.
   */
  async info(): Promise<ProjectInfo> {
    const config = await this.hasProjectConfig() ? await this.loadProjectConfig() : null

    return {
      root: this.root,
      paths: this.resolvePaths(config?.paths),
      registries: config?.registries ?? DEFAULT_REGISTRIES,
      defaultRegistry: config?.registries?.[0] ?? DEFAULT_REGISTRIES[0],
    }
  }

  /**
   * Add an item to the project.
   *
   * @param name - The name of the item to add.
   * @returns Whether the item was added.
   */
  async addItem(name: string): Promise<boolean> {
    if (await this.hasAddedItem(name)) {
      return await this.updateItem(name)
    }

    const parsed = await this.parseItemName(name)
    const registry = useRegistry(parsed.registry)

    const items = await registry.getItems(item => item.name === parsed.name)
    if (items.length === 0) {
      throw new Error(`Item ${parsed.name} not found in the registry ${parsed.registry}`)
    }

    const { paths, registries, defaultRegistry } = await this.info()
    const itemRegistry = registries.find(registry => registry.registry === parsed.registry) ?? defaultRegistry
    const addedItems: ProjectAddedItem[] = []

    for (const item of items) {
      const files = await registry.getItemFiles(item)
      const addedItem: ProjectAddedItem = {
        name: item.name,
        type: item.type,
        registry: itemRegistry.registry,
        repo: itemRegistry.repo,
        prefix: itemRegistry.prefix,
        files: [],
      }

      for (const file of files) {
        const fileName = basename(file.path)
        const fileDir = paths[file.type] ?? paths['~']
        const filePath = file.type === 'component' && itemRegistry.prefix
          ? join(fileDir, itemRegistry.prefix, fileName)
          : join(fileDir, fileName)

        addedItem.files.push({
          kind: file.kind,
          source: file.path,
          dest: filePath,
        })
      }

      addedItems.push(addedItem)
    }

    if (addedItems.length > 0) {
      const lockfile = await this.loadLockfile() ?? {
        $schema: LOCKFILE_SCHEMA_URL,
        items: [],
      }

      lockfile.items.push(...addedItems)

      return await writeFile(
        join(this.root, CLI_TMP_DIR),
        PROJECT_LOCKFILE_FILENAME,
        JSON.stringify(lockfile, null, 2),
      )
    }

    return false
  }

  /**
   * Update an added item by name in the project.
   *
   * @param name - The name of the item to update.
   * @returns Whether the item was updated.
   */
  async updateItem(name: string): Promise<boolean> {
    void name
    return false
  }

  /**
   * Check if an item was added to the project.
   *
   * @param name - The name of the item to check.
   * @returns Whether the item was added.
   */
  async hasAddedItem(name: string): Promise<boolean> {
    const lockfile = await this.loadLockfile()

    if (lockfile) {
      const parsed = await this.parseItemName(name)
      return lockfile.items.some(
        item => item.name === parsed.name && item.registry === parsed.registry,
      )
    }

    return false
  }

  /**
   * Get the files of an added item.
   *
   * @param itemName - The name of the item to get the files from.
   * @returns The resolved files of the item.
   * @throws If the item is not found in the lockfile.
   * @throws If the file is not found in the project.
   */
  async getAddedItemFiles(itemName: string): Promise<ResolvedProjectAddedItemFile[]> {
    const lockfile = await this.loadLockfile()

    if (lockfile) {
      const addedItem = lockfile.items.find(item => item.name === itemName)

      if (!addedItem) {
        throw new Error(`Item ${itemName} not found in the lockfile`)
      }

      return await Promise.all(addedItem.files.map(
        async (file) => {
          const result = await this.getAddedItemFileContent(file.dest)

          return {
            type: addedItem.type,
            registry: addedItem.registry,
            repo: addedItem.repo,
            prefix: addedItem.prefix,
            kind: file.kind,
            source: file.source,
            dest: file.dest,
            content: result.content,
            hash: result.hash,
          }
        },
      ))
    }

    return []
  }

  /**
   * Get the content of an added item file by filepath.
   *
   * @param filepath - The filepath of the file.
   * @returns The content of the file.
   * @throws If the file is not found in the project.
   */
  async getAddedItemFileContent(filepath: string): Promise<HashableContent> {
    const content = await readFile(this.root, filepath)

    if (!content) {
      throw new Error(`File ${filepath} not found in the project`)
    }

    const hashStr = await hash(content)

    return {
      content,
      hash: hashStr,
    }
  }

  /**
   * Add dependencies to the project.
   *
   * @param dependencies - The dependencies to add.
   */
  async addDependencies(dependencies: string[]): Promise<void> {
    await addDependency(dependencies, {
      cwd: this.root,
      silent: true,
    })
  }

  /**
   * Add dev dependencies to the project.
   *
   * @param dependencies - The dev dependencies to add.
   */
  async addDevDependencies(dependencies: string[]): Promise<void> {
    await addDependency(dependencies, {
      cwd: this.root,
      silent: true,
      dev: true,
    })
  }

  /**
   * Check if the project is initialized.
   *
   * @returns Whether the project is initialized.
   */
  async isInitialized(): Promise<boolean> {
    const checkList = [
      this.joinPath('uno.config.ts'),
      this.joinPath(PROJECT_CONFIG_FILENAME),
      this.joinPath(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME),
      this.joinPath('package.json'),
      this.joinPath(CLI_TMP_DIR, 'uno.config.ts'),
    ]

    const progress = await Promise.all(checkList.map(
      async path => await existsFile(this.root, path),
    ))

    return progress.every(Boolean)
  }

  /**
   * Check if the project has a package.json file.
   *
   * @returns Whether the project has a package.json file.
   */
  async hasPackageJson(): Promise<boolean> {
    return await existsFile(this.root, 'package.json')
  }

  /**
   * Check if the project has a project config file.
   *
   * @returns Whether the project has a project config file.
   */
  async hasProjectConfig(): Promise<boolean> {
    return await existsFile(this.root, PROJECT_CONFIG_FILENAME)
  }

  /**
   * Check if the project has a lockfile.
   *
   * @returns Whether the project has a lockfile.
   */
  async hasLockfile(): Promise<boolean> {
    return await existsFile(this.root, join(CLI_TMP_DIR, PROJECT_LOCKFILE_FILENAME))
  }

  /**
   * Check if the project has a uno config file.
   *
   * @returns Whether the project has a uno config file.
   */
  async hasUnoConfig(): Promise<boolean> {
    return await existsFile(this.root, join(CLI_TMP_DIR, 'uno.config.ts'))
  }

  /**
   * Load the project config file.
   *
   * @returns The loaded project config if it exists, otherwise null.
   */
  private async loadProjectConfig(): Promise<ProjectConfig | null> {
    const content = await readFile(this.root, PROJECT_CONFIG_FILENAME)

    if (content) {
      try {
        const configJson = JSON.parse(content)
        const parsed = v.safeParse(ProjectConfigSchema, configJson)

        if (parsed.success) {
          return parsed.output
        }

        return null
      }
      catch {}
    }

    return null
  }

  /**
   * Load the lockfile.
   *
   * @returns The loaded lockfile if it exists, otherwise null.
   */
  private async loadLockfile(): Promise<ProjectLockFile | null> {
    const content = await readFile(join(this.root, CLI_TMP_DIR), PROJECT_LOCKFILE_FILENAME)

    if (content) {
      try {
        const lockfileJson = JSON.parse(content)
        const parsed = v.safeParse(ProjectLockFileSchema, lockfileJson)

        if (parsed.success) {
          return parsed.output
        }
      }
      catch {}
    }

    return null
  }

  /**
   * Resolve project config paths to locations relative to the project root.
   *
   * @param paths - The paths from project config.
   * @returns The resolved paths.
   */
  private resolvePaths(paths?: Partial<ProjectPaths> | null): ProjectPaths {
    const merged = defu(paths ?? {}, DEFAULT_PATHS)
    const alias = this.toProjectRelative(this.root, merged['~'])

    return Object.fromEntries(
      Object.entries(merged).map(([key, value]) => [
        key,
        key === '~'
          ? alias
          : this.toProjectRelative(this.root, this.expandTildeAlias(value, alias)),
      ]),
    ) as ProjectPaths
  }

  /**
   * Expand a tilde alias.
   *
   * @param value - The value to expand.
   * @param alias - The alias to expand.
   * @returns The expanded value.
   */
  private expandTildeAlias(value: string, alias: string) {
    if (value === '~') {
      return alias
    }

    if (value.startsWith('~/')) {
      const rest = value.slice(2)
      return rest ? join(alias, rest) : alias
    }

    return value
  }

  /**
   * Convert a path to a project relative path.
   *
   * @param root - The project root directory.
   * @param path - The path to convert.
   * @returns The project relative path.
   */
  private toProjectRelative(root: string, path: string) {
    const abs = isAbsolute(path) ? resolve(path) : resolve(root, path)

    if (abs === root || abs.startsWith(`${root}/`)) {
      return relative(root, abs) || '.'
    }

    return abs
  }

  /**
   * Parse the item name.
   *
   * @param input - The item name to parse, format: `<registry>/<item-name>`.
   * @returns The parsed item name.
   */
  private async parseItemName(input: string): Promise<{ registry: string, name: string }> {
    const s = input.trim().replace(/\/+$/, '')
    const i = s.lastIndexOf('/')

    if (i === -1) {
      return {
        registry: (await this.info()).defaultRegistry.registry,
        name: s,
      }
    }
    return {
      registry: s.slice(0, i),
      name: s.slice(i + 1),
    }
  }

  /**
   * Join a path to the workplace directory.
   *
   * @param paths - The paths to join.
   * @returns The joined path.
   */
  private joinPath(...paths: string[]) {
    return join(this.root, ...paths.map(removeLeadingSlash))
  }
}
