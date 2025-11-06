import type { InitRegistryContext } from './context'
import fs from 'node:fs'
import path from 'pathe'
import { fetchURL } from '../../../utils/fetch'
import { compile, runStep } from '../../../utils/utilities'

export async function generateTemplates(ctx: InitRegistryContext) {
  await runStep('Generating files...', async (spinner) => {
    await Promise.all([
      'utils/props.ts.hbs',
      'utils/slots.ts.hbs',
      'utils/styles.ts.hbs',
      'README.md.hbs',
      'nuxt.config.ts.hbs',
      'package.json.hbs',
      'registry.json.hbs',
      'tsconfig.json.hbs',
      'uno.config.ts.hbs',
    ].map(
      async (tpl) => {
        try {
          const name = tpl.replace('.hbs', '')

          spinner.message(`Generating ${name}...`)

          const text = await fetchURL(
            `https://raw.githubusercontent.com/weme-ui/templates/refs/heads/main/registry/${tpl}`,
          )
          if (!text) {
            throw new Error(`Failed to fetch ${name}.`)
          }

          const content = compile(text, ctx)
          if (!content) {
            throw new Error(`Failed to compile ${name}.`)
          }

          const filePath = path.join(ctx.cwd, ctx.directory, name)
          const dirname = path.dirname(filePath)

          if (!fs.existsSync(dirname))
            fs.mkdirSync(dirname, { recursive: true })

          fs.writeFileSync(filePath, content, {
            encoding: 'utf8',
            flag: 'w',
          })
        }
        catch (e: any) {
          spinner.stop(e.message)
        }
      },
    ))

    spinner.stop('Files generated.')
  })
}
