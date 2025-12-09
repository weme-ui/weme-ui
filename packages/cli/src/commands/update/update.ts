import type { IInlineCssVar } from '@weme-ui/schema'
import type { IProjectResolvedItem } from '../../types'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { PROJECT_FILE_NAME, ProjectSchema } from '@weme-ui/schema'
import chalk from 'chalk'
import defu from 'defu'
import { createPatch } from 'diff'
import { mkdirp } from 'mkdirp'
import path from 'pathe'
import clone from 'rfdc'
import { runStep } from '../../utils'
import consola from '../../utils/consola'
import { createHighlightedPatch, Project } from '../../utils/schema'

export async function update(fullName: string, items: IProjectResolvedItem[], cwd: string) {
  consola.success(chalk.gray(`Fetched ${chalk.yellow(items.length)} items from ${chalk.cyan(`@${fullName}`)}`))
  console.log()

  const project = new Project(cwd)

  const localItems = await runStep('Loading project items...', async () => {
    return await project.items()
  })

  const schema = await project.schema()

  if (schema.isErr()) {
    throw new Error(schema.error)
  }

  const stats = { new: 0, updated: 0, cssVars: 0, deprecated: 0 }
  const data = clone()(schema.value)

  await Promise.all(items.map(
    async (updateItem) => {
      const localItem = localItems.find(i => i.name === updateItem.name)

      if (!localItem)
        throw new Error(`Project item ${updateItem.name} not found`)

      let display = true

      // 1. Update file content
      await Promise.all(updateItem.files.map(
        async (updateFile) => {
          const localFile = localItem.files.find(
            f => path.basename(f.path) === path.basename(updateFile.path),
          )

          const filePath = await project.withRegistryPath(updateItem.repo, updateItem.registry, updateFile.path)

          if (localFile) {
            // Update content
            if (updateFile.hash !== localFile.hash) {
              if (display) {
                console.log(`${localItem.registry}/${localItem.name} ⇢ ${chalk.underline(path.relative(cwd, filePath))}`)
                console.log()
                const patch = createPatch(filePath, localFile.content, updateFile.content)
                console.log(createHighlightedPatch(patch))

                display = false
              }

              writeFileSync(filePath, updateFile.content, {
                encoding: 'utf8',
                flag: 'w',
              })

              stats.updated++
            }
          }
          else {
            writeFileSync(filePath, updateFile.content, {
              encoding: 'utf8',
              flag: 'w',
            })

            stats.new++
          }
        },
      ))

      // 2. Add CssVars
      if (
        updateItem.cssVars
        && Object.keys(updateItem.cssVars).length > 0
        && updateItem.cssVars !== localItem.cssVars
      ) {
        const cssVars = Object.entries(updateItem.cssVars).reduce(
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
        stats.cssVars = stats.cssVars + Object.keys(cssVars).length
      }

      // 3. Check registry deprecated files
      if (updateItem.registryDependencies && updateItem.registryDependencies !== localItem.registryDependencies) {
        const registryDependencies = await runStep(`Checking deprecated files...`, async () => {
          const result: IProjectResolvedItem[] = []

          await Promise.all(updateItem.registryDependencies!.map(
            async (name) => {
              const registry = project.useRegistry(updateItem.repo, updateItem.registry)

              if (!(await project.hasItem(updateItem.repo, updateItem.registry, name))) {
                const depItem = await registry.resolveItem({
                  name,
                  repo: updateItem.repo,
                  registry: updateItem.registry,
                  prefix: updateItem.prefix,
                })

                if (depItem.isOk()) {
                  result.push(depItem.value)
                }
              }
            },
          ))

          return result
        })

        if (registryDependencies.length) {
          // 2.1 Create files
          await runStep(`Adding registry deprecated items...`, async () => {
            await Promise.all(registryDependencies.map(
              async (item) => {
                await Promise.all(item.files.map(
                  async (file) => {
                    const filePath = await project.withRegistryPath(item.repo, item.registry, file.path)
                    const fileDir = path.dirname(filePath)

                    if (!existsSync(fileDir)) {
                      await mkdirp(fileDir)
                    }

                    writeFileSync(filePath, file.content, {
                      encoding: 'utf8',
                      flag: 'w',
                    })
                  },
                ))
              },
            ))
          })

          // 2.2 Add item to project config
          await runStep(`Add item to project config...`, async () => {
            await Promise.all(registryDependencies.map(
              async (item) => {
                const itemPath = await project.withoutRegistryPath(item)

                data.items = data.items || {}
                data.items[item.repo] = data.items[item.repo] || {}
                data.items[item.repo][item.registry] = data.items[item.repo][item.registry] || []
                data.items[item.repo][item.registry].push({
                  name: item.name,
                  type: item.type,
                  path: itemPath,
                })
              },
            ))
          })

          // 2.3 Add CssVars
          await runStep(`Add CssVars to project config...`, async () => {
            await Promise.all(registryDependencies.map(
              async (item) => {
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
              },
            ))
          })

          // 2.4 Update types
          await runStep(`Update types...`, async () => {
            const depItems = registryDependencies.filter(
              i => i.files.some(f => f.type === 'type'),
            )

            await Promise.all(depItems.map(
              async (item) => {
                await Promise.all(item.files.filter(f => f.type === 'type').map(
                  async (file) => {
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

                    if (file.path.includes('components')) {
                      const newLine = `export * from '${file.path.replace('components', path.join(data.paths.components, item.prefix)).replace('.ts', '')}'`

                      if (!lines.includes(newLine)) {
                        lines.push(newLine)

                        const typesContent = `${lines.filter(Boolean).sort((a, b) => a.localeCompare(b)).join('\n')}\n`

                        writeFileSync(typesComponents, typesContent, {
                          encoding: 'utf8',
                          flag: 'w',
                        })
                      }
                    }
                  },
                ))
              },
            ))
          })

          stats.deprecated += registryDependencies.length
        }
      }
    },
  ))

  // 4. Update project config file
  await runStep(`Update project config...`, async () => {
    const result = ProjectSchema.safeParse(data)

    if (!result.success)
      throw new Error(result.error.message)

    writeFileSync(
      project.withRootPath(PROJECT_FILE_NAME),
      `${JSON.stringify(result.data, null, 2)}\n`,
    )
  })

  // 5. Print stats
  if (stats.new)
    consola.success(`Created ${chalk.green(stats.new)} files.`)

  if (stats.updated)
    consola.success(`Updated ${chalk.green(stats.updated)} files.`)

  if (stats.cssVars)
    consola.success(`Updated ${chalk.green(stats.cssVars)} css vars.`)

  if (stats.deprecated)
    consola.success(`Added ${chalk.green(stats.deprecated)} deprecated items.`)
}
