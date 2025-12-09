import type { IRegistryItem, IRegistryItemFile } from '@weme-ui/schema'
import fs from 'node:fs'
import { exit } from 'node:process'
import { REGISTRY_FILE_NAME, RegistrySchema } from '@weme-ui/schema'
import path from 'pathe'
import { titleCase } from 'scule'
import SparkMD5 from 'spark-md5'
import { REGISTRY_DIRNAME } from '../../../constants'
import { compile, fetchURL, runStep } from '../../../utils'
import consola from '../../../utils/consola'
import { LocalRegistry } from '../../../utils/schema'
import { createContext } from './context'

export default async function (args: Record<string, any>) {
  try {
    const ctx = await createContext(args)

    // Step 1. Create component files.
    const files = await runStep(`Creating ${ctx.name} component files...`, async (spinner) => {
      const files: IRegistryItemFile[] = []

      await Promise.all([
        '{{ name }}.vue.hbs',
        '{{ name }}.props.ts.hbs',
        '{{ name }}.style.ts.hbs',
      ].map(
        async (file) => {
          const fileName = compile(file.replace('.hbs', ''), ctx)

          spinner.text = `Creating ${fileName}...`

          const template = await fetchURL(
            `https://raw.githubusercontent.com/weme-ui/templates/refs/heads/main/component/${file}`,
          )
          if (!template) {
            throw new Error(`Failed to fetch ${file}.`)
          }

          const content = compile(template, ctx)
          if (!content)
            throw new Error(`Failed to compile template: ${file}.`)

          const filePath = path.join('components', ctx.asChild ? ctx.parent : ctx.name, fileName)
          const fullPath = path.join(ctx.cwd, REGISTRY_DIRNAME, ctx.scope, filePath)
          const fileDir = path.dirname(fullPath)

          if (!fs.existsSync(fileDir))
            fs.mkdirSync(fileDir, { recursive: true })

          fs.writeFileSync(fullPath, content, {
            encoding: 'utf8',
            flag: 'w',
          })

          const hash = SparkMD5.hash(content)

          files.push({
            type: filePath.endsWith('.vue')
              ? 'component'
              : filePath.endsWith('.props.ts')
                ? 'type'
                : 'style',
            path: filePath,
            hash,
          })
        },
      ))

      spinner.succeed(`Created ${files.length} files.`)

      return files
    })

    // Step 2. Add type index.
    if (files.length) {
      await runStep('Adding type index...', async (spinner) => {
        try {
          const typesDir = path.join(ctx.cwd, REGISTRY_DIRNAME, ctx.scope, 'types')
          const typesIndexFile = path.join(typesDir, 'index.ts')
          const typesComponentsFile = path.join(typesDir, 'components.ts')

          const propsFile = files.find(f => f.path.endsWith('.props.ts'))
          if (!propsFile) {
            throw new Error('No props file found.')
          }

          const lines: string[] = []
          const newLine = `export * from \'~/${propsFile.path.replace('.ts', '')}\'`

          if (!fs.existsSync(typesDir))
            fs.mkdirSync(typesDir, { recursive: true })

          if (fs.existsSync(typesComponentsFile)) {
            const content = fs.readFileSync(typesComponentsFile, 'utf8')
            if (content) {
              lines.push(
                ...content.split('\n'),
              )
            }
          }

          if (!lines.includes(newLine))
            lines.push(newLine)

          if (lines.length > 0) {
            fs.writeFileSync(typesComponentsFile, `${lines.filter(Boolean).sort((a, b) => a.localeCompare(b)).join('\n')}\n`, {
              encoding: 'utf8',
              flag: 'w',
            })
          }

          if (!fs.existsSync(typesIndexFile)) {
            fs.writeFileSync(typesIndexFile, 'export * from \'./components\'\n', {
              encoding: 'utf8',
              flag: 'w',
            })
          }

          spinner.succeed('Type index added.')
        }
        catch (e: any) {
          throw new Error(`Failed to add type index: ${e.message}`)
        }
      })
    }

    // Step 3. Add to registry.
    await runStep('Adding to registry...', async (spinner) => {
      try {
        const registry = new LocalRegistry(ctx.cwd, ctx.scope)
        const schema = await registry.schema()

        const resolvedName = ctx.asChild ? ctx.parent : ctx.name

        const items: IRegistryItem[] = schema.isOk() ? schema.value.items : []
        const item: IRegistryItem = items.find(i => i.name === resolvedName) || {
          name: resolvedName,
          type: 'component',
          title: titleCase(resolvedName),
          description: '',
          files: [],
        }
        item.files.push(...files.filter(Boolean))

        if (!items.find(i => i.name === resolvedName))
          items.push(item)

        const result = RegistrySchema.safeParse(schema)
        if (!result.success) {
          throw new Error(result.error.message)
        }

        fs.writeFileSync(
          path.join(ctx.cwd, REGISTRY_DIRNAME, ctx.scope, REGISTRY_FILE_NAME),
          `${JSON.stringify(result.data, null, 2)}\n`,
          { encoding: 'utf8', flag: 'w' },
        )
      }
      catch (e: any) {
        throw new Error(`Failed to update registry: ${e.message}`)
      }

      spinner.succeed('Registry.json updated!')
    })
  }
  catch (e: any) {
    consola.error(e.message)
    exit(0)
  }
}
