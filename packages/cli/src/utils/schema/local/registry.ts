import type { IRegistry, IRegistryItem } from '@weme-ui/schema'
import type { Result } from 'neverthrow'
import { existsSync, readFileSync } from 'node:fs'
import { REGISTRY_FILE_NAME, RegistrySchema } from '@weme-ui/schema'
import { err, ok } from 'neverthrow'
import path from 'pathe'
import SparkMD5 from 'spark-md5'
import { REGISTRY_DIRNAME } from '../../../constants'

export class LocalRegistry {
  private cwd: string
  private scope: string
  private data?: IRegistry

  constructor(cwd: string, scope: string) {
    this.cwd = cwd
    this.scope = scope
  }

  async schema(): Promise<Result<IRegistry, string>> {
    if (!this.data) {
      try {
        const content = readFileSync(this.withScopePath(REGISTRY_FILE_NAME), 'utf-8')

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

  async items(): Promise<IRegistryItem[]> {
    const schema = await this.schema()

    if (schema.isErr())
      return []

    return Promise.all(schema.value.items
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(
        async (item) => {
          return {
            ...item,
            files: await Promise.all(item.files.map(
              async (file) => {
                const content = readFileSync(this.withScopePath(file.path), 'utf-8')
                const hash = SparkMD5.hash(content)
                return {
                  ...file,
                  hash,
                }
              },
            )),
          }
        },
      ))
  }

  async hasItem(name: string, parent?: string): Promise<boolean> {
    const schema = await this.schema()

    if (schema.isErr())
      return false

    return schema.value.items.some(
      (i) => {
        if (i.name === name)
          return true

        if (i.files) {
          return i.files.some(
            f => f.path.startsWith(`components/${name}/`)
              || f.path === `components/${parent || name}/${name}.vue`,
          )
        }

        return false
      },
    )
  }

  exists(): boolean {
    return existsSync(this.withScopePath(REGISTRY_FILE_NAME))
  }

  withScopePath(...args: string[]): string {
    return path.join(this.cwd, REGISTRY_DIRNAME, this.scope, ...args)
  }
}
