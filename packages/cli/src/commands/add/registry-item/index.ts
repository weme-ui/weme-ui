import * as p from '@clack/prompts'
import chalk from 'chalk'
import { installRegistryItems } from '../../../utils/schema/project'
import { createContext } from './context'

export default async function (args: Record<string, any>) {
  p.intro(chalk.bold.blue('✨ Adding Registry Items'))

  const ctx = await createContext(args)

  await installRegistryItems(
    ctx.cwd,
    ctx.repo,
    ctx.registry,
    ctx.project,
    { name: ctx.names },
  )

  p.outro('🥤 All done!')
}
