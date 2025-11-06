import * as p from '@clack/prompts'
import chalk from 'chalk'
import path from 'pathe'
import { installDependencies, runDevPrepare } from '../../../utils/schema/package'
import { createContext } from './context'
import { generateTemplates } from './templates'

export default async function (args: Record<string, any>) {
  p.intro(chalk.bold.blue('✨ Initializing Weme UI Registry'))

  const ctx = await createContext(args)
  const cwd = path.join(ctx.cwd, ctx.directory)

  await generateTemplates(ctx)
  await installDependencies([
    '@vueuse/core',
    'clsx',
    'tailwind-merge',
    'tailwind-variants',
    'reka-ui',
    'unocss',
    'nuxt',
    'vue',
    'vue-router',
  ], { cwd })
  await runDevPrepare(cwd)

  p.note([
    `1. Enter the registry directory: ${chalk.cyan(`cd ${ctx.directory}`)}`,
    `2. Start development server: ${chalk.cyan('pnpm dev')}`,
    `3. Build registry: ${chalk.cyan('pnpm @weme-ui/nuxt build')}`,
  ].join('\n'), 'Next?')

  p.outro('🥤 All done!')
}
