import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { consola } from 'consola'
import { mkdirp } from 'mkdirp'
import { asyncWriteFile } from '../../utils/file.mjs'
import { renderTemplate } from '../../utils/template.mjs'

export async function generateTemplates(name, registry, root, templates) {
  consola.start(`Generating \`${registry}\` component \`${name}\`...`)

  let destPath = join(root, name)

  if (name.includes('-')) {
    const parentName = name.split('-').shift()

    if (existsSync(join(root, parentName))) {
      const inside = await consola.prompt(
        `Component \`${parentName}\` already exists. Do you want to create the component inside it?`,
        {
          type: 'confirm',
          initial: false,
        },
      )

      if (inside)
        destPath = join(root, parentName)
    }
  }

  if (!existsSync(destPath))
    await mkdirp(destPath)

  for (const template of templates) {
    const content = renderTemplate(`component/${template}`, { name })
    const destFilename = `${name}.${template.replace('.hbs', '')}`

    if (!content) {
      consola.error(`Failed to render component template \`${template}\``)
      continue
    }

    await asyncWriteFile(resolve(destPath, destFilename), content)
  }

  consola.success('Component generated!')
}
