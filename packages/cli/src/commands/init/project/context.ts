import type { IProjectPaths, IProjectRegistry } from '@weme-ui/schema'
import type { IProjectResolvedItem } from '../../../types'
import { existsSync } from 'node:fs'
import { exit } from 'node:process'
import { input, select } from '@inquirer/prompts'
import { PROJECT_FILE_NAME } from '@weme-ui/schema'
import chalk from 'chalk'
import path from 'pathe'
import { glob } from 'tinyglobby'
import { runStep } from '../../../utils'
import consola from '../../../utils/consola'
import { RemoteRepository } from '../../../utils/schema'

export interface IInitProjectContext {
  cwd: string
  repos: IProjectRegistry[]
  paths: IProjectPaths
  inits: IProjectResolvedItem[]
}

export async function createContext(args: Record<string, any>): Promise<IInitProjectContext> {
  try {
    args.cwd = path.resolve(args.cwd)

    // Step 1. Check if the project exists.
    const exists = await existsProject(args.cwd)

    if (exists) {
      args.cwd = await input({
        message: 'Project already exists, please enter a new directory:',
        default: args.cwd,
        prefill: 'editable',
        required: true,
        transformer: value => path.resolve(value),
        validate: async (value) => {
          if (!value)
            return 'Directory is required'

          if (await existsProject(value))
            return 'Project already exists'

          return true
        },
      }, {
        clearPromptOnDone: true,
      })
    }

    // Step 2. Enter default repository to fetch registries.
    args.repo = await input({
      message: 'Enter the default repository to fetch registries:',
      default: args.repo || 'https://github.com/weme-ui/weme-ui',
      required: true,
      validate: (value) => {
        if (!value)
          return 'Repository is required'

        if (!value.startsWith('https://github.com/'))
          return 'Only GitHub repository is supported'

        return true
      },
    }, {
      clearPromptOnDone: true,
    })

    // Step 2.1. Select default registry.
    const repository = new RemoteRepository(args.repo)

    const registries = await runStep('Fetching registries', async () => {
      const schema = await repository.schema()

      if (schema.isErr()) {
        throw new Error(schema.error)
      }

      return schema.value.registries
    })

    const selectedRegistry = await select({
      message: 'What registry do you want to use as the default one?',
      choices: registries.map(r => ({
        name: r.name,
        value: r,
      })),
    }, {
      clearPromptOnDone: true,
    })

    // Step 2.2. Enter default registry prefix.
    args.prefix = await input({
      message: `Enter prefix for ${selectedRegistry.name} registry:`,
      default: selectedRegistry.prefix,
      required: true,
      transformer: value => value.trim().toLowerCase(),
      validate: (value) => {
        if (!value)
          return 'Prefix is required'

        return true
      },
    }, {
      clearPromptOnDone: true,
    })

    // Step 2.3. Enter default registry path.
    args.path = await input({
      message: 'Enter path for components:',
      default: '~/components',
      required: true,
      transformer: value => value.trim(),
      validate: (value) => {
        if (!value)
          return 'Path is required'

        return true
      },
    }, {
      clearPromptOnDone: true,
    })

    // Step 2.4. Fetch default registry init items.
    const inits = await runStep(`Fetching ${selectedRegistry.name} initialization items...`, async () => {
      const registry = repository.useRegistry(selectedRegistry.name)
      const schema = await registry.schema()

      if (schema.isErr()) {
        throw new Error(schema.error)
      }

      const items = schema.value.items.filter(i => i.type === 'init')

      if (!items.length) {
        return []
      }

      return Promise.all(items.map(
        async (item) => {
          const resolved = await registry.resolveItem({
            name: item.name,
            repo: args.repo,
            registry: selectedRegistry.name,
            prefix: args.prefix,
          })

          if (resolved.isErr()) {
            throw new Error(resolved.error)
          }

          return resolved.value
        },
      ))
    })

    consola.info(`Initializing project with ${chalk.cyan.underline(selectedRegistry.name)} registry...`)

    return {
      cwd: args.cwd,
      repos: [
        {
          repo: args.repo,
          registry: selectedRegistry.name,
          prefix: args.prefix,
          default: true,
        },
      ],
      paths: {
        components: args.path,
      },
      inits,
    }
  }
  catch (e: any) {
    if (e instanceof Error && e.name === 'ExitPromptError') {
      consola.error('Operation cancelled')
    }
    else {
      consola.error(e.message)
    }
    exit(0)
  }
}

async function existsProject(cwd: string): Promise<boolean> {
  if (existsSync(cwd)) {
    if (existsSync(path.join(cwd, PROJECT_FILE_NAME)))
      return true

    const files = await glob([`*`], {
      cwd,
      absolute: false,
      onlyFiles: true,
    })

    if (files.length)
      return true

    return false
  }

  return false
}
