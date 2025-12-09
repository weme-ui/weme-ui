import type { IRepository } from '@weme-ui/schema'
import type { Result } from 'neverthrow'
import { existsSync, readFileSync } from 'node:fs'
import { REGISTRY_FILE_NAME, REPOSITORY_FILE_NAME, RepositorySchema } from '@weme-ui/schema'
import { err, ok } from 'neverthrow'
import path from 'pathe'
import { glob } from 'tinyglobby'
import { REGISTRY_DIRNAME } from '../../../constants'

export class LocalRepository {
  private cwd: string
  private data?: IRepository

  constructor(cwd: string) {
    this.cwd = cwd
  }

  async schema(): Promise<Result<IRepository, string>> {
    if (!this.data) {
      try {
        const content = readFileSync(this.withRootPath(REPOSITORY_FILE_NAME), 'utf-8')
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

  async scopes(): Promise<string[]> {
    const files = await glob([`**/${REGISTRY_FILE_NAME}`], {
      cwd: this.withRootPath(),
      absolute: false,
      onlyFiles: true,
    })

    return files.map(f => path.dirname(f))
  }

  exists(): boolean {
    return existsSync(this.withRootPath(REPOSITORY_FILE_NAME))
  }

  withRootPath(...args: string[]): string {
    return path.join(this.cwd, REGISTRY_DIRNAME, ...args)
  }
}
