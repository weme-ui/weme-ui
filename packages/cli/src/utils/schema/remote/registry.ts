import type { IRegistry, IRegistryName } from '@weme-ui/schema'
import type { Result } from 'neverthrow'
import type { IProjectNormalizedItem, IProjectResolvedItem, IProjectResolvedItemFile, IRemoteURI } from '../../../types'
import { REGISTRY_FILE_NAME, RegistrySchema } from '@weme-ui/schema'
import { err, ok } from 'neverthrow'
import { RemoteRepository } from './repository'

export class RemoteRegistry {
  private repository: RemoteRepository
  private name: string
  private scope: string
  private data?: IRegistry

  constructor(repository: RemoteRepository, name: IRegistryName) {
    if (!name.includes('/')) {
      throw new Error(`Invalid registry name: ${name}`)
    }

    this.name = name.trim()
    this.scope = this.name.split('/')[1]
    this.repository = repository
  }

  async schema(): Promise<Result<IRegistry, string>> {
    if (!this.data) {
      try {
        const content = await this.fetch(REGISTRY_FILE_NAME)

        if (!content)
          return err('Registry schema is empty')

        const json = JSON.parse(content)
        const schema = RegistrySchema.safeParse(json)

        if (!schema.success)
          return err(schema.error.message)

        this.data = schema.data
      }
      catch (e: any) {
        return err(`Failed to fetch registry schema: ${e.message}`)
      }
    }

    return ok(this.data)
  }

  async exists(): Promise<boolean> {
    const schema = await this.schema()
    return schema.isOk()
  }

  async resolveItem(item: IProjectNormalizedItem): Promise<Result<IProjectResolvedItem, string>> {
    const schema = await this.schema()

    if (schema.isErr())
      return err(schema.error)

    const exists = schema.value.items.find(
      i => i.name === item.name,
    )

    if (!exists)
      return err(`Registry ${this.name} item ${item.name} not found`)

    const files = await Promise.all(exists.files.map(
      async (file) => {
        const content = await this.fetch(file.path)

        return {
          type: file.type,
          path: file.path,
          target: file.type === 'file' ? file.target : undefined,
          hash: file.hash,
          content,
        } as IProjectResolvedItemFile
      },
    ))

    return ok({
      ...item,
      type: exists.type,
      dependencies: exists.dependencies,
      devDependencies: exists.devDependencies,
      registryDependencies: exists.registryDependencies,
      cssVars: exists.cssVars,
      files,
    })
  }

  async fetch(...args: string[]): Promise<string> {
    return this.repository.fetch(this.scope, ...args)
  }

  static create(repoURL: IRemoteURI, name: IRegistryName) {
    return new RemoteRegistry(
      new RemoteRepository(repoURL),
      name,
    )
  }
}
