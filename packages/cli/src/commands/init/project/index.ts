import * as p from '@clack/prompts'
import chalk from 'chalk'
import { runDevPrepare } from '../../../utils/schema/package'
import { installRegistryItems } from '../../../utils/schema/project'
import { createContext } from './context'
import { createFiles, createNuxtConfig, createProjectConfig } from './files'

export default async function (args: Record<string, any>) {
  p.intro(chalk.bold.blue('✨ Initializing Weme UI Project'))

  const ctx = await createContext(args)
  const project = await createProjectConfig(ctx)

  if (project) {
    await createFiles(ctx)
    await createNuxtConfig(ctx)

    await installRegistryItems(
      ctx.cwd,
      ctx.repo,
      ctx.registry,
      project,
      { type: 'init' },
    )

    await runDevPrepare(ctx.cwd)
  }
  else {
    p.log.error('Failed to create project configuration file.')
  }

  p.outro('🥤 All done!')
}
