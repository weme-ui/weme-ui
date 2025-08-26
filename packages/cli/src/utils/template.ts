import { existsSync } from 'node:fs'
import { cwd, exit } from 'node:process'
import { downloadTemplate } from 'giget'
import handlebars from 'handlebars'
import { relative, resolve } from 'pathe'
import { camelCase, kebabCase, pascalCase, titleCase } from 'scule'
import { consola } from '~/utils/consola'
import { readFile, writeFile } from './file'

const TEMPLATES_PATH = resolve(cwd(), '.templates')

handlebars.registerHelper('titleCase', value => titleCase(value))
handlebars.registerHelper('kebabCase', value => kebabCase(value))
handlebars.registerHelper('camelCase', value => camelCase(value))
handlebars.registerHelper('pascalCase', value => pascalCase(value))
handlebars.registerHelper('lowerCase', value => value.toLowerCase())
handlebars.registerHelper('erase', (value, target) => value.replaceAll(target, ''))

export function compile(input: string, data?: Record<string, any>) {
  return handlebars.compile(input)(data)
}

export function getTemplatePath(template: string) {
  const dest = template.slice(template.lastIndexOf(':') + 1, template.length).replace(/\//g, '-')
  const templatePath = resolve(TEMPLATES_PATH, dest)

  return existsSync(templatePath) ? templatePath : template
}

export async function downloadRemoteTemplate({ template }: Record<string, any>) {
  const dest = template.slice(template.lastIndexOf(':') + 1, template.length).replace(/\//g, '-')
  const templatePath = resolve(TEMPLATES_PATH, dest)

  if (existsSync(templatePath)) {
    consola.info(`Using cached template: \`${relative(cwd(), templatePath)}\``)
    return templatePath
  }

  consola.start('Downloading template...')

  try {
    const result = await downloadTemplate(template, {
      cwd: TEMPLATES_PATH,
      dir: dest,
    })

    consola.success(`Downloaded template: \`${relative(cwd(), result.dir)}\``)

    return result.dir
  }
  catch (error: any) {
    consola.error(error.message)
    exit(1)
  }
}

export async function renderTemplates({
  templates = [],
  data = {},
  ...options
}: {
  src: string
  dest: string
  templates: { src: string, dest: string }[]
  data?: Record<string, any>
}) {
  const resolvedData = data || {}

  for (const { src, dest } of templates) {
    const fileName = compile(dest, resolvedData)
    const filePath = resolve(options.dest, fileName)
    const content = readFile(resolve(options.src, src)) || ''
    const compiled = compile(content, resolvedData)

    if (!compiled) {
      consola.error(`Failed to render template \`${fileName}\``)
      continue
    }

    await writeFile(filePath, compiled, { flag: 'w', quiet: data.force })
  }
}
