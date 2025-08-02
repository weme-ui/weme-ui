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

  consola.start(`Generating \`${titleCase(registry)}\` component \`${titleCase(name)} document\`...`)

  const destPath = `${dest}/${category.toLowerCase()}`

  await renderTemplates(
    src,
    destPath,
    templates,
    {
      ...data,
      category,
    },
  )

  consola.success(`\`${titleCase(name)}\` document generated!`)
}
