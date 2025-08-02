import { consola } from 'consola'
import handlebars from 'handlebars'
import { dirname, join, resolve } from 'pathe'
import { camelCase, kebabCase, pascalCase, titleCase } from 'scule'
import { mkdirs, readFile, readJsonFile, writeFile } from './file.mjs'

// Title Case
handlebars.registerHelper('titleCase', titleCase)
// kebab-case
handlebars.registerHelper('kebabCase', kebabCase)
// camelCase
handlebars.registerHelper('camelCase', camelCase)
// PascalCase
handlebars.registerHelper('pascalCase', pascalCase)
// lowercase
handlebars.registerHelper('lowerCase', value => value.toLowerCase())

export function compile(input, data) {
  return handlebars.compile(input)(data)
}

/**
 * Render templates to destination.
 *
 * @param {string} tplPath - Templates root path.
 * @param {string} destPath - Destination root path.
 * @param {Array<{ tpl: string, dest: string }>} templates - Templates to render.
 * @param {object} data - Data to render templates.
 *
 * @example
 * ```
 * await renderTemplates(
 *   'scripts/templates/component',
 *   'registry/web/components',
 *   [
 *     { tpl: 'vue.hbs', dest: '{{ kebabCase name }}.vue' },
 *     { tpl: 'props.ts.hbs', dest: '{{ kebabCase name }}.props.ts' },
 *     { tpl: 'style.ts.hbs', dest: '{{ kebabCase name }}.style.ts' },
 *   ],
 *   { name: 'Button' },
 * )
 * ```
 */
export async function renderTemplates(tplPath, destPath, templates, data) {
  const tplData = resolveTemplateData(data)

  for (const { tpl, dest } of templates) {
    const fileName = compile(dest, tplData)
    const filePath = resolve(join(destPath, fileName))

    mkdirs(dirname(filePath))

    const content = compile(readFile(resolve(join(tplPath, tpl))), tplData)

    if (!content) {
      consola.error(`Failed to render template \`${fileName}\``)
      continue
    }

    await writeFile(filePath, content)
  }
}

function resolveTemplateData(data) {
  const {
    version,
    packageManager,
    author,
    license,
  } = readJsonFile('package.json')

  return {
    ...data,
    version,
    packageManager,
    author,
    license,
  }
}
