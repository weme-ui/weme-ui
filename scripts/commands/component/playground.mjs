import { consola } from 'consola'
import { titleCase } from 'scule'
import { renderTemplates } from '../../utils/template.mjs'

export async function generatePlayground(src, dest, templates, data) {
  const { name, registry } = data

  const needPlayground = await consola.prompt(
    `Do you want to create a playground for the \`${titleCase(name)}\` component?`,
    {
      type: 'confirm',
      initial: true,
    },
  )

  if (!needPlayground)
    return

  consola.start(`Generating \`${titleCase(registry)}\` component \`${titleCase(name)} playground\`...`)

  await renderTemplates(src, dest, templates, data)

  consola.success(`\`${titleCase(name)}\` playground generated!`)
}
