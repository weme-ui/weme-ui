import type { IProject, IProjectPaths, IProjectRegistry, IRegistryName } from '@weme-ui/schema'
import type { Result } from 'neverthrow'
import type { IProjectGroupedItems, IProjectNormalizedItem, IProjectResolvedItem, IProjectResolvedItemFile, IRemoteURI } from '../../types'
import fs from 'node:fs/promises'
import { PROJECT_FILE_NAME, ProjectSchema } from '@weme-ui/schema'
import { err, ok } from 'neverthrow'
import path from 'pathe'
import SparkMD5 from 'spark-md5'
import { glob } from 'tinyglobby'
import { RemoteRegistry } from './remote/registry'
import { resolveGroupNameWithRepo } from './utils'

export class Project {
  private cwd: string
  private config?: IProject

  constructor(cwd: string) {
    this.cwd = path.resolve(cwd)
  }

  async schema(): Promise<Result<IProject, string>> {
    if (!this.config) {
      try {
        const content = await fs.readFile(this.withRootPath(PROJECT_FILE_NAME), 'utf-8')
        if (!content)
          return err('Project config is empty')

        const json = JSON.parse(content)
        const schema = ProjectSchema.safeParse(json)

        if (!schema.success)
          return err(schema.error.message)

        this.config = schema.data
      }
      catch (e: any) {
        return err(`Failed to fetch project schema: ${e.message}`)
      }
    }

    return ok(this.config)
  }

  async registries(): Promise<Required<IProjectRegistry>[]> {
    const schema = await this.schema()

    if (schema.isOk())
      return schema.value.repos as Required<IProjectRegistry>[]

    return []
  }

  async hasRegistry(repoURL: IRemoteURI, registryName: IRegistryName): Promise<boolean> {
    const registries = await this.registries()

    return registries.some(
      r => r.repo === repoURL && r.registry === registryName,
    )
  }

  async items(): Promise<IProjectResolvedItem[]> {
    const schema = await this.schema()

    if (schema.isErr())
      return []

    const flatten: IProjectResolvedItem[] = []

    await Promise.all(Object.entries(schema.value.items || {}).map(
      async ([repo, registries]) => {
        await Promise.all(Object.entries(registries).map(
          async ([registry, items]) => {
            await Promise.all(items.map(
              async (i) => {
                const item = {
                  ...i,
                  repo: repo as IRemoteURI,
                  registry: registry as IRegistryName,
                  prefix: path.basename(path.dirname(i.path)),
                  files: [],
                } as IProjectResolvedItem

                const basePath = this.withRootPath(i.path)

                const files = await glob(['*'], {
                  cwd: basePath,
                  absolute: false,
                  onlyFiles: true,
                })

                await Promise.all(files.map(
                  async (f) => {
                    const filePath = path.join(basePath, f)
                    const content = await fs.readFile(filePath, 'utf-8')
                    const hash = SparkMD5.hash(content)
                    const type = f.endsWith('.vue')
                      ? 'component'
                      : f.endsWith('.props.ts')
                        ? 'type'
                        : f.endsWith('.style.ts')
                          ? 'style'
                          : 'file'

                    item.files.push({
                      type,
                      path: filePath,
                      hash,
                      content,
                      target: type === 'file' ? filePath : undefined,
                    } as IProjectResolvedItemFile)
                  },
                ))

                flatten.push(item)
              },
            ))
          },
        ))
      },
    ))

    return flatten
  }

  async hasItem(repoURL: IRemoteURI, registryName: IRegistryName, name: string): Promise<boolean> {
    const items = await this.items()

    return items.some(
      i => i.repo === repoURL
        && i.registry === registryName
        && i.name === name,
    )
  }

  async getItem(repoURL: IRemoteURI, registryName: IRegistryName, name: string): Promise<IProjectResolvedItem | undefined> {
    const items = await this.items()

    return items.find(
      i => i.repo === repoURL
        && i.registry === registryName
        && i.name === name,
    )
  }

  groupItemsByRegistry(items: IProjectResolvedItem[]): IProjectGroupedItems {
    return items.reduce(
      (acc, item) => {
        const name = resolveGroupNameWithRepo(
          item.repo,
          item.registry,
        )

        if (!acc[name])
          acc[name] = []

        acc[name].push(item)
        return acc
      },
      {} as IProjectGroupedItems,
    )
  }

  async groupItemsByState(items: IProjectResolvedItem[]) {
    const newItems: IProjectResolvedItem[] = []
    const updateItems: IProjectResolvedItem[] = []
    const skippedItems: IProjectResolvedItem[] = []

    await Promise.all(items.map(
      async (item) => {
        const exists = await this.getItem(
          item.repo,
          item.registry,
          item.name,
        )

        if (!exists && !newItems.includes(item)) {
          newItems.push(item)
        }
        else {
          await Promise.all(item.files.map(
            async (file) => {
              if (exists) {
                if (exists.files.find(
                  f => f.path === file.path && f.hash === file.hash,
                )) {
                  if (!skippedItems.includes(item))
                    skippedItems.push(item)
                }
                else {
                  if (!updateItems.includes(item))
                    updateItems.push(item)
                }
              }
            },
          ))
        }
      },
    ))

    return {
      newItems,
      updateItems,
      skippedItems,
    }
  }

  async normalizeItemNames(itemNameStr: string): Promise<IProjectNormalizedItem[]> {
    const registries = await this.registries()

    const splitNames = itemNameStr
      .split(',')
      .map(i => i.trim())
      .filter(Boolean)

    return splitNames.reduce(
      (acc, name) => {
        const defaultRegistry = registries.find(r => r.default)
        const parts = name.split('/')
          .map(p => p.trim())
          .filter(Boolean)

        const item = {} as IProjectNormalizedItem

        if (parts.length === 1) {
          if (!defaultRegistry) {
            throw new Error('No default registry found')
          }

          item.name = parts[0]
          item.repo = defaultRegistry.repo as IRemoteURI
          item.registry = defaultRegistry.registry
          item.prefix = defaultRegistry.prefix
        }

        if (parts.length === 2) {
          const registry = registries.find(r => r.registry.endsWith(`/${parts[0]}`))

          if (!registry) {
            throw new Error(`Registry ${parts[0]} not found`)
          }

          item.name = parts[1]
          item.repo = registry.repo as IRemoteURI
          item.registry = registry.registry
          item.prefix = registry.prefix
        }

        if (parts.length === 3) {
          const registry = registries.find(r => r.registry === `${parts[0]}/${parts[1]}`)

          if (!registry) {
            throw new Error(`Registry ${parts[0]}/${parts[1]} not found`)
          }

          item.name = parts[2]
          item.repo = registry.repo as IRemoteURI
          item.registry = registry.registry
          item.prefix = registry.prefix
        }

        if (!acc.some(
          i => i.name === item.name
            && i.repo === item.repo
            && i.registry === item.registry,
        )) {
          acc.push(item)
        }

        return acc
      },
      [] as IProjectNormalizedItem[],
    )
  }

  async paths(): Promise<Required<IProjectPaths> | undefined> {
    const schema = await this.schema()

    if (schema.isOk()) {
      return Object.entries(schema.value.paths).reduce(
        (acc, [key, value]) => {
          acc[key as keyof IProjectPaths] = this.withRootPath(value)
          return acc
        },
        {} as Required<IProjectPaths>,
      )
    }
  }

  async withRegistryPath(repoURL: IRemoteURI, registryName: IRegistryName, name: string): Promise<string> {
    const paths = await this.paths()
    if (!paths)
      return ''

    const basePath = Object.entries(paths).reduce(
      (acc, [key, value]) => {
        if (name.startsWith(key) && value)
          acc = [key, value]

        return acc
      },
      [] as string[],
    )

    const registries = await this.registries()
    const registry = registries.find(
      r => r.repo === repoURL && r.registry === registryName,
    )
    if (!registry)
      return ''

    return path.join(
      basePath[1],
      registry.prefix,
      name.replace(basePath[0], ''),
    )
  }

  async withoutRegistryPath(item: IProjectResolvedItem): Promise<string> {
    const basePath = await this.withRegistryPath(
      item.repo,
      item.registry,
      item.files[0].path,
    )

    return path.dirname(basePath.replace(path.join(this.cwd, 'app'), '~'))
  }

  async exists(): Promise<boolean> {
    return await fs.access(this.withRootPath(PROJECT_FILE_NAME))
      .then(() => true)
      .catch(() => false)
  }

  useRegistry(repoURL: IRemoteURI, registryName: IRegistryName): RemoteRegistry {
    return RemoteRegistry.create(repoURL, registryName)
  }

  withRootPath(...args: string[]): string {
    return path.join(
      this.cwd,
      ...args.map(
        // TODO: process nuxt version, currently we only support v4
        p => p.replace('~', 'app'),
      ),
    )
  }
}
