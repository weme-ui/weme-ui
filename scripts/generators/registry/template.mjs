import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { consola } from 'consola'
import { mkdirp } from 'mkdirp'
import { asyncWriteFile } from '../../utils/file.mjs'
import { renderTemplate } from '../../utils/template.mjs'

export async function generateTemplates(name, destPath, templates) {
  consola.start(`Generating registry \`${name}\`...`)

  if (!existsSync(destPath))
    await mkdirp(destPath)

  for (const template of templates) {
    const content = renderTemplate(`registry/${template}`, { name })
    const destFilename = `${template.replace('.hbs', '')}`

    if (!content) {
      consola.error(`Failed to render registry template \`${template}\``)
      continue
    }

    await asyncWriteFile(resolve(destPath, destFilename), content)
  }

  consola.success('Registry generated!')
}
