import type { IInlineCssVar } from '@weme-ui/schema'
import type { IProjectResolvedItem } from '../../types'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { PROJECT_FILE_NAME, ProjectSchema } from '@weme-ui/schema'
import chalk from 'chalk'
import defu from 'defu'
import { mkdirp } from 'mkdirp'
import { addDependency } from 'nypm'
import path from 'pathe'
import clone from 'rfdc'
import { pascalCase } from 'scule'
import { runStep } from '../../utils'
import consola from '../../utils/consola'
import { Project } from '../../utils/schema'

export async function install(fullName: string, items: IProjectResolvedItem[], cwd: string) {
  consola.success(chalk.gray(`Fetched ${chalk.yellow(items.length)} items from ${chalk.cyan(`@${fullName}`)}`))
  console.log()

  const project = new Project(cwd)

  const {
    newItems,
    updateItems,
    skippedItems,
  } = await runStep(`Prepare ${chalk.cyan(fullName)} items`, async () => {
    return await project.groupItemsByState(items)
  })

  await Promise.all(items.map(
    async (item) => {
      await runStep(`Installing ${chalk.cyan(item.name)}...`, async (spinner) => {
        const itemName = pascalCase(`${item.prefix}-${item.name}`)

        if (newItems.includes(item)) {
          // 1. Create files
          await Promise.all(item.files.map(
            async (file) => {
              if (file.content) {
                spinner.text = `Creating ${chalk.cyan(itemName)} ${file.type} file ${chalk.cyan(file.path)}...`

                const filePath = await project.withRegistryPath(item.repo, item.registry, file.path)
                const fileDir = path.dirname(filePath)

                if (!existsSync(fileDir)) {
                  await mkdirp(fileDir)
                }

                writeFileSync(filePath, file.content, {
                  encoding: 'utf8',
                  flag: 'w',
                })
              }
            },
          ))

          // 2. Install dependencies
          if (item.dependencies && item.dependencies.length) {
            spinner.text = `Installing ${chalk.cyan(itemName)} package dependencies...`

            await addDependency(item.dependencies, {
              cwd,
              silent: true,
            })
          }

          if (item.devDependencies && item.devDependencies.length) {
            spinner.text = `Installing ${chalk.cyan(itemName)} package dev dependencies...`

            await addDependency(item.devDependencies, {
              cwd,
              dev: true,
              silent: true,
            })
          }

          // 3. Update project config
          const schema = await project.schema()

          if (schema.isErr()) {
            throw new Error(schema.error)
          }

          const data = clone()(schema.value)

          // 3.1 Add new registry to project config
          if (!(await project.hasRegistry(item.repo, item.registry))) {
            data.repos.push({
              repo: item.repo,
              registry: item.registry,
              prefix: item.prefix,
            })
          }

          // 3.2 Add item to project config
          const itemPath = await project.withoutRegistryPath(item)

          data.items = data.items || {}
          data.items[item.repo] = data.items[item.repo] || {}
          data.items[item.repo][item.registry] = data.items[item.repo][item.registry] || []
          data.items[item.repo][item.registry].push({
            name: item.name,
            type: item.type,
            path: itemPath,
          })

          // 3.3 Add CssVars
          if (item.cssVars && Object.keys(item.cssVars).length > 0) {
            const cssVars = Object.entries(item.cssVars).reduce(
              (acc, [name, value]) => {
                Object.entries(value).forEach(([subName, subValue]) => {
                  acc[`${name.toLowerCase()}-${subName.toLowerCase()}`] = subValue.toLowerCase()
                })
                return acc
              },
              {} as IInlineCssVar,
            )

            data.unocss = data.unocss || {}
            data.unocss.cssVars = defu((data.unocss.cssVars || {}), cssVars)
          }

          // 3.4 Update weme.config.json
          const result = ProjectSchema.safeParse(data)

          if (!result.success)
            throw new Error(result.error.message)

          writeFileSync(
            project.withRootPath(PROJECT_FILE_NAME),
            `${JSON.stringify(result.data, null, 2)}\n`,
          )

          // 4. Add types
          const types = item.files.filter(f => f.type === 'type')

          if (types.length) {
            spinner.text = `Adding ${chalk.cyan(itemName)} types...`

            const typesPath = project.withRootPath('app', 'types')
            const typesIndex = project.withRootPath('app', 'types', 'index.ts')
            const typesComponents = project.withRootPath('app', 'types', 'components.ts')

            if (!existsSync(typesPath)) {
              await mkdirp(typesPath)
            }

            if (!existsSync(typesIndex)) {
              writeFileSync(typesIndex, `export * from './components'\n`)
            }

            const lines: string[] = []

            if (existsSync(typesComponents)) {
              const content = readFileSync(typesComponents, 'utf8')
              lines.push(...content.split('\n'))
            }

            types.forEach((f) => {
              if (f.path.includes('components')) {
                const newLine = `export * from '${f.path.replace('components', path.join(data.paths.components, item.prefix)).replace('.ts', '')}'`

                if (!lines.includes(newLine))
                  lines.push(newLine)
              }
            })

            const typesContent = `${lines.filter(Boolean).sort((a, b) => a.localeCompare(b)).join('\n')}\n`

            writeFileSync(typesComponents, typesContent, {
              encoding: 'utf8',
              flag: 'w',
            })
          }

          spinner.succeed(chalk.gray(`Added ${chalk.cyan(itemName)} to ${chalk.white(itemPath)}.`))
        }
        else {
          spinner.warn(chalk.gray(`Skipped ${itemName}, it already exists.`))
        }
      })
    },
  ))

  if (updateItems.length) {
    console.log()
    consola.info(chalk.gray(`You have ${chalk.yellow(updateItems.length)} items available updates.`))
    consola.info(chalk.gray(`Please run ${chalk.cyan('pnpm dlx @weme-ui/weme-ui update')} to update them.`))
    console.log()
  }

  consola.success(`Installed ${chalk.green(newItems.length)} items, skipped ${chalk.yellow(skippedItems.length + updateItems.length)} items.`)
}
