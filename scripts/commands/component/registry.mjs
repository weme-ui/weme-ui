import { consola } from 'consola'
import { resolve } from 'pathe'
import { kebabCase, titleCase } from 'scule'
import { readJsonFile, writeFile } from '../../utils/file.mjs'

export async function updateRegistry(data) {
  const {
    name,
    registry,
    inside,
    category,
  } = data

  const resolvedName = inside ? name.split('-').shift() : name

  consola.start(`Updating \`${titleCase(registry)}\` component \`${titleCase(resolvedName)} registry item\`...`)

  const registryJsonPath = resolve('registry', kebabCase(registry), 'registry.json')
  const registryJSON = readJsonFile(registryJsonPath)

  const registryItems = registryJSON.items || []
  const registryItem = registryItems.find(item => item.name === kebabCase(resolvedName)) || {}

  const registryItemFiles = [
    {
      path: `components/${kebabCase(resolvedName)}/${kebabCase(name)}.vue`,
      type: 'component',
    },
    {
      path: `components/${kebabCase(resolvedName)}/${kebabCase(name)}.props.ts`,
      type: 'type',
    },
    {
      path: `components/${kebabCase(resolvedName)}/${kebabCase(name)}.style.ts`,
      type: 'style',
    },
  ]

  if (registryItems.length === 0 || Object.values(registryItem).length === 0) {
    registryItems.push({
      name: kebabCase(resolvedName),
      type: 'component',
      title: titleCase(resolvedName),
      description: `The ${titleCase(resolvedName)} component.`,
      categories: [kebabCase(category)],
      files: registryItemFiles,
    })
  }
  else {
    registryItemFiles.forEach((file) => {
      if (registryItem.files.find(f => f.path !== file.path)) {
        registryItem.files.push(file)
      }
    })
  }

  await writeFile(registryJsonPath, JSON.stringify(registryJSON, null, 2), { quiet: true })

  consola.success(`Registry items updated!`)
}
