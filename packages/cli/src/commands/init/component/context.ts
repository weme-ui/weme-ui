import { exit } from 'node:process'
import { confirm, input, select } from '@inquirer/prompts'
import path from 'pathe'
import { runStep } from '../../../utils'
import consola from '../../../utils/consola'
import { LocalRegistry, LocalRepository } from '../../../utils/schema'

export interface IInitComponentContext {
  registry: string
  scope: string
  name: string
  parent: string
  asChild: boolean
  cwd: string
}

export async function createContext(args: Record<string, any>) {
  try {
    const context: IInitComponentContext = {
      registry: '',
      scope: '',
      name: '',
      parent: '',
      asChild: false,
      cwd: path.resolve(args.cwd),
    }

    // Step 1. Select registry.
    const registries = await runStep('Fetching registries', async () => {
      const repository = new LocalRepository(context.cwd)
      const scopes = await repository.scopes()

      if (!scopes.length) {
        throw new Error('No registries found')
      }

      const result: Record<string, string>[] = []

      await Promise.all(scopes.map(
        async (scope) => {
          const registry = new LocalRegistry(context.cwd, scope)
          const schema = await registry.schema()

          if (schema.isOk()) {
            result.push({
              name: schema.value.name,
              scope,
            })
          }
        },
      ))

      return result
    })

    const selectedRegistry = await select({
      message: 'What registry do you want to add the component to?',
      choices: registries.map(r => ({
        name: r.name,
        value: r,
      })),

    }, {
      clearPromptOnDone: true,
    })

    context.scope = selectedRegistry.scope
    context.registry = selectedRegistry.name

    const registry = new LocalRegistry(context.cwd, context.scope)

    // Step 2. Enter component name.
    context.name = await input({
      message: 'Enter the name of the component:',
      default: context.name,
      required: true,
      validate: async (value) => {
        if (!value)
          return 'Name is required'

        if (value.includes(' '))
          return 'Name should not contain spaces'

        if (value.includes('/'))
          return 'Name should not contain slashes'

        if (await registry.hasItem(value)) {
          return `${value} already exists`
        }

        return true
      },
    }, {
      clearPromptOnDone: true,
    })

    // Step 3. Process child components.
    if (context.name.includes('-')) {
      const splitNames = context.name.split('-').reduce(
        (acc, name) => {
          acc.push([...acc, name].join('-'))
          return acc
        },
        [] as string[],
      )

      for (const name of splitNames) {
        if (await registry.hasItem(name)) {
          context.asChild = await confirm({
            message: `Do you want to add ${context.name} as a child of ${name}?`,
            default: true,
          }, {
            clearPromptOnDone: true,
          })

          if (context.asChild) {
            if (await registry.hasItem(name, context.name)) {
              throw new Error(`Component ${context.name} already exists`)
            }

            context.parent = name
          }

          break
        }
      }
    }

    return context
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
