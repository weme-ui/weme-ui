import { consola } from 'consola'
import { resolve } from 'pathe'
import { titleCase } from 'scule'
import { mkdirs } from '../../utils/file.mjs'
import { renderTemplates } from '../../utils/template.mjs'

export async function generateRegistry(src, dest, templates, data) {
  const { name } = data

  consola.start(`Generating registry \`${titleCase(name)}\`...`)

  await renderTemplates(src, dest, templates, data)

  // Generate folders
  mkdirs(
    resolve(dest, 'components'),
    resolve(dest, 'themes'),
  )

  consola.success(`\`${titleCase(name)}\` registry generated!`)
}
