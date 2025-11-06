import type { InlineCssVars, ProjectPaths, ProjectSchema, RegistryItemType } from '@weme-ui/schema'
import type { Result } from '../result'
import fs from 'node:fs'
import * as p from '@clack/prompts'
import { PROJECT_FILE_NAME, projectPaths, projectSchema } from '@weme-ui/schema'
import { defu } from 'defu'
import ora from 'ora'
import path from 'pathe'
import { glob } from 'tinyglobby'
import { fetchURL, getGithubRepoName } from '../fetch'
import { Err, Ok } from '../result'
import { runStep } from '../utilities'
import { installDependencies, loadPackageJson } from './package'
import { fetchManifestConfig, fetchRegistryItems } from './registry'

export interface ProjectInfo {
  name: string
  description: string
  version: string
  repos: string[]
  registries: {
    name: string
    repo: string
    version: string
    description: string
    prefix: string
    access: string
    default: boolean
    available: number
    installed: number
  }[]
}

/**
 * Load `weme.config.json` from current working directory.
 *
 * @example
 * ```ts
 * const config = loadProjectConfig(process.cwd())
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
 * @return {Result<ProjectSchema, string>}
 */
export function loadProjectConfig(cwd: string): Result<ProjectSchema, string> {
  const configPath = path.join(cwd, PROJECT_FILE_NAME)

  if (!fs.existsSync(configPath)) {
    return Err('Could not find your project configuration file!')
  }

  try {
    const json = JSON.parse(fs.readFileSync(configPath, 'utf8').toString())
    const config = projectSchema.safeParse(json)

    if (!config.success) {
      return Err(config.error.message)
    }

    return Ok(config.data)
  }
  catch (e: any) {
    return Err(e.message)
  }
}

/**
 * Load project information from current working directory.
 *
 * @example
 * ```ts
 * const info = await loadProjectInfo(process.cwd())
 *
 * if (info.isErr()) {
 *   console.error(info.unwrapErr())
 *   return
 * }
 *
 * console.log(info.unwrap().name)
 * ```
 *
 * @param cwd - Current working directory
 * @return {Promise<Result<ProjectInfo, string>>}
 */
export async function loadProjectInfo(cwd: string): Promise<Result<ProjectInfo, string>> {
  const spinner = ora().start('Fetching project information...')

  try {
    const pkg = loadPackageJson(cwd)
    const config = loadProjectConfig(cwd)

    if (pkg.isErr() || config.isErr()) {
      return Err('Could not find your project configuration file!')
    }

    const repos = config.unwrap().repos || []
    const paths = resolvePaths(cwd, config.unwrap().paths)

    if (paths.isErr()) {
      return Err(paths.unwrapErr())
    }

    const registries = await Promise.all(repos.map(async (r) => {
      const manifest = await fetchManifestConfig(r.repo)

      if (manifest.isErr()) {
        throw new Error(manifest.unwrapErr())
      }

      const registry = manifest.unwrap().find(m => m.name === r.registry)

      if (!registry) {
        throw new Error(`${r.registry} not found.`)
      }

      const installed = await glob(`**/*.vue`, {
        cwd: path.join(paths.unwrap().components, r.prefix || 'ui'),
        absolute: false,
        onlyFiles: true,
      }).then(
        files => files.length,
      )

      return {
        name: r.registry,
        repo: r.repo,
        version: registry.version || '0.0.0',
        description: registry.description || '',
        prefix: r.prefix || registry.prefix,
        access: registry.access,
        default: !!r.default,
        available: Object.entries(registry.items).reduce(
          (acc, [,count]) => acc + count,
          0,
        ),
        installed,
      } satisfies ProjectInfo['registries'][number]
    }))

    return Ok({
      name: pkg.unwrap().name || '',
      description: pkg.unwrap().description || '',
      version: pkg.unwrap().version || '0.0.0',
      repos: repos.map(r => r.repo),
      registries,
    })
  }
  catch (e: any) {
    spinner.stop()
    return Err(e.message)
  }
  finally {
    spinner.stop()
  }
}

/**
 * Update `weme.config.json` from current working directory.
 *
 * @example
 * ```ts
 * await updateProjectConfig(process.cwd(), project, {
 *   repo: {
 *     repo: 'https://github.com/weme-ui/weme-ui',
 *     registry: 'weme-ui/std',
 *     prefix: 'ui',
 *     default: true,
 *   },
 *   cssVars: {
 *     colors: {
 *       primary: 'blue',
 *     },
 *   },
 * })
 * ```
 *
 * @param cwd - Current working directory
 * @param project - Project configuration
 * @param updates - Updates to apply
 * @param updates.repo - Repository configuration to update
 * @param updates.cssVars - CSS variables to update
 */
export async function updateProjectConfig(
  cwd: string,
  project: ProjectSchema,
  updates: {
    repo?: ProjectSchema['repos'][number]
    cssVars?: InlineCssVars
  },
) {
  await runStep('Updating project configuration...', async (spinner) => {
    if (
      updates.repo
      && project.repos.findIndex(
        r => r.repo === updates.repo?.repo
          && r.registry === updates.repo?.registry,
      ) === -1
    ) {
      project.repos.push(updates.repo)

      if (updates.repo.default) {
        project.repos.forEach((repo) => {
          repo.default = repo.registry === updates.repo?.registry
        })
      }
    }

    if (updates.cssVars) {
      project.unocss = project.unocss || {}
      project.unocss.cssVars = defu(project.unocss.cssVars || {}, updates.cssVars)
    }

    fs.writeFileSync(
      path.join(cwd, PROJECT_FILE_NAME),
      `${JSON.stringify(project, null, 2)}\n`,
      {
        encoding: 'utf8',
        flag: 'w',
      },
    )

    spinner.stop('Project configuration updated!')
  })
}

/**
 * Parse project paths.
 *
 * @example
 * ```ts
 * const paths = parsePaths(project.paths)
 *
 * if (paths.isErr()) {
 *   console.error(paths.unwrapErr())
 *   return
 * }
 *
 * console.log(paths.unwrap().components)
 * ```
 *
 * @param paths - Project paths
 * @return {Result<Required<ProjectPaths>, string>}
 */
export function parsePaths(paths: ProjectPaths): Result<Required<ProjectPaths>, string> {
  const result = projectPaths.safeParse(paths)

  if (!result.success) {
    return Err(result.error.message)
  }

  return Ok(result.data as Required<ProjectPaths>)
}

/**
 * Resolve project paths.
 *
 * @example
 * ```ts
 * const paths = resolvePaths(process.cwd(), project.paths)
 *
 * if (paths.isErr()) {
 *   console.error(paths.unwrapErr())
 *   return
 * }
 *
 * console.log(paths.unwrap().components)
 * ```
 *
 * @param cwd - Current working directory
 * @param paths - Project paths
 * @return {Result<Required<ProjectPaths>, string>}
 */
export function resolvePaths(cwd: string, paths: ProjectPaths): Result<Required<ProjectPaths>, string> {
  const resolved = parsePaths(paths)

  if (resolved.isErr()) {
    return Err(resolved.unwrapErr())
  }

  return Ok(
    Object.entries(resolved.unwrap())
      .reduce((acc, [key, value]) => {
        acc[key as keyof ProjectPaths] = path.resolve(cwd, value.replace('~', 'app'))
        return acc
      }, {} as Required<ProjectPaths>),
  )
}

/**
 * Resolve project paths.
 *
 * @example
 * ```ts
 * const paths = resolveProjectPaths(process.cwd())
 *
 * if (paths.isErr()) {
 *   console.error(paths.unwrapErr())
 *   return
 * }
 *
 * console.log(paths.unwrap().components)
 * ```
 *
 * @param cwd - Current working directory
 * @param resolved - Resolve paths
 * @return {Result<Required<ProjectPaths>, string>}
 */
export function resolveProjectPaths(cwd: string, resolved = false): Result<Required<ProjectPaths>, string> {
  const project = loadProjectConfig(cwd)

  if (project.isErr()) {
    return Err(project.unwrapErr())
  }

  return Ok(
    resolved
      ? resolvePaths(cwd, project.unwrap().paths).unwrap()
      : project.unwrap().paths as Required<ProjectPaths>,
  )
}

/**
 * Install registry items.
 *
 * @example
 * ```ts
 * await installRegistryItems(
 *   process.cwd(),
 *   'weme-ui/weme-ui',
 *   'weme-ui/std',
 *   { name: 'button' },
 * )
 * ```
 *
 * @param cwd - Current working directory
 * @param repo - Repository name
 * @param registryName - Registry name
 * @param project - Project configuration
 * @param options - Options
 * @param options.name - Registry item name
 * @param options.type - Registry item type
 */
export async function installRegistryItems(
  cwd: string,
  repo: string,
  registryName: string,
  project: ProjectSchema,
  options?: {
    name?: string | string[]
    type?: RegistryItemType
  },
) {
  const manifest = await fetchManifestConfig(repo)

  if (manifest.isErr()) {
    p.log.error(manifest.unwrapErr())
    return
  }

  const registry = manifest.unwrap().find(r => r.name === registryName)

  if (!registry) {
    p.log.error('Registry not found.')
    return
  }

  const { dependencies, devDependencies, files, cssVars } = await fetchRegistryItems(
    repo,
    registry.name,
    options,
  )

  await runStep('Creating registry item files...', async (spinner) => {
    const paths = resolvePaths(cwd, project.paths)

    if (paths.isErr()) {
      p.log.error(paths.unwrapErr())
      return
    }

    const prefix = project.repos.find(r => r.registry === registry.name)!.prefix || 'ui'

    await Promise.all(files.map(async (file) => {
      spinner.message(`Creating ${file.path}...`)

      const content = await fetchURL(
        `https://raw.githubusercontent.com/${getGithubRepoName(repo)}/refs/heads/main/${registry.directory}/${file.path}`,
      )

      if (!content) {
        p.log.error(`Failed to fetch ${file.path}.`)
        return
      }

      switch (file.type) {
        case 'component':
        case 'type':
        case 'style':
          createFile(content, file.path.replace('components', path.join(paths.unwrap().components, prefix)))
          break

        case 'composable':
          createFile(content, file.path.replace('composables', paths.unwrap().composables))
          break

        case 'plugin':
          createFile(content, file.path.replace('plugins', paths.unwrap().plugins))
          break

        case 'util':
          createFile(content, file.path.replace('utils', paths.unwrap().utils))
          break

        case 'file':
          p.log.warn('File type is not supported yet.')
          break
      }
    }))

    spinner.stop('Registry item files created!')
  })

  await runStep('Installing dependencies...', async (spinner) => {
    await installDependencies({
      dependencies,
      devDependencies,
    }, { cwd })

    spinner.stop('Dependencies installed!')
  })

  await updateProjectConfig(cwd, project, { cssVars })
}

/**
 * Create file.
 *
 * @example
 * ```ts
 * createFile(content, 'components/ui/button.vue')
 * ```
 *
 * @param content - File content
 * @param dest - File destination
 */
function createFile(content: string, dest: string) {
  if (!content)
    return

  if (fs.existsSync(dest))
    return

  const dirname = path.dirname(dest)

  if (!fs.existsSync(dirname))
    fs.mkdirSync(dirname, { recursive: true })

  fs.writeFileSync(dest, content, {
    encoding: 'utf8',
    flag: 'w',
  })
}
