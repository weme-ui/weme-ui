import { resolve } from 'node:path'
import { consola } from 'consola'
import { asyncWriteFile } from '../../utils/file.mjs'
import { renderTemplate } from '../../utils/template.mjs'

export async function generateDocuments(name, registry, destPath) {
  const isCreateDoc = await consola.prompt(
    `Do you want to create a documentation for the \`${name}\` component?`,
    {
      type: 'confirm',
      initial: true,
    },
  )

  if (!isCreateDoc)
    return

  const category = await consola.prompt(
    'What is the category of the component?',
    {
      type: 'select',
      options: [
        'General',
        'Layout',
        'Navigation',
        'Data Display',
        'Forms',
        'Chart',
        'Feedback',
        'Other',
      ],
      initial: 'General',
    },
  )

  consola.start(`Generating a documentation for \`${registry} ${name}\` component ...`)

  const content = renderTemplate('component/doc.hbs', { name, registry, category })
  const destFilename = `${registry.toLowerCase()}/${category.toLowerCase()}/${name}.md`

  if (!content) {
    consola.error(`Failed to render component documentation template \`component/doc.hbs\``)
    return
  }

  await asyncWriteFile(resolve(destPath, destFilename), content)

  consola.success('Component generated!')
}
