import type { ManifestSchema } from '@weme-ui/schema'
import fs from 'node:fs'
import * as p from '@clack/prompts'
import { DEFAULT_REGISTRY_PREFIX, MANIFEST_FILE_NAME, manifestSchema, REGISTRY_FILE_NAME } from '@weme-ui/schema'
import chalk from 'chalk'
import path from 'pathe'
import { glob } from 'tinyglobby'
import { loadPackageJson } from '../../utils/schema/package'
import { loadRegistryConfig, REGISTRY_DIRNAME } from '../../utils/schema/registry'

export default async function (args: Record<string, any>) {
  p.intro(chalk.bold.blue('✨ Building Weme UI Repository'))

  const registries = await loadRegistries(args.cwd)
  await updateRegistries(args.cwd, registries)
  await updateManifest(args.cwd, registries)

  p.outro('🥤 All done!')
}

async function loadRegistries(cwd: string): Promise<ManifestSchema[]> {
  const spinner = p.spinner()

  spinner.start('Loading registries...')

  const files = await glob([`**/${REGISTRY_FILE_NAME}`], {
    cwd: path.resolve(cwd, REGISTRY_DIRNAME),
    absolute: false,
    onlyFiles: true,
    ignore: ['**/node_modules/**'],
  })

  const registries = files.reduce(
    (acc, file) => {
      const directory = path.dirname(file)
      const config = loadRegistryConfig(path.resolve(cwd, REGISTRY_DIRNAME, directory))
      const pkg = loadPackageJson(path.resolve(cwd, REGISTRY_DIRNAME, directory))

      if (config.isOk()) {
        const result = manifestSchema.safeParse({
          id: config.unwrap().id,
          name: config.unwrap().name,
          description: config.unwrap().description,
          version: pkg.unwrap().version || '0.0.0',
          directory: path.join(REGISTRY_DIRNAME, directory),
          prefix: config.unwrap().prefix || DEFAULT_REGISTRY_PREFIX,
          access: config.unwrap().access || 'public',
          items: {
            components: config.unwrap().items.filter(item => item.type === 'component').length,
            layouts: config.unwrap().items.filter(item => item.type === 'layout').length,
            themes: config.unwrap().items.filter(item => item.type === 'theme').length,
            blocks: config.unwrap().items.filter(item => item.type === 'block').length,
            pages: config.unwrap().items.filter(item => item.type === 'page').length,
          },
          updated: new Date().toISOString(),
        })

        if (result.success) {
          spinner.message(`Building ${result.data.name}...`)
          acc.push(result.data)
        }
      }

      return acc
    },
    [] as ManifestSchema[],
  )

  spinner.stop('Registries loaded!')

  return registries
}

async function updateRegistries(cwd: string, registries: ManifestSchema[]) {
  const spinner = p.spinner()

  spinner.start('Updating registries...')

  registries.forEach((reg) => {
    const registry = loadRegistryConfig(path.resolve(cwd, reg.directory)).unwrap()

    registry.version = reg.version

    fs.writeFileSync(
      path.resolve(cwd, reg.directory, REGISTRY_FILE_NAME),
      `${JSON.stringify(registry, null, 2)}\n`,
    )
  })

  spinner.stop('Registries updated!')
}

async function updateManifest(cwd: string, registries: ManifestSchema[]) {
  const spinner = p.spinner()

  spinner.start('Updating manifest...')

  fs.writeFileSync(
    path.resolve(cwd, REGISTRY_DIRNAME, MANIFEST_FILE_NAME),
    `${JSON.stringify(registries, null, 2)}\n`,
  )

  spinner.stop('Manifest updated!')
}
