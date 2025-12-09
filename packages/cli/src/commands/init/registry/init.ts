import fs from 'node:fs'
import { exit } from 'node:process'
import { addDependency, runScript } from 'nypm'
import path from 'pathe'
import { REGISTRY_DIRNAME } from '../../../constants'
import { compile, fetchURL, runStep } from '../../../utils'
import { createContext } from './context'

export default async function (args: Record<string, any>) {
  const ctx = await createContext(args)
  const basePath = path.join(ctx.cwd, REGISTRY_DIRNAME, ctx.scope)

  // Step 1. Create registry files.
  await runStep(`Creating ${ctx.name} registry files...`, async (spinner) => {
    const templates = [
      'README.md.hbs',
      'nuxt.config.ts.hbs',
      'package.json.hbs',
      'registry.json.hbs',
      'tsconfig.json.hbs',
      'uno.config.ts.hbs',
    ]

    if (ctx.initItems) {
      templates.push('utils/props.ts.hbs')
      templates.push('utils/slots.ts.hbs')
      templates.push('utils/styles.ts.hbs')
    }

    await Promise.all(templates.map(
      async (file) => {
        try {
          const fileName = file.replace('.hbs', '')
          spinner.text = `Generating ${fileName}...`

          const template = await fetchURL(
            `https://raw.githubusercontent.com/weme-ui/templates/refs/heads/main/registry/${file}`,
          )
          if (!template)
            throw new Error(`Failed to fetch template: ${file}`)

          const content = compile(template, ctx)
          if (!content)
            throw new Error(`Failed to compile template: ${file}`)

          const filePath = path.join(basePath, fileName)
          const fileDir = path.dirname(filePath)

          if (!fs.existsSync(fileDir))
            fs.mkdirSync(fileDir, { recursive: true })

          fs.writeFileSync(filePath, content, {
            encoding: 'utf8',
            flag: 'w',
          })
        }
        catch (e: any) {
          spinner.fail(e.message)
          exit(0)
        }
      },
    ))
  })

  // Step 2. Install dependencies.
  await runStep('Installing dependencies...', async (spinner) => {
    try {
      await addDependency(['@vueuse/core', 'reka-ui', 'clsx', 'tailwind-merge', 'tailwind-variants'], {
        cwd: basePath,
        silent: true,
      })

      spinner.text = 'Installing development dependencies.'

      await addDependency(['@weme-ui/nuxt', '@weme-ui/unocss-preset', 'vue', 'nuxt', 'vue-router', 'unocss', 'vue-tsc'], {
        cwd: basePath,
        dev: true,
        silent: true,
      })
    }
    catch (e: any) {
      spinner.fail(e.message)
      exit(0)
    }
  })

  // Step 3. Done.
  await runStep('Prepare registry...', async (spinner) => {
    await runScript('dev:prepare', {
      cwd: basePath,
      silent: true,
    })

    spinner.succeed('Registry created successfully.')
  })
}
