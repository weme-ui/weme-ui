import { consola } from 'consola'
import { titleCase } from 'scule'
import { renderTemplates } from '../../utils/template.mjs'

export async function generateDocument(src, dest, templates, data) {
  const { name, registry } = data

  const needDocument = await consola.prompt(
    `Do you want to create a documentation for the \`${titleCase(name)}\` component?`,
    {
      type: 'confirm',
      initial: true,
    },
  )

  if (!needDocument)
    return

  consola.start(`Generating \`${titleCase(registry)}\` component \`${titleCase(name)} document\`...`)

  const destPath = `${dest}/${data.category.toLowerCase()}`

  await renderTemplates(
    src,
    destPath,
    templates,
    data,
  )

  consola.success(`\`${titleCase(name)}\` document generated!`)
}
