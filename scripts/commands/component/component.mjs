import { existsSync } from 'node:fs'
import { consola } from 'consola'
import { join } from 'pathe'
import { kebabCase, titleCase } from 'scule'
import { renderTemplates } from '../../utils/template.mjs'

export async function generateComponent(src, dest, templates, data) {
  const { name, registry } = data

  consola.start(`Generating \`${titleCase(registry)}\` component \`${titleCase(name)}\`...`)

  let destPath = join(dest, kebabCase(name))

  if (name.includes('-')) {
    const parentName = name.split('-').shift()
    const parentPath = join(dest, parentName)

    if (existsSync(parentPath)) {
      const inside = await consola.prompt(
        `Component \`${parentName}\` already exists. Do you want to create the component inside it?`,
        {
          type: 'confirm',
          initial: false,
        },
      )

      if (inside)
        destPath = parentPath
    }
  }

  await renderTemplates(src, destPath, templates, data)

  consola.success(`\`${titleCase(name)}\` component generated!`)
}
