import type { IProjectGroupedItems, IProjectResolvedItem, IRemoteURI } from '../../types'
import path from 'node:path'
import { cwd, exit } from 'node:process'
import { checkbox, select } from '@inquirer/prompts'
import chalk from 'chalk'
import { titleCase } from 'scule'
import { runStep } from '../../utils'
import consola from '../../utils/consola'
import { Project } from '../../utils/schema/project'

export interface IAddItemsContext {
  cwd: string
  items: IProjectGroupedItems
}

export async function createContext(args: Record<string, any>): Promise<IAddItemsContext> {
  try {
    args.cwd = args.cwd ? path.resolve(args.cwd) : cwd()

    /**
     * Step 1. Check if the project exists.
     */
    const project = new Project(args.cwd)

    if (!await project.exists()) {
      throw new Error('Project not found')
    }

    /**
     * Step 2. Resolve items.
     *
     * - Resolve user input items.
     * - Resolve user selected items from project config.
     */
    const items: IProjectResolvedItem[] = []

    if (!args.items) {
      const registries = await runStep('Fetching registries', async () => {
        const result = await project.registries()

        if (!result.length) {
          throw new Error('No registries found')
        }

        return result
      })

      const selectedRegistry = await select({
        message: 'What registry do you want to add items from?',
        choices: registries.map(r => ({
          name: r.registry + (r.default ? chalk.gray(' (default)') : ''),
          value: r,
        })),
        default: registries.find(r => r.default),
      }, {
        clearPromptOnDone: true,
      })

      const registry = await runStep(`Fetching manifest from ${selectedRegistry.registry}`, async () => {
        const instance = project.useRegistry(
          selectedRegistry.repo as IRemoteURI,
          selectedRegistry.registry,
        )

        if (!await instance.exists()) {
          throw new Error(`Registry ${selectedRegistry.registry} not found`)
        }

        return instance
      })

      const fetchedItems = await runStep(`Fetching items from ${selectedRegistry.registry}`, async () => {
        const schema = await registry.schema()
        const result = schema.match(
          val => val.items.filter(i => i.type !== 'init'),
          () => [],
        )

        if (!result.length) {
          throw new Error(`No items found in registry ${selectedRegistry.registry}`)
        }

        return result
      })

      const selectedItems = await checkbox({
        message: 'What items do you want to add?',
        choices: fetchedItems.map(i => ({
          name: (i.title || titleCase(i.name)) + chalk.gray(` (${titleCase(i.type)})`),
          value: i.name,
        })),
        pageSize: 9,
        required: true,
      }, {
        clearPromptOnDone: true,
      })

      await runStep('Fetching items', async (spinner) => {
        await Promise.all(selectedItems.map(
          async (name) => {
            spinner.text = `Fetching ${chalk.cyan(name)}`

            const item = await registry.resolveItem({
              name,
              repo: selectedRegistry.repo as IRemoteURI,
              registry: selectedRegistry.registry,
              prefix: selectedRegistry.prefix,
            })

            if (item.isOk()) {
              items.push(item.value)
              // resolve dependencies
              await resolveDependencies(item.value)
            }
          },
        ))
      })
    }
    else {
      await runStep('Fetching items', async (spinner) => {
        const normalized = await project.normalizeItemNames(args.items)

        await Promise.all(normalized.map(
          async (item) => {
            spinner.text = `Fetching ${chalk.cyan(item.name)}`

            const registry = project.useRegistry(item.repo, item.registry)
            const remoteItem = await registry.resolveItem(item)

            if (remoteItem.isOk()) {
              items.push(remoteItem.value)
              // resolve dependencies
              await resolveDependencies(remoteItem.value)
            }
          },
        ))
      })
    }

    async function resolveDependencies(item: IProjectResolvedItem) {
      if (item.registryDependencies) {
        await Promise.all(item.registryDependencies.map(
          async (itemName) => {
            if (
              !items.find(
                i => i.name === itemName
                  && i.repo === item.repo
                  && i.registry === item.registry,
              )
            ) {
              const registry = project.useRegistry(item.repo, item.registry)
              const depItem = await registry.resolveItem({
                name: itemName,
                repo: item.repo,
                registry: item.registry,
                prefix: item.prefix,
              })

              if (depItem.isOk()) {
                items.push(depItem.value)
              }
            }
          },
        ))
      }
    }

    return {
      cwd: args.cwd,
      items: project.groupItemsByRegistry(items),
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
