import { consola } from 'consola'

export async function generateDocuments(name, registry) {
  const isCreateDoc = await consola.prompt(
    `Do you want to create a documentation for the \`${name}\` component?`,
    {
      type: 'confirm',
      initial: true,
    },
  )

  if (!isCreateDoc)
    return

  // category
  // description

  consola.start(`Generating a documentation for \`${registry}\` component \`${name}\`...`)

  consola.success('Component generated!')
}
