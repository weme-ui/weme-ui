import type { IRepositoryRegistryInfo } from '@weme-ui/schema'
import type { PackageJson } from 'pkg-types'
import { readFileSync, writeFileSync } from 'node:fs'
import { exit } from 'node:process'
import { REGISTRY_FILE_NAME, RegistrySchema, REPOSITORY_FILE_NAME, RepositorySchema } from '@weme-ui/schema'
import path from 'pathe'
import clone from 'rfdc'
import { REGISTRY_DIRNAME } from '../../constants'
import { runStep } from '../../utils'
import consola from '../../utils/consola'
import { LocalRegistry, LocalRepository } from '../../utils/schema'

export default async function (args: Record<string, any>) {
  args.cwd = path.resolve(args.cwd)

  try {
    const repository = new LocalRepository(args.cwd)

    // Step 1. Check if the repository exists.
    if (!repository.exists()) {
      throw new Error('Repository not found')
    }

    // Step 2. Build all scopes.
    const scopes = await repository.scopes()
    const registries = await Promise.all(scopes.map(
      async (scope) => {
        return await runStep(`Building ${scope}...`, async (spinner) => {
          const registry = new LocalRegistry(args.cwd, scope)

          if (!registry.exists()) {
            throw new Error(`Registry ${scope} not found`)
          }

          const schema = await registry.schema()

          if (schema.isErr()) {
            throw new Error(`Failed to fetch registry schema: ${schema.error}`)
          }

          const data = clone()(schema.value)
          data.items = await registry.items()

          const result = RegistrySchema.safeParse(data)

          if (!result.success) {
            throw new Error(result.error.message)
          }

          writeFileSync(
            registry.withScopePath(REGISTRY_FILE_NAME),
            `${JSON.stringify(result.data, null, 2)}\n`,
          )

          spinner.succeed(`Built ${REGISTRY_DIRNAME}/${scope}.`)

          return data.items.reduce(
            (acc, item) => {
              if (item.type === 'init')
                return acc

              acc.statistics = acc.statistics || {
                components: 0,
                layouts: 0,
                themes: 0,
                blocks: 0,
                pages: 0,
              }

              item.files.forEach((file) => {
                if (file.type === 'component' && file.path.endsWith('.vue'))
                  acc.statistics.components++

                if (item.type === 'block' && file.type === 'file')
                  acc.statistics.blocks++

                if (item.type === 'layout' && file.type === 'file')
                  acc.statistics.layouts++

                if (item.type === 'theme' && file.type === 'file')
                  acc.statistics.themes++

                if (item.type === 'page' && file.type === 'file')
                  acc.statistics.pages++
              })

              return acc
            },
            {
              name: data.name,
              description: data.description,
              prefix: data.prefix,
              statistics: { components: 0, layouts: 0, themes: 0, blocks: 0, pages: 0 },
            } as IRepositoryRegistryInfo,
          )
        })
      },
    ))

    // Step 3. Build repository.
    await runStep(`Building repository...`, async (spinner) => {
      const schema = await repository.schema()

      if (schema.isErr()) {
        throw new Error(`Failed to fetch repository schema: ${schema.error}`)
      }

      const data = clone()(schema.value)

      const isUpdated = data.registries.some(
        (reg) => {
          const re = registries.find(r => r.name === reg.name)

          if (re && JSON.stringify(re) !== JSON.stringify(reg)) {
            return true
          }

          return false
        },
      )

      if (isUpdated) {
        const pkg = readFileSync(path.join(args.cwd, 'package.json'), 'utf-8')

        if (!pkg) {
          throw new Error('Package.json not found')
        }

        const pkgJson = JSON.parse(pkg) as PackageJson

        data.version = pkgJson.version || data.version
        data.registries = registries
        data.updated = new Date().toISOString()

        const result = RepositorySchema.safeParse(data)

        if (!result.success) {
          throw new Error(result.error.message)
        }

        writeFileSync(
          repository.withRootPath(REPOSITORY_FILE_NAME),
          `${JSON.stringify(result.data, null, 2)}\n`,
        )

        spinner.succeed(`Built ${REPOSITORY_FILE_NAME}.`)
      }
      else {
        spinner.succeed(`No changes.`)
      }
    })
  }
  catch (e: any) {
    consola.error(e.message)
    exit(0)
  }
}
