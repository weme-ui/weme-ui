import { exit } from 'node:process'
import chalk from 'chalk'
import columnify from 'columnify'
import path from 'pathe'
import { titleCase } from 'scule'
import { getGithubRepoName } from '../../utils/fetch'
import { loadProjectInfo } from '../../utils/schema/project'
import { fetchManifestConfig } from '../../utils/schema/registry'

/**
 * Display registry information.
 *
 * @example
 * ```bash
 * pnpm dlx @weme-ui/weme-ui info weme-ui/std
 *
 * The standard components for Weme UI.
 *
 * @weme-ui/weme-ui  ⇢  weme-ui/std (0.0.0) 🔒
 *
 * Available items:
 *
 * Components   46
 * Layouts       0
 * Themes        0
 * Blocks        0
 * Pages         0
 *
 * 46 available, 0 installed
 *
 * Run pnpm dlx @weme-ui/weme-ui info to get project all information.
 * ```
 */
export default async function (args: Record<string, any>) {
  args.cwd = path.resolve(args.cwd)

  const result = await loadProjectInfo(args.cwd)

  if (result.isErr()) {
    console.error(result.unwrapErr())
    exit(1)
  }

  const info = result.unwrap()
  const registry = info.registries.find(r => r.name === args.name)

  if (!registry) {
    console.error('Registry not found.')
    exit(0)
  }

  if (registry.description) {
    console.log(chalk.bold.whiteBright(registry.description))
    console.log('')
  }

  console.log(
    chalk.cyan.underline(`@${getGithubRepoName(registry.repo)}`),
    chalk.dim(' ⇢ '),
    chalk.underline.white(registry.name) + (registry.access === 'private' ? '🔒' : ''),
    chalk.dim(`(${registry.version})`),
  )

  const manifest = await fetchManifestConfig(registry.repo)

  if (manifest.isErr()) {
    console.error('Could not find repository configuration file!')
    exit(1)
  }

  const total = manifest.unwrap().find(m => m.name === registry.name)

  if (total) {
    console.log('')
    console.log(chalk.dim('Available items:'))
    console.log('')

    console.log(columnify(total.items, {
      showHeaders: false,
      config: {
        key: {
          dataTransform: data => titleCase(data),
        },
        value: {
          minWidth: 4,
          align: 'right',
          dataTransform: data => Number.parseInt(data) > 0 ? chalk.yellow(data) : chalk.dim(data),
        },
      },
    }))

    console.log('')
  }

  console.log(chalk.gray(
    [
      `${chalk.yellow(registry.available)} available`,
      `${chalk.yellow(registry.installed)} installed`,
    ].join(', '),
  ))

  console.log('')
  console.log(`Run ${chalk.cyan('pnpm dlx @weme-ui/weme-ui info')} to get project all information.`)
}
