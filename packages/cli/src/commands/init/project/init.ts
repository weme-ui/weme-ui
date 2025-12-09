import { existsSync, writeFileSync } from 'node:fs'
import { exit } from 'node:process'
import { PROJECT_FILE_NAME, PROJECT_SCHEMA_URL, ProjectSchema } from '@weme-ui/schema'
import { mkdirp } from 'mkdirp'
import { addDependency, runScript } from 'nypm'
import path from 'pathe'
import { fetchURL, runStep } from '../../../utils'
import { createContext } from './context'

export default async function (args: Record<string, any>) {
  const ctx = await createContext(args)

  // Step 1. Create project files.
  await runStep('Creating project files...', async (spinner) => {
    await Promise.all([
      'app/app.vue',
      'public/favicon.ico',
      'public/robots.txt',
      '.gitignore',
      'package.json',
      'README.md',
      'tsconfig.json',
      'uno.config.ts',
      'nuxt.config.ts',
    ].map(
      async (file) => {
        try {
          spinner.text = `Creating ${file}...`

          const content = await fetchURL(
            `https://raw.githubusercontent.com/weme-ui/templates/refs/heads/main/project/${file}`,
          )
          if (!content)
            throw new Error('File content is empty')

          const filePath = path.join(ctx.cwd, file)
          const fileDir = path.dirname(filePath)

          if (!existsSync(fileDir)) {
            await mkdirp(fileDir)
          }

          writeFileSync(filePath, content, {
            encoding: 'utf8',
            flag: 'w',
          })
        }
        catch (e: any) {
          throw new Error(`Failed to create file ${file}: ${e.message}`)
        }
      },
    ))
  })

  // Step 2. Create init item files
  if (ctx.inits.length) {
    await runStep('Creating init item files...', async (spinner) => {
      await Promise.all(ctx.inits.map(
        async (item) => {
          // Step 2.1. Create files
          await Promise.all(item.files.map(
            async (file) => {
              spinner.text = `Creating file ${path.join('app', file.path)}...`

              const filePath = path.join(ctx.cwd, 'app', file.path)
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

          // Step 2.2. Add Css variables // TODO
        },
      ))
    })
  }

  // Step 3. Install dependencies.
  await runStep('Installing dependencies...', async (spinner) => {
    try {
      const dependencies = ctx.inits.reduce((acc, item) => {
        if (item.dependencies)
          acc.push(...item.dependencies)

        return acc
      }, [] as string[])

      if (dependencies.length) {
        await addDependency(dependencies, {
          cwd: ctx.cwd,
          silent: true,
        })
      }

      spinner.text = 'Installing development dependencies.'

      const devDependencies = ctx.inits.reduce((acc, item) => {
        if (item.devDependencies)
          acc.push(...item.devDependencies)

        return acc
      }, [] as string[])

      if (devDependencies.length) {
        await addDependency(devDependencies, {
          cwd: ctx.cwd,
          dev: true,
          silent: true,
        })
      }

      spinner.succeed(`Installed ${dependencies.length + devDependencies.length} dependencies.`)
    }
    catch (e: any) {
      spinner.fail(e.message)
      exit(0)
    }
  })

  // Step 4. Create project config file.
  await runStep('Creating project config file...', async (spinner) => {
    const config = ProjectSchema.safeParse({
      $schema: PROJECT_SCHEMA_URL,
      repos: ctx.repos,
      paths: ctx.paths,
    })

    if (!config.success)
      throw new Error(config.error.message)

    writeFileSync(
      path.join(ctx.cwd, PROJECT_FILE_NAME),
      `${JSON.stringify(config.data, null, 2)}\n`,
    )

    spinner.succeed(`Created ${PROJECT_FILE_NAME}.`)
  })

  // Step 5. Done.
  await runStep('Prepare project...', async (spinner) => {
    await runScript('dev:prepare', {
      cwd: ctx.cwd,
      silent: true,
    })

    spinner.succeed('Project created successfully.')
  })
}
