import { consola } from 'consola'
import { resolve } from 'pathe'
import { titleCase } from 'scule'
import { copyFile, mkdirs } from '../../utils/file.mjs'
import { renderTemplates } from '../../utils/template.mjs'

export async function generatePlayground(src, dest, templates, data) {
  const { name } = data

  consola.start(`Generating registry \`${titleCase(name)}\` playground...`)

  await renderTemplates(src, dest, templates, data)

  mkdirs(
    resolve(dest, 'public'),
    resolve(dest, 'app', 'pages'),
  )

  // Copy static files
  copyFile(
    resolve(src, 'favicon.ico'),
    resolve(dest, 'public', 'favicon.ico'),
  )

  consola.success(`\`${titleCase(name)}\` registry playground generated!`)
}
