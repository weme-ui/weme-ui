import type { ProjectAddedItemSchema, RegistryItemTypeEnum } from '@weme-ui/schema'
import type { PackageJson } from 'pkg-types'
import { isAbsolute, join, resolve } from 'node:path/posix'
import { ProjectConfigSchema, ProjectLockFileSchema } from '@weme-ui/schema'
import * as v from 'valibot'
import { CLI_BASE_DIR } from '../constants'
import { readFile, removeTrailingSlash } from './utilities'

type RegistryItemType = v.InferOutput<typeof RegistryItemTypeEnum>

type ProjectPaths = Record<'*' | RegistryItemType, string>
type ProjectConfig = v.InferOutput<typeof ProjectConfigSchema>
type ProjectLockFile = v.InferOutput<typeof ProjectLockFileSchema>
type ProjectAddedItem = v.InferOutput<typeof ProjectAddedItemSchema>

export const PROJECT_CONFIG_FILENAME = 'weme.config.json'
export const PROJECT_LOCKFILE_FILENAME = 'weme.lock.json'

export const DEFAULT_REGISTRIES: ProjectConfig['registries'] = [
  { registry: 'weme-ui/slim', prefix: 'ui' },
]

export const DEFAULT_PATHS: ProjectPaths = {
  '*': 'src',
  'component': '~/components',
  'composable': '~/composables',
  'block': '~/blocks',
  'layout': '~/layouts',
  'page': '~/pages',
  'util': '~/utils',
  'theme': '~/themes',
}

/**
 * A project manager.
 *
 * const project = new Project(process.cwd())
 */
export class Project {
  private root: string

  private packageJson: PackageJson | null = null
  private projectConfig: ProjectConfig | null = null
  private lockfile: ProjectLockFile | null = null

  private paths: Record<'*' | RegistryItemType, string>
  private registries: ProjectConfig['registries']
  private addedItems: Array<ProjectAddedItem>

  private dependencies: Record<string, string>
  private devDependencies: Record<string, string>

  private isInitd = false

  constructor(root: string) {
    this.root = root

    this.paths = DEFAULT_PATHS

    this.registries = []
    this.addedItems = []

    this.dependencies = {}
    this.devDependencies = {}
  }

  get initd() {
    return this.isInitd
  }

  /**
   * Load the project data if it is not loaded yet.
   *
   * @returns The project data.
   */
  async load() {
    const packageJson = this.packageJson ?? await this.loadPackageJson()
    const projectConfig = this.projectConfig ?? await this.loadProjectConfig()
    const lockfile = this.lockfile ?? await this.loadLockfile()

    this.isInitd = packageJson !== null && projectConfig !== null && lockfile !== null

    return {
      initd: this.isInitd,
      packageJson: packageJson !== null,
      projectConfig: projectConfig !== null,
      lockfile: lockfile !== null,
    }
  }

  /**
   * Load the package.json file.
   *
   * @returns The package.json file if it exists, otherwise null.
   */
  async loadPackageJson(): Promise<PackageJson | null> {
    const packageContent = await readFile(this.root, 'package.json')

    if (packageContent) {
      try {
        const packageJson = JSON.parse(packageContent) as PackageJson

        this.packageJson = packageJson
        this.dependencies = packageJson.dependencies || {}
        this.devDependencies = packageJson.devDependencies || {}

        return packageJson
      }
      catch {}
    }

    return null
  }

  // hasPackageDependency(name: string, version?: string) {}

  /**
   * Load the project config file.
   *
   * @returns The project config file if it exists, otherwise null.
   */
  async loadProjectConfig(): Promise<ProjectConfig | null> {
    const configContent = await readFile(this.root, PROJECT_CONFIG_FILENAME)

    if (configContent) {
      try {
        const configJson = JSON.parse(configContent)
        const configSchema = v.safeParse(ProjectConfigSchema, configJson)

        if (configSchema.success) {
          this.registries = configSchema.output.registries && configSchema.output.registries.length
            ? configSchema.output.registries
            : DEFAULT_REGISTRIES

          this.paths = this.resolvePaths(configSchema.output.paths || {})

          return configSchema.output
        }

        return null
      }
      catch {}
    }

    return null
  }

  /**
   * Load the lockfile file.
   *
   * @returns The lockfile file if it exists, otherwise null.
   */
  async loadLockfile(): Promise<ProjectLockFile | null> {
    const lockfileContent = await readFile(join(this.root, CLI_BASE_DIR), PROJECT_LOCKFILE_FILENAME)

    if (lockfileContent) {
      try {
        const lockfileJson = JSON.parse(lockfileContent)
        const lockfileSchema = v.safeParse(ProjectLockFileSchema, lockfileJson)

        if (lockfileSchema.success) {
          this.addedItems = lockfileSchema.output.items || []
          return lockfileSchema.output
        }

        return null
      }
      catch {}
    }

    return null
  }

  /**
   * Resolve the paths to the absolute path.
   *
   * For example, if the root is `path/to` and the paths are:
   * ```json
   * {
   *   '*': 'src',
   *   'component': '~/components',
   * }
   * ```
   *
   * Then the resolved paths will be:
   * ```json
   * {
   *   '*': 'path/to/src',
   *   'component': 'path/to/components',
   * }
   * ```
   *
   * @param paths - The paths to resolve.
   * @returns The resolved paths.
   */
  private resolvePaths(paths: NonNullable<ProjectConfig['paths']>): ProjectPaths {
    const resolved: Record<string, string> = {}

    const basePath = paths['*']
      ? isAbsolute(paths['*']) ? resolve(paths['*']) : resolve(this.root, paths['*'])
      : this.root

    Object.entries(paths).forEach(
      ([key, value]) => {
        if (key === '*') {
          resolved[key] = basePath
        }
        else {
          resolved[key] = value.startsWith('~')
            ? value.replace('~', basePath)
            : join(basePath, value)
        }
      },
    )

    return resolved as Record<'*' | RegistryItemType, string>
  }

  /**
   * Unwrap the paths to the original format. For example, if the paths are:
   *
   * ```json
   * {
   *   '*': 'path/to/src',
   *   'component': 'path/to/components',
   * }
   * ```
   *
   * Then the unwrapped paths will be:
   *
   * ```json
   * {
   *   '*': 'src',
   *   'component': '~/components',
   * }
   * ```
   *
   * @param paths - The paths to unwrap.
   * @returns The unwrapped paths.
   */
  private unwrapPaths(paths: ProjectPaths): ProjectPaths {
    const unwrapped: Record<string, string> = {}

    Object.entries(paths).forEach(
      ([key, value]) => {
        if (key === '*') {
          unwrapped[key] = value.replace(removeTrailingSlash(this.root), '')
        }
        else {
          unwrapped[key] = value.replace(this.root, '~')
        }
      },
    )

    return unwrapped as ProjectPaths
  }
}
