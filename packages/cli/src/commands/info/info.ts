import type { IProjectRegistry } from '@weme-ui/schema'
import type { PackageJson } from 'pkg-types'
import { readFileSync } from 'node:fs'
import { exit } from 'node:process'
import chalk from 'chalk'
import path from 'pathe'
import { pascalCase } from 'scule'
import { runStep } from '../../utils'
import consola from '../../utils/consola'
import { parseRepositoryURL } from '../../utils/schema'
import { Project } from '../../utils/schema/project'

export default async function (args: Record<string, any>) {
  args.cwd = path.resolve(args.cwd)

  try {
    const project = new Project(args.cwd)

    if (!await project.exists()) {
      throw new Error('Project not found')
    }

    // Step 1. Fetch project information.
    const info = await runStep('Fetching project information...', async () => {
      const pkg = readFileSync(path.join(args.cwd, 'package.json'), 'utf-8')

      if (!pkg) {
        throw new Error('Package.json not found')
      }

      const pkgJson = JSON.parse(pkg) as PackageJson

      const schema = await project.schema()

      if (schema.isErr()) {
        throw new Error(schema.error)
      }

      const items = await project.items()
      const {
        newItems,
        updateItems,
        skippedItems,
      } = await project.groupItemsByState(items)
      const groupedItems = project.groupItemsByRegistry(items)

      return {
        name: pkgJson.name,
        version: pkgJson.version,
        description: pkgJson.description,
        registries: schema.value.repos,
        files: items.reduce((acc, item) => acc + item.files.length, 0),
        newItems,
        updateItems,
        skippedItems,
        groupedItems,
      }
    })

    // Step 2. Project information.
    const name = pascalCase(info.description || info.name || '')
    const version = info.version || '0.0.0'

    consola.info(`${chalk.whiteBright.bold(name)} ${chalk.gray(`v${version}`)}`)
    console.log()

    // Step 3. Installed items.
    Object.entries(info.groupedItems).forEach(
      ([registry, items]) => {
        consola.info(`${chalk.cyan.bold.underline(registry)}`)
        const maxLen = items.reduce(
          (acc, item) => {
            const len = `${item.prefix}${item.name}`.length
            if (len > acc)
              acc = len

            return acc
          },
          0,
        )
        console.log(items.map(
          (i, index) => {
            let item = `${pascalCase(`${i.prefix}-${i.name}`)}`

            if (index % 4 === 0)
              item = `\n${item}`

            return item.padEnd(maxLen + 1) + chalk.dim.cyan(`(${i.files.length})   `)
          },
        ).join(''))
        console.log()
      },
    )

    // Step 4. Registries information.
    const [
      repos,
      registries,
    ] = await runStep(`Stats registries...`, async () => {
      const grouped = info.registries.reduce(
        (acc, reg) => {
          const { name } = parseRepositoryURL(reg.repo!)

          acc[name] = acc[name] || []
          acc[name].push(reg)

          return acc
        },
        {} as Record<string, IProjectRegistry[]>,
      )

      return [
        Object.keys(grouped).length,
        info.registries.length,
      ]
    })

    console.log(chalk.gray(
      [
        `${chalk.yellow(repos)} repositories`,
        `${chalk.yellow(registries)} registries`,
        `${chalk.yellow(info.skippedItems.length + info.updateItems.length)} installed`,
        `${chalk.yellow(info.files)} files`,
        `${chalk.yellow(info.updateItems.length)} available updates`,
      ].join(', '),
    ))

    // Step 5. Next steps.
    console.log()
    console.log(`Run ${chalk.cyan('pnpm dlx @weme-ui/weme-ui add')} to add more items.`)

    if (info.updateItems.length)
      console.log(`Run ${chalk.cyan('pnpm dlx @weme-ui/weme-ui update')} to update all installed items.`)
  }
  catch (e: any) {
    consola.error(e.message)
    exit(0)
  }
}
