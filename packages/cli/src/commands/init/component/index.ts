import * as p from '@clack/prompts'
import chalk from 'chalk'
import { createContext } from './context'
import { generateTemplates } from './templates'

export default async function (args: Record<string, any>) {
  p.intro(chalk.bold.blue('✨ Initializing Weme UI Component'))

  const ctx = await createContext(args)

  await generateTemplates(ctx)

  p.outro('🥤 All done!')
}
