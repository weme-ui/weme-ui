import type { IRegistryName, IRepository } from '@weme-ui/schema'
import type { Result } from 'neverthrow'
import type { IRemoteRepositoryURL, IRemoteURI } from '../../../types'
import { REPOSITORY_FILE_NAME, RepositorySchema } from '@weme-ui/schema'
import { err, ok } from 'neverthrow'
import { REGISTRY_DIRNAME } from '../../../constants'
import { fetchURL } from '../../fetcher'
import { parseRepositoryURL } from '../utils'
import { RemoteRegistry } from './registry'

export class RemoteRepository {
  private meta: IRemoteRepositoryURL
  private data?: IRepository

  constructor(url: IRemoteURI) {
    this.meta = parseRepositoryURL(url.trim())
  }

  get url(): IRemoteURI {
    return `https://${this.meta.host}/${this.meta.name}`
  }

  async schema(): Promise<Result<IRepository, string>> {
    if (!this.data) {
      try {
        const content = await this.fetch(REPOSITORY_FILE_NAME)
        if (!content)
          return err('Repository schema is empty')

        const json = JSON.parse(content)
        const schema = RepositorySchema.safeParse(json)

        if (!schema.success)
          return err(schema.error.message)

        this.data = schema.data
      }
      catch (e: any) {
        return err(`Failed to fetch repository schema: ${e.message}`)
      }
    }

    return ok(this.data)
  }

  async fetch(...args: string[]): Promise<string> {
    try {
      return fetchURL(
        `https://raw.githubusercontent.com/${this.meta.name}/refs/heads/${this.meta.branch}/${REGISTRY_DIRNAME}/${args.join('/')}`,
      )
    }
    catch {
      return ''
    }
  }

  async exists(): Promise<boolean> {
    const schema = await this.schema()
    return schema.isOk()
  }

  useRegistry(name: IRegistryName) {
    return new RemoteRegistry(this, name)
  }
}
