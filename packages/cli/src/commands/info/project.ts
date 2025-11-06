import { exit } from 'node:process'
import chalk from 'chalk'
import columnify from 'columnify'
import path from 'pathe'
import { getGithubRepoName } from '../../utils/fetch'
import { loadProjectInfo } from '../../utils/schema/project'

export default async function (args: Record<string, any>) {
  args.cwd = path.resolve(args.cwd)

  const result = await loadProjectInfo(args.cwd)

  if (result.isErr()) {
    console.error(result.unwrapErr())
    exit(1)
  }

  const info = result.unwrap()

  const name = info.description || info.name || ''
  const version = info.version || '0.0.0'

  console.log(`${chalk.whiteBright.bold(name)} ${chalk.gray(`version ${version}`)}`)
  console.log('')

  info.repos.forEach((repo) => {
    const registries = info.registries.filter(r => r.repo === repo)

    if (registries.length) {
      console.log(`${chalk.bold.cyan(`@${getGithubRepoName(repo)}`)} ${chalk.dim(`(${registries.length})`)}`)
      console.log('')

      console.log(
        columnify(
          // Data
          registries.map(r => ({
            default: r.default,
            name: [
              `${r.name}@${r.version} ${chalk.dim(`(${r.prefix})`)}`,
              chalk.dim(r.description),
            ].join('\n'),
            access: r.access,
          })),

          // Options
          {
            showHeaders: false,
            preserveNewLines: true,
            config: {
              default: {
                align: 'right',
                minWidth: 3,
                dataTransform: data => data === 'true' ? chalk.greenBright('✓') : '',
              },
              name: {
                dataTransform: data => `  ${chalk.whiteBright(data)}`,
              },
              access: {
                minWidth: 4,
                dataTransform: data => data === 'private' ? '🔒' : '',
              },
            },
          },
        ),
      )

      console.log('')
      console.log(chalk.gray(
        [
          `  ${chalk.yellow(registries.reduce((acc, r) => acc + r.available, 0))} available`,
          `${chalk.yellow(registries.reduce((acc, r) => acc + r.installed, 0))} installed`,
        ].join(', '),
      ))
    }
  })

  console.log('')
  console.log(`Run ${chalk.cyan('pnpm dlx @weme-ui/weme-ui info <registry-name>')} to get more information about a specific registry.`)
  console.log(`Run ${chalk.cyan('pnpm dlx @weme-ui/weme-ui update')} to update all installed items.`)
}
