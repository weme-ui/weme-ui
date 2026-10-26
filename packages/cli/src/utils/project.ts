import type { PackageJson } from 'pkg-types'
import type { ProjectConfig, ProjectConfigInput, ProjectLockFile, ProjectLockFileInput, ProjectPaths } from '../types'
import { isAbsolute, join, resolve } from 'node:path/posix'
import { CONFIG_SCHEMA_URL, LOCKFILE_SCHEMA_URL, ProjectConfigSchema, ProjectLockFileSchema } from '@weme-ui/schema'
import { addDependency } from 'nypm'
import semver from 'semver'
import * as v from 'valibot'
import { CLI_TMP_DIR, DEFAULT_PATHS, DEFAULT_REGISTRIES, PROJECT_CONFIG_FILENAME, PROJECT_LOCKFILE_FILENAME } from '../constants'
import { existsFile, readFile, removeTrailingSlash, writeFile } from './utilities'

interface ProjectState {
  hasUnoConfig: boolean
  hasProjectConfig: boolean
  hasLockfile: boolean
  hasPackageJson: boolean
}

interface ProjectInfo {
  initd: boolean
  root: string
  state: ProjectState
  paths: ProjectPaths
  registries: ProjectConfig['registries']
}

/**
 * A project manager.
 *
 * const project = new Project(process.cwd())
 */
class Project {
  private root: string

  private initd = false
  private state: ProjectState

  private paths: ProjectPaths
  private registries: ProjectConfig['registries']

  constructor(root: string) {
    this.root = root

    this.paths = DEFAULT_PATHS
    this.registries = DEFAULT_REGISTRIES

    this.state = {
      hasUnoConfig: false,
      hasProjectConfig: false,
      hasLockfile: false,
      hasPackageJson: false,
    }
  }

  /**
   * Get the project info.
   *
   * @returns The project info.
   */
  get info(): ProjectInfo {
    return {
      initd: this.initd,
      root: this.root,
      state: this.state,
      paths: this.paths,
      registries: this.registries,
    }
  }

  /**
   * Check if the project is initialized.
   *
   * @returns Whether the project is initialized.
   */
  async check() {
    const checkList = [
      [this.root, 'uno.config.ts'],
      [this.root, PROJECT_CONFIG_FILENAME],
      [join(this.root, CLI_TMP_DIR), PROJECT_LOCKFILE_FILENAME],
      [this.root, 'package.json'],
      [join(this.root, CLI_TMP_DIR), 'uno.config.ts'],
    ]

    const progress = await Promise.all(
      checkList.map(
        async ([root, filename]) => await existsFile(root, filename),
      ),
    )

    this.initd = progress.every(Boolean)

    const [hasUnoConfig, hasProjectConfig, hasLockfile, hasPackageJson] = progress

    this.state = {
      hasUnoConfig,
      hasProjectConfig,
      hasLockfile,
      hasPackageJson,
    }

    return this.state
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
        return JSON.parse(packageContent) as PackageJson
      }
      catch {}
    }

    return null
  }

  /**
   * Check if the project has a dependency.
   *
   * @param name - The name of the dependency.
   * @param version - The optional version of the dependency. If not provided, it will check if the dependency exists.
   * @returns Whether the dependency exists.
   */
  async hasDependency(name: string, version?: string) {
    const packageJson = await this.loadPackageJson()

    if (packageJson !== null) {
      const dependencies = {
        ...packageJson.dependencies || {},
        ...packageJson.devDependencies || {},
      }

      const dependency = dependencies[name]

      if (!dependency) {
        return false
      }

      return version !== undefined
        ? semver.gte(version, dependency)
        : true
    }

    return false
  }

  /**
   * Add dependencies to the project.
   *
   * @param dependencies - The dependencies to add.
   */
  async addDependencies(dependencies: string[]) {
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
  async addDevDependencies(dependencies: string[]) {
    await addDependency(dependencies, {
      cwd: this.root,
      silent: true,
      dev: true,
    })
  }

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
          if (configSchema.output.registries && configSchema.output.registries.length) {
            this.registries = configSchema.output.registries
          }

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
    const lockfileContent = await readFile(join(this.root, CLI_TMP_DIR), PROJECT_LOCKFILE_FILENAME)

    if (lockfileContent) {
      try {
        const lockfileJson = JSON.parse(lockfileContent)
        const lockfileSchema = v.safeParse(ProjectLockFileSchema, lockfileJson)

        if (lockfileSchema.success) {
          return lockfileSchema.output
        }

        return null
      }
      catch {}
    }

    return null
  }

  /**
   * Check if the project has an added item.
   *
   * @param name - The name of the added item.
   * @returns Whether the added item exists.
   */
  async hasAddedItem(name: string) {
    const lockfile = await this.loadLockfile()

    if (lockfile !== null) {
      return lockfile.items.some(item => item.name === name)
    }

    return false
  }

  /**
   * Update the project config.
   *
   * @param config - The project config to update.
   * @returns Whether the project config was updated successfully.
   * @throws If the project config fails to update.
   */
  async updateProjectConfig(config: ProjectConfigInput) {
    const validated = v.safeParse(ProjectConfigSchema, {
      $schema: CONFIG_SCHEMA_URL,
      ...config,
    })

    if (validated.success) {
      return await writeFile(
        this.root,
        PROJECT_CONFIG_FILENAME,
        JSON.stringify(validated.output, null, 2),
      )
    }

    throw new Error('Failed to update project config')
  }

  /**
   * Update the lockfile.
   *
   * @param lockfile - The lockfile to update.
   * @returns Whether the lockfile was updated successfully.
   * @throws If the lockfile fails to update.
   */
  async updateLockfile(lockfile: ProjectLockFileInput) {
    const validated = v.safeParse(ProjectLockFileSchema, {
      $schema: LOCKFILE_SCHEMA_URL,
      ...lockfile,
    })

    if (validated.success) {
      return await writeFile(
        join(this.root, CLI_TMP_DIR),
        PROJECT_LOCKFILE_FILENAME,
        JSON.stringify(validated.output, null, 2),
      )
    }

    throw new Error('Failed to update lockfile')
  }

  /**
   * Resolve the paths to the absolute path.
   *
   * For example, if the root is `path/to` and the paths are:
   * ```json
   * {
   *   '~': 'src',
   *   'component': '~/components',
   * }
   * ```
   *
   * Then the resolved paths will be:
   * ```json
   * {
   *   '~': 'path/to/src',
   *   'component': 'path/to/components',
   * }
   * ```
   *
   * @param paths - The paths to resolve.
   * @returns The resolved paths.
   */
  private resolvePaths(paths: NonNullable<ProjectConfig['paths']>): ProjectPaths {
    const resolved: Record<string, string> = {}

    const basePath = paths['~']
      ? isAbsolute(paths['~']) ? resolve(paths['~']) : resolve(this.root, paths['~'])
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

    return resolved as ProjectPaths
  }

  /**
   * Unwrap the paths to the original format. For example, if the paths are:
   *
   * ```json
   * {
   *   '~': 'path/to/src',
   *   'component': 'path/to/components',
   * }
   * ```
   *
   * Then the unwrapped paths will be:
   *
   * ```json
   * {
   *   '~': 'src',
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

/**
 * Load the project.
 *
 * @param root - The root directory of the project.
 * @returns The project.
 */
export async function loadProject(root: string): Promise<Project> {
  const project = new Project(root)
  await project.check()

  return project
}
