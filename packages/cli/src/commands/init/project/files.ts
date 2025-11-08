import type { InitProjectContext } from './context'
import { Buffer } from 'node:buffer'
import fs from 'node:fs'
import * as p from '@clack/prompts'
import { PROJECT_FILE_NAME, PROJECT_SCHEMA_URL, projectSchema } from '@weme-ui/schema'
import chalk from 'chalk'
import path from 'pathe'
import { fetchBinary, fetchURL } from '../../../utils/fetch'
import { runStep } from '../../../utils/utilities'

export async function createFiles(ctx: InitProjectContext) {
  await runStep('Generating project files...', async (spinner) => {
    await Promise.all([
      'app/app.vue',
      'public/robots.txt',
      'public/favicon.ico',
      'package.json',
      'tsconfig.json',
      '.gitignore',
      'README.md',
    ].map(async (file) => {
      spinner.message(`Generating ${chalk.cyan(file)}...`)

      const isFavicon = file === 'public/favicon.ico'
      const fetchFn = isFavicon ? fetchBinary : fetchURL

      const content = await fetchFn(
        `https://raw.githubusercontent.com/weme-ui/templates/refs/heads/main/project/${file}`,
      )

      if (content) {
        const filePath = path.join(ctx.cwd, file)
        const dirname = path.dirname(filePath)

        if (!fs.existsSync(dirname))
          fs.mkdirSync(dirname, { recursive: true })

        if (isFavicon) {
          const buffer = Buffer.from(content as ArrayBuffer)
          fs.writeFileSync(filePath, buffer, {
            flag: 'w',
          })
        }
        else {
          fs.writeFileSync(
            path.join(ctx.cwd, file),
            content as string,
            {
              encoding: 'utf8',
              flag: 'w',
            },
          )
        }
      }
    }))

    spinner.stop('Project files generated!')
  })
}

export async function createNuxtConfig(ctx: InitProjectContext) {
  await runStep(`Generating ${chalk.cyan('nuxt.config.ts')}...`, async (spinner) => {
    const lines: string[] = [
      'export default defineNuxtConfig({',
      '  modules: [',
      '    \'@weme-ui/nuxt\',',
      '  ],',
      '',
      '  devtools: {',
      '    enabled: true,',
      '  },',
      '',
      `  compatibilityDate: ${JSON.stringify(new Date().toISOString().slice(0, 10))},`,
      '})',
    ]

    fs.writeFileSync(
      path.join(ctx.cwd, 'nuxt.config.ts'),
      `${lines.join('\n')}\n`,
      {
        encoding: 'utf8',
        flag: 'w',
      },
    )

    spinner.stop(`${chalk.cyan('nuxt.config.ts')} generated!`)
  })
}

export async function createProjectConfig(ctx: InitProjectContext) {
  return await runStep(`Generating ${chalk.cyan(PROJECT_FILE_NAME)}...`, async (spinner) => {
    const config = projectSchema.safeParse({
      $schema: PROJECT_SCHEMA_URL,
      repos: [
        {
          repo: ctx.repo,
          registry: ctx.registry,
          prefix: ctx.prefix,
          default: true,
        },
      ],
      paths: ctx.paths,
    })

    if (!config.success) {
      p.log.error(config.error.message)
      return
    }

    fs.writeFileSync(
      path.join(ctx.cwd, PROJECT_FILE_NAME),
      `${JSON.stringify(config.data, null, 2)}\n`,
      {
        encoding: 'utf8',
        flag: 'w',
      },
    )

    spinner.stop(`${chalk.cyan(PROJECT_FILE_NAME)} generated!`)

    return config.data
  })
}
