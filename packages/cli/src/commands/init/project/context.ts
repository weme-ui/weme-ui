import type { ProjectPaths } from '@weme-ui/schema'
import fs from 'node:fs'
import { exit } from 'node:process'
import * as p from '@clack/prompts'
import path from 'pathe'
import { selectRegistry } from '../../../utils/schema/registry'

export interface InitProjectContext {
  repo: string
  registry: string
  directory: string
  prefix: string
  access: string
  paths: ProjectPaths
  cwd: string
}

export async function createContext(args: Record<string, any>): Promise<InitProjectContext> {
  const cwd = path.resolve(args.cwd)

  if (!fs.existsSync(cwd))
    fs.mkdirSync(cwd, { recursive: true })

  const components = await p.text({
    message: 'Please enter a default path to install the components.',
    placeholder: '~/components',
    defaultValue: '~/components',
    validate: (value: string) => {
      if (!value)
        return 'Path is required!'
    },
  })

  if (p.isCancel(components)) {
    p.cancel('Operation cancelled.')
    exit(0)
  }

  const repo = args.repo || 'weme-ui/weme-ui'
  const registry = await selectRegistry(repo)

  const prefix = await p.text({
    message: 'What is the prefix of the registry?',
    placeholder: registry.prefix,
    defaultValue: registry.prefix,
  })

  if (p.isCancel(prefix)) {
    p.cancel('Operation cancelled.')
    exit(0)
  }

  return {
    repo,
    registry: registry.name,
    directory: registry.directory,
    prefix,
    access: registry.access,
    paths: {
      components,
    },
    cwd,
  }
}
