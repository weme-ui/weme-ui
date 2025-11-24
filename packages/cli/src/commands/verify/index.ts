import fs from 'node:fs'
import { cwd } from 'node:process'
import * as p from '@clack/prompts'
import chalk from 'chalk'
import { defineCommand } from 'citty'
import path from 'pathe'
import { glob } from 'tinyglobby'
import { REGISTRY_DIRNAME } from '../../constants'
import { loadRegistryConfig } from '../../utils/schema/registry'

/**
 * Usage
 *
 * - **Verify all registries**:
 *    - ```weme-ui verify```
 */
export default defineCommand({
  meta: {
    name: 'verify',
    description: 'Verify all registries.',
  },

  args: {
    cwd: {
      type: 'string',
      description: 'Change working directory.',
      valueHint: 'PATH',
      default: cwd(),
    },
  },

  async setup({ args }) {
    p.intro(chalk.bold.white('✨ Verifying registries...'))

    args.cwd = path.resolve(args.cwd)

    if (!fs.existsSync(path.join(args.cwd, REGISTRY_DIRNAME))) {
      p.cancel('No registries found.')
      return
    }

    const dirs = await glob([`${REGISTRY_DIRNAME}/*`], {
      cwd: args.cwd,
      absolute: false,
      onlyDirectories: true,
      ignore: ['**/node_modules/**'],
    })

    const errors = await Promise.all(dirs.map(async (dir) => {
      const results: Record<string, string[]> = {}
      const registry = loadRegistryConfig(path.join(args.cwd, dir))

      if (registry.isErr()) {
        p.log.error(registry.unwrapErr())
        return results
      }

      const registryName = registry.unwrap().name
      const items = registry.unwrap().items || []

      items.forEach((item) => {
        if (item.files.length === 0) {
          results[registryName] = results[registryName] || []
          results[registryName].push(`${item.name} : No files found.`)
          return
        }

        item.files.forEach((file) => {
          if (!fs.existsSync(path.join(args.cwd, dir, file.path))) {
            results[registryName] = results[registryName] || []
            results[registryName].push(`${item.name}: ${chalk.underline.yellow(file.path)} not exists.`)
          }
        })
      })

      return results
    }))

    // Display errors
    errors.forEach((error) => {
      Object.entries(error).forEach(([name, messages]) => {
        if (messages.length === 0)
          return

        p.log.info(chalk.bold(name))
        messages.forEach((message) => {
          p.log.warn(message)
        })
      })
    })

    p.outro('🥤 All done!')
  },
})
