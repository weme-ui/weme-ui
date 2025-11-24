import type { RegistryItem, RegistryItemFile } from '@weme-ui/schema'
import type { InitComponentContext } from './context'
import fs from 'node:fs'
import * as p from '@clack/prompts'
import { REGISTRY_FILE_NAME, registrySchema } from '@weme-ui/schema'
import chalk from 'chalk'
import path from 'pathe'
import { titleCase } from 'scule'
import { REGISTRY_DIRNAME } from '../../../constants'
import { fetchURL } from '../../../utils/fetch'
import { loadRegistryConfig } from '../../../utils/schema/registry'
import { compile, runStep } from '../../../utils/utilities'

export async function generateTemplates(ctx: InitComponentContext) {
  const files = await runStep('Generating files...', async (spinner) => {
    const results: string[] = []

    await Promise.all([
      '{{ name }}.vue.hbs',
      '{{ name }}.props.ts.hbs',
      '{{ name }}.style.ts.hbs',
    ].map(async (tpl) => {
      try {
        const name = compile(tpl.replace('.hbs', ''), ctx)

        spinner.message(`Generating ${name}...`)

        const text = await fetchURL(
          `https://raw.githubusercontent.com/weme-ui/templates/refs/heads/main/component/${tpl}`,
        )
        if (!text) {
          throw new Error(`Failed to fetch ${name}.`)
        }

        const content = compile(text, ctx)
        if (!content) {
          throw new Error(`Failed to compile ${name}.`)
        }

        const filePath = path.join('components', ctx.asChild ? ctx.parent : ctx.name, name)
        const fullPath = path.join(ctx.cwd, REGISTRY_DIRNAME, ctx.registry, filePath)
        const dirname = path.dirname(fullPath)

        if (!fs.existsSync(dirname))
          fs.mkdirSync(dirname, { recursive: true })

        fs.writeFileSync(fullPath, content, {
          encoding: 'utf8',
          flag: 'w',
        })

        results.push(filePath)
      }
      catch (e: any) {
        spinner.stop(e.message)
      }
    }))

    spinner.stop('Files generated.')

    return results
  })

  await updateTypeIndex(files, ctx)
  await updateRegistryJson(files, ctx)
}

async function updateTypeIndex(files: string[], ctx: InitComponentContext) {
  await runStep('Updating type index...', async (spinner) => {
    const typesDir = path.join(ctx.cwd, REGISTRY_DIRNAME, ctx.registry, 'types')
    const componentIndex = path.join(typesDir, 'components.ts')
    const typeIndex = path.join(typesDir, 'index.ts')

    const propsFile = files.find(f => f.endsWith('.props.ts'))

    if (!propsFile)
      return

    const lines: string[] = []
    const newLine = `export * from \'~/${propsFile.replace('.ts', '')}\'`

    if (fs.existsSync(componentIndex)) {
      const content = fs.readFileSync(componentIndex, 'utf8')

      if (content) {
        lines.push(
          ...content.split('\n'),
        )
      }
    }

    if (!fs.existsSync(typesDir))
      fs.mkdirSync(typesDir, { recursive: true })

    if (!lines.includes(newLine))
      lines.push(newLine)

    if (lines.length > 0) {
      fs.writeFileSync(componentIndex, `${lines.sort((a, b) => a.localeCompare(b)).join('\n')}\n`, {
        encoding: 'utf8',
        flag: 'w',
      })
    }

    if (!fs.existsSync(typeIndex)) {
      fs.writeFileSync(typeIndex, 'export * from \'./components\'\n', {
        encoding: 'utf8',
        flag: 'w',
      })
    }

    spinner.stop('Type index updated.')
  })
}

async function updateRegistryJson(files: string[], ctx: InitComponentContext) {
  const registryConfig = loadRegistryConfig(path.resolve(ctx.cwd, REGISTRY_DIRNAME, ctx.registry))

  if (registryConfig.isErr()) {
    p.log.error(registryConfig.unwrapErr())
    return
  }

  const resolvedName = ctx.asChild ? ctx.parent : ctx.name

  const registryJson = registryConfig.unwrap()
  const registryItems: RegistryItem[] = registryJson.items || []
  const registryItem: RegistryItem = registryItems.find(i => i.name === resolvedName) || {
    name: resolvedName,
    type: 'component',
    title: titleCase(resolvedName),
    description: '',
    files: [],
  }

  const registryItemFiles: RegistryItemFile[] = registryItem.files || []

  files.forEach((f) => {
    const file = {
      path: f,
      type: f.endsWith('.vue')
        ? 'component'
        : f.endsWith('.style.ts')
          ? 'style'
          : 'type',
    } satisfies RegistryItemFile

    if (!registryItemFiles.find(i => i.path === f))
      registryItemFiles.push(file)
  })

  registryItem.files = registryItemFiles

  // Registry dependencies
  const registryDeps = registryItems
    .filter(i => i.name !== resolvedName && !i.name.startsWith('#'))
    .map((i) => {
      return {
        label: i.name,
        value: i.name,
        hint: i.description,
      }
    })

  if (registryDeps.length > 0) {
    const hasDeps = await p.confirm({
      message: 'Do you want to add dependencies?',
      initialValue: false,
    })

    if (p.isCancel(hasDeps)) {
      p.cancel('Operation cancelled.')
      return
    }

    if (hasDeps) {
      const dependencies = await p.multiselect({
        message: 'Please select the dependencies:',
        options: registryDeps,
      })

      if (p.isCancel(dependencies)) {
        p.cancel('Operation cancelled.')
        return
      }

      if (dependencies.length > 0) {
        registryItem.registryDependencies = registryItem.registryDependencies || []

        dependencies.forEach((d) => {
          if (!registryItem.registryDependencies?.find(r => r === d))
            registryItem.registryDependencies?.push(d)
        })
      }
    }
  }

  await runStep(`Updating ${chalk.cyan('registry.json')}...`, async (spinner) => {
    if (!registryItems.find(item => item.name === resolvedName))
      registryItems.push(registryItem)

    const result = registrySchema.safeParse(registryJson)

    if (!result.success) {
      spinner.stop(result.error.message)
      return
    }

    fs.writeFileSync(
      path.join(ctx.cwd, REGISTRY_DIRNAME, ctx.registry, REGISTRY_FILE_NAME),
      `${JSON.stringify(result.data, null, 2)}\n`,
    )

    spinner.stop('Registry updated.')
  })
}
