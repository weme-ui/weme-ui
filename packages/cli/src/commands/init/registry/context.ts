import type { PackageJson } from 'pkg-types'
import { existsSync, readFileSync } from 'node:fs'
import { exit } from 'node:process'
import { confirm, input } from '@inquirer/prompts'
import { DEFAULT_REGISTRY_PREFIX } from '@weme-ui/schema'
import path from 'pathe'
import { REGISTRY_DIRNAME } from '../../../constants'
import consola from '../../../utils/consola'

export interface IInitRegistryContext {
  name: string
  description: string
  version: string
  scope: string
  prefix: string
  initItems: boolean
  cwd: string
}

export async function createContext(args: Record<string, any>): Promise<IInitRegistryContext> {
  try {
    const context: IInitRegistryContext = {
      name: '',
      description: 'The registry for Weme UI.',
      version: '',
      scope: '',
      prefix: '',
      initItems: true,
      cwd: path.resolve(args.cwd),
    }

    context.scope = await input({
      message: 'Enter the scope of the registry:',
      default: context.scope,
      required: true,
      validate: (value) => {
        if (!value)
          return 'Scope is required'

        if (existsSync(path.join(context.cwd, REGISTRY_DIRNAME, value)))
          return `Scope ${value} already exists`

        return true
      },
    }, {
      clearPromptOnDone: true,
    })

    context.prefix = await input({
      message: 'Enter the prefix of the registry:',
      default: DEFAULT_REGISTRY_PREFIX,
      required: true,
      validate: (value) => {
        if (!value)
          return 'Prefix is required'

        return true
      },
    }, {
      clearPromptOnDone: true,
    })

    context.initItems = await confirm({
      message: 'Do you want to add init items?',
      default: context.initItems,
    }, {
      clearPromptOnDone: true,
    })

    const pkg = readFileSync(path.join(context.cwd, 'package.json'), 'utf-8')

    if (!pkg) {
      throw new Error('Package.json not found')
    }

    const pkgJson = JSON.parse(pkg) as PackageJson

    context.name = `${pkgJson.name}/${context.scope}`
    context.version = pkgJson.version || context.version

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
