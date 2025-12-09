import type { IProjectGroupedItems, IProjectResolvedItem } from '../../types'
import path from 'node:path'
import { cwd, exit } from 'node:process'
import { checkbox } from '@inquirer/prompts'
import chalk from 'chalk'
import { runStep } from '../../utils'
import consola from '../../utils/consola'
import { Project } from '../../utils/schema/project'

export interface IUpdateItemsContext {
  cwd: string
  items: IProjectGroupedItems
}

export async function createContext(args: Record<string, any>): Promise<IUpdateItemsContext> {
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
     * Step 2. Check items status.
     */
    const items = await runStep('Checking added items...', async (spinner) => {
      const items = await project.items()
      const updateItems: IProjectResolvedItem[] = []

      await Promise.all(items.map(
        async (item) => {
          spinner.text = `Checking ${chalk.cyan(item.name)}...`

          const registry = project.useRegistry(item.repo, item.registry)
          const remoteItem = await registry.resolveItem(item)

          if (remoteItem.isOk()) {
            await Promise.all(item.files.map(
              async (file) => {
                if (
                  !updateItems.includes(remoteItem.value)
                  && remoteItem.value.files.find(
                    f => path.basename(f.path) === path.basename(file.path)
                      && f.hash !== file.hash,
                  )
                ) {
                  updateItems.push(remoteItem.value)
                }
              },
            ))
          }
        },
      ))

      return updateItems
    })

    if (items.length === 0)
      throw new Error('No items need to update')

    const selectedItems = await checkbox({
      message: 'What items do you want to update?',
      choices: items.map(i => ({
        name: `${i.name} ${chalk.gray(`(${i.registry})`)}`,
        value: i,
      })),
      pageSize: 9,
      required: true,
    }, {
      clearPromptOnDone: true,
    })

    return {
      cwd: args.cwd,
      items: project.groupItemsByRegistry(selectedItems),
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
